import { Project } from "./project";
import { Todo } from "./todo";

function initialLoad() {
  if (localStorage.length === 0) {
    const defaultProject = new Project("Default Project");
    localStorage.setItem(defaultProject._name, JSON.stringify(defaultProject));
    document.querySelector("#content").innerHTML = `
    <h2 class = "current-project">${defaultProject._name}</h2>`;
  } else {
    loadProject(JSON.parse(localStorage.getItem(localStorage.key(0)))._name);
  }

  loadProjectList();
  const todoDialog = document.querySelector("#todoDialog");
  const showTodoDialogButton = document.querySelector(".add-new-todo");
  const todoForm = todoDialog.querySelector("form");

  showTodoDialogButton.addEventListener("click", () => {
    todoForm.reset();
    todoDialog.showModal();
  });

  const closeTodoDialogButton = document.querySelector("#cancelButton");
  closeTodoDialogButton.addEventListener("click", () => {
    todoDialog.close();
  });
}

function loadProject(projectName) {
  const content = document.querySelector("#content");
  const tempProject = JSON.parse(localStorage.getItem(projectName));
  content.innerHTML = `<div class = "tasks-heading"><h2 class = "current-project">${tempProject._name}</h2><button class = "add-new-todo">New Task +</button><div>`;
  const todoDialog = document.querySelector("#todoDialog");
  const todoForm = todoDialog.querySelector("form");
  const showTodoDialogButton = document.querySelector(".add-new-todo");

  showTodoDialogButton.addEventListener("click", () => {
    todoForm.reset();
    todoDialog.showModal();
  });

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
    todoForm.reset();
    todoDialog.close();
  });
}

function loadProjectList() {
  const projectList = document.querySelector(".project-list");
  for (let i = 0; i < localStorage.length; i++) {
    const projectTitle = document.createElement("button");
    const project = JSON.parse(localStorage.getItem(localStorage.key(i)));
    projectTitle.innerHTML = project._name;
    projectTitle.addEventListener("click", () => {
      loadProject(project._name);
    });
    projectList.appendChild(projectTitle);
  }
}

function updateProjectList(projectName) {
  const projectList = document.querySelector(".project-list");
  const projectTitle = document.createElement("button");
  const project = JSON.parse(localStorage.getItem(projectName));
  projectTitle.innerHTML = project._name;
  projectTitle.addEventListener("click", () => {
    loadProject(project._name);
  });
  projectList.appendChild(projectTitle);
}

function addTask() {
  const todoDialogForm = document.querySelector("#todoDialog form");
  const taskName = todoDialogForm.querySelector("#todoTitle").value;
  const taskDescription = todoDialogForm.querySelector("#todoDesc").value;
  const taskDate = todoDialogForm.querySelector("#todoDate").value;
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  console.log(taskDate);
  taskContainer.innerHTML = `
  <div class = "task-info">
  <button class = "taskDone"></button>
  <div>
  <div class = "task-info2">
  <h4 class = "taskTitle">${taskName}</h4>
  <p>${taskDate}</p>
  </div>
  <p class = "taskDescription">${taskDescription}</p>
  </div>
  </div>
  `;

  const content = document.querySelector("#content");
  content.appendChild(taskContainer);
}

export {
  loadProject,
  loadProjectList,
  updateProjectList,
  initialLoad,
  addTask,
};
