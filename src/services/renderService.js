import { NEW_TASK_OUTPUT } from "./domService.js";

export const renderTasks = (tasks = []) => {
  if (!tasks?.length) return null;
  NEW_TASK_OUTPUT.innerHTML = "";
  let count = 1;
  tasks.forEach((task) => {
    const { taskContent, status, createdAt, endDate, id } = task;

    const cardContiner = document.createElement("div");
    cardContiner.classList.add(
      "card",
      "text-center",
      "col-xl-4",
      "col-md-6",
      "col-12",
      "mb-2"
    );
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "p-4", "center", "flex-column");

    const ul = document.createElement("ul");
    ul.classList.add("nav", "nav-pills", "card-header-pills");
    const editLi = document.createElement("li");
    editLi.classList.add("nav-item", "me-3");
    const deleteLi = document.createElement("li");
    deleteLi.classList.add("nav-item");
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-outline-danger");
    const createDateTask = document.createElement("p");
    createDateTask.classList.add("card-text", "text-secondary", "mt-2");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const taskNumber = document.createElement("h5");
    taskNumber.classList.add("card-title");
    const theTask = document.createElement("p");
    theTask.classList.add("card-text");
    const endDateTaskP = document.createElement("p");
    endDateTaskP.classList.add("card-text", "text-secondary");
    const endDateTaskSpan = document.createElement("span");

    const fromCheck = document.createElement("div");
    fromCheck.classList.add("form-check");
    const checkBox = document.createElement("input");
    checkBox.classList.add("form-check-input");
    const labelCheckBox = document.createElement("label");
    labelCheckBox.classList.add("form-check-label");

    theTask.append(taskContent);
    createDateTask.append(createdAt);
    endDateTaskSpan.append(endDate);
    endDateTaskP.id = `${id}end-date`;
    checkBox.type = "checkbox";
    checkBox.checked = status;
    checkBox.id = `${id}Completed`;
    cardBody.id = `${id}taskColorCompleted`;

    taskNumber.append(count);

    cardHeader.appendChild(ul);
    editBtn.append("Edit");
    editBtn.id = `${id}edit`;
    deleteBtn.append("Delete");
    deleteBtn.id = `${id}delete`;
    editLi.appendChild(editBtn);
    deleteLi.appendChild(deleteBtn);
    ul.appendChild(editLi);
    ul.appendChild(deleteLi);
    cardHeader.appendChild(createDateTask);

    cardBody.appendChild(taskNumber);
    cardBody.appendChild(theTask);
    cardBody.appendChild(endDateTaskP);
    endDateTaskP.append(`complete the task up to `);
    endDateTaskP.appendChild(endDateTaskSpan);

    cardBody.appendChild(fromCheck);
    fromCheck.appendChild(checkBox);
    labelCheckBox.append("Completed");
    fromCheck.appendChild(labelCheckBox);

    cardContiner.appendChild(cardHeader);
    cardContiner.appendChild(cardBody);
    NEW_TASK_OUTPUT.appendChild(cardContiner);
    count++;
  });

  return;
};
