import {
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../services/localStorageService.js";
import { generateUniqNumber } from "../utils/algoMethods.js";

export class Tasks {
  #id;
  taskContent;
  status = { Uncompleted: 0, Completed: 1 };
  createdAt;
  endDate;
  constructor(task, array = []) {
    const { taskContent, endDate, status = 0 } = task;
    this.#id = generateUniqNumber(array, "_id");
    this.taskContent = taskContent;
    this.endDate = endDate;
    this.status = status;
    this.createdAt = new Date().toUTCString();
    this.id = this._id;
  }

  get _id() {
    return this.#id;
  }
}

export class TaskManager {
  tasks;
  constructor(tasks = []) {
    this.tasks = tasks;
  }
  add = (newTask) => {
    this.tasks.push(newTask);
    setItemInLocalStorage("tasks", JSON.stringify(this.tasks));
  };
  delete = (id) => {
    if (this.tasks.length === 1) {
      removeItemFromLocalStorage("tasks");
      return;
    }

    const newTasks = this.tasks.filter((task) => task.id !== id);
    setItemInLocalStorage("tasks", JSON.stringify(newTasks));
  };
}
