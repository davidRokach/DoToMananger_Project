import {
  handleDeleteTask,
  handleEditTasks,
  onCompletedTask,
} from "./TaskService.js";
import {
  DELETE_TASKS_BTN,
  HIDE_COMPLECTED_TASKS_BTN,
  NEW_TASK_OUTPUT,
  NO_TASKS_DISPLAY,
} from "./domService.js";
import { getItemFromLocalStorage } from "./localStorageService.js";
import { renderTasks } from "./renderService.js";

// הצגת המשימות
export const displayTasks = () => {
  const tasks = JSON.parse(getItemFromLocalStorage("tasks"));
  if (!tasks) {
    // אם אין משימות להציג
    NO_TASKS_DISPLAY.className = "mt-4 d-block";
    DELETE_TASKS_BTN.className = "d-none";
    HIDE_COMPLECTED_TASKS_BTN.className = "d-none";
    NEW_TASK_OUTPUT.innerHTML = "";
    renderTasks(tasks);
    return;
  }
  // יש משימות להציג
  NO_TASKS_DISPLAY.className = "d-none";
  DELETE_TASKS_BTN.className = "btn btn-outline-danger d-block";
  HIDE_COMPLECTED_TASKS_BTN.className = "btn btn-secondary mb-3";

  renderTasks(tasks);

  tasks.forEach((task) => {
    // הופסת האזנה לכתפורים
    addEventOnDelete(task.id); // האזנה למחיקה
    addOnEditTask(task.id); // האזנה לעריכה

    // הוספת פונקציות נוספות
    addDatePasses(task, task.id); // בדיקה אם תאריך יעד עבר
    Completed(task.id); // הוספת הצגה למקרה שהמשימה הושלמה
    // filterCompleted(task.status, task.id);
  });
};

const addEventOnDelete = (id) => {
  const deleteButton = document.getElementById(`${id}delete`);
  deleteButton.addEventListener("click", () => handleDeleteTask(id));
};

const addOnEditTask = (id) => {
  const editButton = document.getElementById(`${id}edit`);
  editButton.addEventListener("click", () => handleEditTasks(id));
};

const addDatePasses = (task, id) => {
  const DatePasses = document.getElementById(`${id}end-date`);

  const Difference_In_Time =
    new Date(task.endDate).getTime() - new Date().getTime();

  if (Difference_In_Time < 0) {
    DatePasses.classList.add("text-warning", "bg-dark");
  } else {
    DatePasses.classList.remove("text-warning", "bg-dark");
  }
};

const Completed = (id) => {
  const completedTask = document.getElementById(`${id}Completed`);
  const taskColorComplectetd = document.getElementById(
    `${id}taskColorCompleted`
  );
  const editBtnCompleted = document.getElementById(`${id}edit`);
  if (completedTask.checked === true) {
    taskColorComplectetd.classList.add("opacity-25");
    editBtnCompleted.disabled = true;
  } else {
    taskColorComplectetd.classList.remove("opacity-25");
    editBtnCompleted.disabled = false;
  }

  completedTask.addEventListener("change", function () {
    onCompletedTask(id, completedTask);
  });
};
// const filterCompleted = (status, id) => {
//   HIDE_COMPLECTED_TASKS_BTN.addEventListener("click", () => {
//     if (status === 1) {
//       const taskContiner = document.getElementById(`${id}taskFilterCompleted`);
//       taskContiner.className = "d-none";
//     }
//   });
// };
