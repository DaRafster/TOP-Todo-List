import { Project } from "./project";
import { Todo } from "./todo";
import { format, isValid } from "date-fns";
import Edit from "./images/text-box-edit-outline.svg";
import Trash from "./images/trash-can-outline.svg";

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
  loadTasks();
  showTodoDialogButton.addEventListener("click", () => {
    todoForm.reset();
    todoDialog.showModal();
  });

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createTodo();
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

function loadTasks() {
  const projectName = document.querySelector(".current-project").innerHTML;
  const project = JSON.parse(localStorage.getItem(projectName));
  project._todos.forEach((todo) => {
    loadTask(todo);
  });
}

function loadTask(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  let [year, month, day] = task._dueDate.split("-");
  const dateObject = new Date(parseInt(year), parseInt(month), parseInt(day));

  let trashIcon = new Image();
  trashIcon.src = Trash;

  let editIcon = new Image();
  editIcon.src = Edit;

  taskContainer.innerHTML = `
  <button class = "taskDone"></button>
  <div>
    <div class = "task-info2">
    <h4 class = "taskTitle">${task._title}</h4>
    <p>${isValid(dateObject) ? format(dateObject, "LLLL d, y") : ""}</p>
    </div>
    <p class = "taskDescription">${task._description}</p>
  </div>
  `;

  taskContainer.appendChild(editIcon);
  taskContainer.appendChild(trashIcon);

  const content = document.querySelector("#content");
  content.appendChild(taskContainer);
}

function createTodo() {
  const projectName = document.querySelector(".current-project").innerHTML;
  const taskName = document.querySelector("#todoTitle").value;
  const taskDescription = document.querySelector("#todoDesc").value;
  const dueDate = document.querySelector("#todoDate").value;
  const priority = document.querySelector(
    'input[name="priorityOption"]:checked'
  ).value;

  const newTodo = new Todo(taskName, taskDescription, dueDate, priority);
  const projectJSON = JSON.parse(localStorage.getItem(projectName));
  const updateProject = Object.assign(new Project(), projectJSON);
  updateProject.addToDo(newTodo);
  localStorage.setItem(projectName, JSON.stringify(updateProject));
  loadTask(newTodo);
}

export {
  loadProject,
  loadProjectList,
  updateProjectList,
  initialLoad,
  createTodo,
};
