import "./style.css";
import Todo from "./todo";
import {
  updateProjectList,
  loadProject,
  loadProjectList,
  initialLoad,
} from "./dom";
import { Project } from "./project";

const projectDialog = document.querySelector("#projectDialog");
const todoDialog = document.querySelector("#todoDialog");
const showProjectDialogButton = document.querySelector(".add-project-btn");
const showTodoDialogButton = document.querySelector(".add-todo-btn");
const closeProjectDialogButton = document.querySelector(
  "#projectDialog button"
);
const closeTodoDialogButton = document.querySelector("#todoDialog button");
const projectForm = document.querySelector("#projectDialog form");

showProjectDialogButton.addEventListener("click", () => {
  projectDialog.showModal();
});

closeProjectDialogButton.addEventListener("click", () => {
  projectDialog.close();
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectName = document.querySelector("#projectDialog input").value;
  let project = new Project(projectName);
  localStorage.setItem(projectName, JSON.stringify(project));
  updateProjectList(projectName);
  loadProject(projectName);
  projectDialog.close();
});

// showTodoDialogButton.addEventListener("click", () => {
//   todoDialog.showModal();
// });

// // "Close" button closes the dialog
// todoDialog.addEventListener("click", () => {
//   todoDialog.close();
// });

initialLoad();
