import PAGES from "./models/pageModel.js";
import { onChangePage } from "./routes/router.js";
import {
  HideCompletedTasks,
  ShowCompletedTasks,
  handleCancelCreateTask,
  handleCreateTask,
  onCreateNewTask,
  onEditTask,
} from "./services/TaskService.js";
import { displayTasks } from "./services/displayModeService.js";
import {
  ADD_TASK_BTN,
  DELETE_TASKS_BTN,
  HIDE_COMPLECTED_TASKS_BTN,
  HOME_PAGE_LINK,
} from "./services/domService.js";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "./services/localStorageService.js";

let tasks;

//#region האזנה לאירועים
// ניתוב דפים
HOME_PAGE_LINK?.addEventListener("click", () => onChangePage(PAGES.HOME));
ADD_TASK_BTN?.addEventListener("click", () => handleCreateTask());
//#endregion

//#region יצירת משימה חדשה
export const handleSubmitNewTask = () => {
  if (!getItemFromLocalStorage("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(getItemFromLocalStorage("tasks"));
  }
  tasks = onCreateNewTask(tasks); // יצירת המשימה
  displayTasks(); // הצגת המשימה

  handleCancelCreateTask(); // חזרה לעמוד הראשי
};
//#endregion

displayTasks(); // הצגת המשימות במידה של הפעלה מחדש של עמוד

// מחקימת כל המשימות
DELETE_TASKS_BTN.addEventListener("click", () => {
  removeItemFromLocalStorage("tasks");
  removeItemFromLocalStorage("allTasks");

  displayTasks();
});

// סינון המשימות שהושלמו
HIDE_COMPLECTED_TASKS_BTN.addEventListener("click", () => {
  tasks = JSON.parse(getItemFromLocalStorage("tasks"));

  if (HIDE_COMPLECTED_TASKS_BTN.innerText === ` Hide completed tasks`) {
    HIDE_COMPLECTED_TASKS_BTN.innerHTML = `<i class="bi bi-filter"></i>
     Show completed tasks`;
    HideCompletedTasks(tasks);
    displayTasks();
    return;
  }
  HIDE_COMPLECTED_TASKS_BTN.innerHTML = `<i class="bi bi-filter"></i> Hide completed tasks`;
  ShowCompletedTasks(tasks);
  displayTasks();
});

// עריכת משימה
export const handleSubmiteEditTask = (id) => {
  tasks = JSON.parse(getItemFromLocalStorage("tasks"));
  tasks = onEditTask(tasks, id);
  displayTasks();
  handleCancelCreateTask();
};
