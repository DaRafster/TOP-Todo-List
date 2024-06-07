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
}

function loadProject(projectName) {
  const content = document.querySelector("#content");
  const tempProject = JSON.parse(localStorage.getItem(projectName));
  content.innerHTML = `<div><h2>${tempProject._name}</h2><button class = "add-new-todo">New Task +</button><div>`;
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
