import { handleSubmitNewTask, handleSubmiteEditTask } from "../app.js";
import PAGES from "../models/pageModel.js";
import { TaskManager, Tasks } from "../models/taskModel.js";
import { onChangePage } from "../routes/router.js";
import { displayTasks } from "./displayModeService.js";
import {
  CANCEL_BTN,
  EDIT_CANCEL_BTN,
  EDIT_END_TASK_INPUT,
  EDIT_SUMBIT_BTN,
  EDIT_TASK_INPUT,
  END_TASK_INPUT,
  NEW_TASK_INPUT,
  SUMBIT_BTN,
} from "./domService.js";
import useForm from "./formService.js";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "./localStorageService.js";

//#region הוסספת משימה

// טיפול ראשוני לפני יצירת משימה
export const handleCreateTask = () => {
  // הגענו לדף
  onChangePage(PAGES.ADD_TASK);

  // להרשם לאירועי הזנת המידע בשדות
  createTaskFromFieldsListeners();

  // CANCEL_BTN.removeEventListener("click", cancelEH);
  CANCEL_BTN.addEventListener("click", cancelEH);

  function cancelEH() {
    const conf = confirm("Are you sure you want to cancel?");
    CANCEL_BTN.removeEventListener("click", cancelEH);
    if (conf) {
      handleCancelCreateTask();
    } else {
      CANCEL_BTN.addEventListener("click", cancelEH);
    }
  }

  SUMBIT_BTN.removeEventListener("click", handleSubmitNewTask);
  SUMBIT_BTN.addEventListener("click", handleSubmitNewTask);
};
// ביטול יצירת משימה
export const handleCancelCreateTask = () => {
  const { onClearFormFields } = useForm();
  const fields = [NEW_TASK_INPUT, END_TASK_INPUT];
  onClearFormFields(fields);
  onChangePage(PAGES.HOME);
  return handleCancelCreateTask;
};
// האזנה לכל השדות ביצירת משימה
export const createTaskFromFieldsListeners = () => {
  const { onChangeInputField } = useForm();
  const schema = ["taskInput", "endTask"];

  NEW_TASK_INPUT.addEventListener("input", (e) => {
    const element = {
      input: e.target,
    };

    onChangeInputField(element, schema, SUMBIT_BTN);
  });

  END_TASK_INPUT.addEventListener("input", (e) => {
    const element = {
      input: e.target,
    };
    onChangeInputField(element, schema, SUMBIT_BTN);
  });
};
// הוספת משימה
export const onCreateNewTask = (tasks) => {
  try {
    let newArray = [...tasks];
    const task = new Tasks(
      {
        taskContent: NEW_TASK_INPUT.value,
        endDate: END_TASK_INPUT.value,
      },
      newArray
    );

    const addTask = new TaskManager(newArray);
    addTask.add(task);

    return newArray;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
//#endregion

//#region עריכת משימה

// טיפול ראשוני לפני עריכת משימה
export const handleEditTasks = (id) => {
  // הגענו לדף
  onChangePage(PAGES.EDIT_TASK);

  // להרשם לאירועי הזנת המידע בשדות
  editTaskFromFieldsListeners();

  const tasks = JSON.parse(getItemFromLocalStorage("tasks"));
  let orginalTask = tasks.find((task) => task.id === id);
  let indexEtidTask = tasks.indexOf(orginalTask);

  EDIT_TASK_INPUT.value = tasks[indexEtidTask].taskContent;
  EDIT_END_TASK_INPUT.value = tasks[indexEtidTask].endDate;

  function cancelEH() {
    EDIT_CANCEL_BTN.removeEventListener("click", cancelEH);
    const conf = confirm("Are you sure you want to cancel?");
    if (conf) {
      handleCancelEditTask();
    } else {
      EDIT_CANCEL_BTN.addEventListener("click", cancelEH);
    }
  }

  EDIT_CANCEL_BTN.addEventListener("click", cancelEH);

  EDIT_SUMBIT_BTN.removeEventListener("click", function () {
    handleSubmiteEditTask(id);
  });
  EDIT_SUMBIT_BTN.addEventListener("click", function () {
    handleSubmiteEditTask(id);
  });
};
// ביטול עריכת משימה
export const handleCancelEditTask = () => {
  const { onClearFormFields } = useForm();
  const fields = [EDIT_TASK_INPUT, EDIT_END_TASK_INPUT];
  onClearFormFields(fields);
  onChangePage(PAGES.HOME);
};
// האזנה לכל השדות בעריכת משימה
export const editTaskFromFieldsListeners = () => {
  const { onChangeInputField } = useForm();
  const schema = ["editTaskInput", "editEndTask"];

  EDIT_TASK_INPUT.addEventListener("input", (e) => {
    const element = {
      input: e.target,
    };

    onChangeInputField(element, schema, EDIT_SUMBIT_BTN);
  });

  EDIT_END_TASK_INPUT.addEventListener("input", (e) => {
    const element = {
      input: e.target,
    };
    onChangeInputField(element, schema, EDIT_SUMBIT_BTN);
  });
};
// עריכת משימה
export const onEditTask = (tasks, id) => {
  try {
    let newArray = [...tasks];
    let orginalTask = newArray.find((task) => task.id === id);
    let indexEtidTask = newArray.indexOf(orginalTask);

    newArray[indexEtidTask].taskContent = EDIT_TASK_INPUT.value;
    newArray[indexEtidTask].endDate = EDIT_END_TASK_INPUT.value;

    setItemInLocalStorage("tasks", JSON.stringify(newArray));

    return newArray;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
//#endregion

// מחיקת משימה
export const handleDeleteTask = (id) => {
  const tasks = JSON.parse(getItemFromLocalStorage("tasks"));

  const deleteTask = new TaskManager(tasks);
  deleteTask.delete(id);

  displayTasks();
};
// השלמת משימה
export const onCompletedTask = (id, checkBox) => {
  const tasks = JSON.parse(getItemFromLocalStorage("tasks"));
  const completedTask = tasks.find((task) => task.id === id);
  const indexCompTask = tasks.indexOf(completedTask);
  if (checkBox.checked === true) {
    tasks[indexCompTask].status = 1;
  } else {
    tasks[indexCompTask].status = 0;
  }

  setItemInLocalStorage("tasks", JSON.stringify(tasks));
  displayTasks();
};
