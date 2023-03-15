import PAGES from "./models/pageModel.js";
import { Tasks } from "./models/taskModel.js";
import { onChangePage } from "./routes/router.js";
import {
  handleCancelCreateTask,
  handleCreateTask,
  onCreateNewTask,
  onEditTask,
} from "./services/TaskService.js";
import { displayTasks } from "./services/displayModeService.js";
import {
  ADD_TASK_BTN,
  DELETE_TASKS_BTN,
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
  displayTasks();
});

// עריכת משימה
export const handleSubmiteEditTask = (id) => {
  tasks = JSON.parse(getItemFromLocalStorage("tasks"));
  tasks = onEditTask(tasks, id);
  displayTasks();
  handleCancelCreateTask();
};
