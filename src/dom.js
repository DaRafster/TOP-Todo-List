import { Project } from "./project";
import { Todo } from "./todo";
import { format, isValid } from "date-fns";
import Edit from "./images/text-box-edit-outline.svg";
import Trash from "./images/trash-can-outline.svg";

function initialLoad() {
  if (localStorage.length === 0) {
    const defaultProject = new Project("Default Project");
    localStorage.setItem(defaultProject._name, JSON.stringify(defaultProject));
    document.querySelector(".current-project").innerHTML = defaultProject._name;
    loadProject(JSON.parse(localStorage.getItem(defaultProject._name))._name);
  } else {
    loadProject(JSON.parse(localStorage.getItem(localStorage.key(0)))._name);
  }

  loadProjectList();
  const todoDialog = document.querySelector("#todoDialog");
  const showTodoDialogButton = document.querySelector(".add-new-todo");
  const cancelButton = document.querySelector("#cancelButton");
  const todoForm = todoDialog.querySelector("form");

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

  cancelButton.addEventListener("click", () => {
    todoForm.reset();
    todoDialog.close();
  });
}

function loadProject(projectName) {
  const tempProject = JSON.parse(localStorage.getItem(projectName));
  const tempName = document.querySelector(".current-project");
  const content = document.querySelector("#content2");
  content.innerHTML = "";
  tempName.innerHTML = tempProject._name;

  loadTasks();
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

  trashIcon.addEventListener("click", () => {
    const projectName = document.querySelector(".current-project").innerHTML;
    deleteTodo(projectName, taskContainer);
  });

  taskContainer.innerHTML = `
  <div>
    <div class = "task-info2">
    <button class = "taskDone"></button>
    <h4 class = "taskTitle">${task._title}</h4>
    </div>
  </div>
  `;

  const innerDiv = taskContainer.querySelector("div");
  const innerDiv2 = taskContainer.querySelector(".task-info2");
  if (isValid(dateObject)) {
    innerDiv2.innerHTML += `<p>${format(dateObject, "LLLL d, y")}</p>`;
  }

  if (task._priority !== null) {
    innerDiv2.innerHTML += `<p class = "${task._priority}">${task._priority}</p>`;
  }

  if (task._description !== null) {
    innerDiv.innerHTML += `<p class = "taskDescription">${task._description}</p>`;
  }

  taskContainer.appendChild(editIcon);
  taskContainer.appendChild(trashIcon);

  const content = document.querySelector("#content2");
  content.appendChild(taskContainer);
}

function createTodo() {
  const projectName = document.querySelector(".current-project").innerHTML;
  const taskName = document.querySelector("#todoTitle").value;
  const taskDescription = document.querySelector("#todoDesc").value;
  const dueDate = document.querySelector("#todoDate").value;
  const priorityNode = document.querySelector(
    'input[name="priorityOption"]:checked'
  );
  const priority = priorityNode !== null ? priorityNode.value : null;

  const newTodo = new Todo(taskName, taskDescription, dueDate, priority);
  const projectJSON = JSON.parse(localStorage.getItem(projectName));
  const updateProject = Object.assign(new Project(), projectJSON);
  updateProject.addToDo(newTodo);
  localStorage.setItem(projectName, JSON.stringify(updateProject));
  loadTask(newTodo);
}

function deleteTodo(projectName, taskContainer) {
  const projectJSON = JSON.parse(localStorage.getItem(projectName));
  const newProject = Object.assign(new Project(), projectJSON);
  const todo = taskContainer.querySelector(".taskTitle").innerHTML;
  newProject.removeToDo(todo);

  localStorage.setItem(projectName, JSON.stringify(newProject));
  taskContainer.remove();
}

export {
  loadProject,
  loadProjectList,
  updateProjectList,
  initialLoad,
  createTodo,
};
