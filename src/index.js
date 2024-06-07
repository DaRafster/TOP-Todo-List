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
const showProjectDialogButton = document.querySelector(".add-project-btn");
const closeProjectDialogButton = document.querySelector(
  "#projectDialog button"
);
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

initialLoad();
