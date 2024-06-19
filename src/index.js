import "./style.css";
import { updateProjectList, loadProject, initialLoad } from "./dom";
import { Project } from "./project";

const projectDialog = document.querySelector("#projectDialog");
const showProjectDialogButton = document.querySelector(".add-project-btn");
const closeProjectDialogButton = document.querySelector(
  "#projectDialog button"
);
const projectForm = document.querySelector("#projectDialog form");

showProjectDialogButton.addEventListener("click", () => {
  projectForm.reset();
  projectDialog.showModal();
});

closeProjectDialogButton.addEventListener("click", () => {
  projectForm.reset();
  projectDialog.close();
  const errorMessage = document.querySelector(".error");
  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.add("hidden");
  }
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectName = document.querySelector("#projectDialog input").value;
  const errorMessage = document.querySelector(".error");
  for (let i = 0; i < localStorage.length; i++) {
    const currProject = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (projectName === currProject._name) {
      errorMessage.classList.remove("hidden");
      return;
    }
  }

  const tasksHeading = document.querySelector(".tasks-heading");
  tasksHeading.style.visibility = "visible";

  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.add("hidden");
  }

  let project = new Project(projectName);
  localStorage.setItem(projectName, JSON.stringify(project));
  updateProjectList(projectName);
  loadProject(projectName);
  projectDialog.close();
});

initialLoad();
