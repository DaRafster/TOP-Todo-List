import { Project } from "./project";

function initialLoad() {
  if (localStorage.length === 0) {
    const defaultProject = new Project("Default Project");
    localStorage.setItem(defaultProject._name, JSON.stringify(defaultProject));
    document.querySelector("#content").innerHTML = `
    <h1>${defaultProject._name}</h1>`;
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

  todoDialog.addEventListener("submit", () => {
    todoForm.reset();
    todoDialog.close();
  });

  const closeTodoDialogButton = document.querySelector("#cancelButton");
  const confirmTodoDialogButton = document.querySelector(".confirmTodo");

  closeTodoDialogButton.addEventListener("click", () => {
    todoDialog.close();
  });

  confirmTodoDialogButton.addEventListener("click", (event) => {
    event.preventDefault();
    todoDialog.close();
  });
}

function loadProject(projectName) {
  const content = document.querySelector("#content");
  const tempProject = JSON.parse(localStorage.getItem(projectName));
  content.innerHTML = `<div><h2>${tempProject._name}</h2><button class = "add-new-todo">New Task +</button><div>`;
  const todoDialog = document.querySelector("#todoDialog");
  const showTodoDialogButton = document.querySelector(".add-new-todo");

  showTodoDialogButton.addEventListener("click", () => {
    todoDialog.showModal();
  });

  todoDialog.addEventListener("submit", () => {
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

export { loadProject, loadProjectList, updateProjectList, initialLoad };
