// דף הבית
export const HOME_PAGE_LINK = document.querySelector("#home-page-link");

//#region דפים
export const HOME_PAGE = document.querySelector("#home-page");
export const ADD_TASK_PAGE = document.querySelector("#add-task-page");
export const EDIT_TASK_PAGE = document.querySelector("#edit-task-page");
export const ERROR_404_PAGE = document.querySelector("#error-404-page");
//#endregion

//#region הוספת משימה
// לינק הוספת משימה
export const ADD_TASK_BTN = document.querySelector("#add-task-btn");
//inputs
export const NEW_TASK_INPUT = document.querySelector("#new-task-input");
export const END_TASK_INPUT = document.querySelector("#end-task-input");
//buttons
export const SUMBIT_BTN = document.querySelector("#sumbit-btn");
export const CANCEL_BTN = document.querySelector("#cancel-btn");
//output
export const NEW_TASK_OUTPUT = document.querySelector("#new-task-output");
//#endregion

//#region ערכית משימה
//inputs
export const EDIT_TASK_INPUT = document.querySelector("#edit-task-input");
export const EDIT_END_TASK_INPUT = document.querySelector(
  "#edit-end-task-input"
);
//buttons
export const EDIT_SUMBIT_BTN = document.querySelector("#edit-sumbit-btn");
export const EDIT_CANCEL_BTN = document.querySelector("#edit-cancel-btn");
//#endregion

// תצוגת אין משימות
export const NO_TASKS_DISPLAY = document.querySelector("#no-tasks-display");
// כפתור מחיקת משימות
export const DELETE_TASKS_BTN = document.querySelector("#delete-all-btn");
// כפתור הסתרת משימות שהושלמו
export const HIDE_COMPLECTED_TASKS_BTN = document.querySelector(
  "#hide-completed-btn"
);
