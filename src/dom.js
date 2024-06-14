import { Project } from "./project";
import { Todo } from "./todo";
import { format, isValid } from "date-fns";
import Edit from "./images/text-box-edit-outline.svg";
import Trash from "./images/trash-can-outline.svg";

function initialLoad() {
  if (localStorage.length === 0) {
    const defaultProject = new Project("Default Project");
    defaultProject.addToDo(
      new Todo(
        "Get Started",
        "Add a new todo by clicking on the button at the top right!"
      )
    );
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
  const editTodoDialog = document.querySelector("#editTodoDialog");
  const editCancelButton = document.querySelector("#editCancelButton");
  const editConfirmButton = document.querySelector("#editConfirm");
  const editTodoForm = editTodoDialog.querySelector("form");

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

  editCancelButton.addEventListener("click", () => {
    editTodoForm.reset();
    editTodoDialog.close();
  });
}

function loadProject(projectName) {
  const tempProject = JSON.parse(localStorage.getItem(projectName));
  const tempName = document.querySelector(".current-project");
  const content = document.querySelector("#content2");
  content.innerHTML = "";
  tempName.innerHTML = projectName;

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("project-options");

  let trashIcon = new Image();
  trashIcon.src = Trash;
  trashIcon.classList.add("delete-project");

  let editIcon = new Image();
  editIcon.src = Edit;
  editIcon.classList.add("edit-project");

  imageDiv.appendChild(editIcon);
  imageDiv.appendChild(trashIcon);

  const tasksHeading = document.querySelector(".tasks-heading");
  tasksHeading.appendChild(imageDiv);
  tasksHeading.innerHTML += `<button class="add-new-todo">New Task +</button>`;

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

  let dateObject;
  if (task.dueDate !== undefined && task.dueDate !== null) {
    let [year, month, day] = task.dueDate.split("-");
    dateObject = new Date(parseInt(year), parseInt(month), parseInt(day));
  }

  let trashIcon = new Image();
  trashIcon.src = Trash;
  trashIcon.classList.add("delete-task");

  let editIcon = new Image();
  editIcon.src = Edit;
  editIcon.classList.add("edit-task");

  trashIcon.addEventListener("click", () => {
    const projectName = document.querySelector(".current-project").innerHTML;
    deleteTodo(projectName, taskContainer, task);
  });

  function updateTask(event) {
    event.preventDefault();
    const editTitle = document.querySelector("#editTodoTitle").value;
    const editDescription = document.querySelector("#editTodoDesc").value;
    const editDueDate = document.querySelector("#editTodoDate").value;
    const editTime = document.querySelector("#editTodoTime").value;
    const [editLow, editMedium, editHigh] = [
      ...document.getElementsByName("editPriorityOption"),
    ];
    const projectName = document.querySelector(".current-project").innerHTML;
    const currentProject = JSON.parse(localStorage.getItem(projectName));
    const updatedProject = Object.assign(new Project(), currentProject);

    let editPriority = null;
    if (editLow.checked) {
      editPriority = "Low";
    } else if (editMedium.checked) {
      editPriority = "Medium";
    } else if (editHigh.checked) {
      editPriority = "High";
    }

    const newTask = new Todo(
      editTitle,
      editDescription,
      editDueDate,
      editPriority,
      editTime
    );

    updatedProject.updateTodo(task.id, newTask);
    localStorage.removeItem(projectName);
    localStorage.setItem(projectName, JSON.stringify(updatedProject));

    const editTodoDialog = document.querySelector("#editTodoDialog");
    const editDialogForm = document.querySelector("#editTodoDialog form");
    loadProject(projectName);
    editDialogForm.reset();
    editTodoDialog.close();

    editDialogForm.removeEventListener("submit", updateTask);
  }

  editIcon.addEventListener("click", () => {
    const editTodoDialog = document.querySelector("#editTodoDialog");
    editTodoDialog.showModal();

    updateForm(task);
    const editDialogForm = document.querySelector("#editTodoDialog form");
    editDialogForm.addEventListener("submit", updateTask);
  });

  taskContainer.innerHTML = `
  <div>
    <div class = "task-info2">
    <button class = "taskDone"></button>
    <h4 class = "taskTitle">${task.title}</h4>
    </div>
  </div>
  `;

  const innerDiv = taskContainer.querySelector("div");
  const innerDiv2 = taskContainer.querySelector(".task-info2");
  if (isValid(dateObject)) {
    innerDiv2.innerHTML += `<p class = "date">${format(
      dateObject,
      "LLLL d, y"
    )}</p>`;
  }

  if (
    task.timeDue !== undefined &&
    task.timeDue !== null &&
    task.timeDue !== ""
  ) {
    innerDiv2.innerHTML += `<p class = "time">${getTime(task.timeDue)}</p>`;
  }

  if (task.priority !== undefined && task.priority !== null) {
    innerDiv2.innerHTML += `<p class = "${task.priority}">${task.priority}</p>`;
  }

  if (task.description !== undefined && task.description !== null) {
    innerDiv.innerHTML += `<p class = "taskDescription">${task.description}</p>`;
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
  const timeDue = document.querySelector("#todoTime").value;
  const priorityNode = document.querySelector(
    'input[name="priorityOption"]:checked'
  );
  const priority = priorityNode !== null ? priorityNode.value : null;

  const newTodo = new Todo(
    taskName,
    taskDescription,
    dueDate,
    priority,
    timeDue
  );
  const projectJSON = JSON.parse(localStorage.getItem(projectName));
  const updateProject = Object.assign(new Project(), projectJSON);
  updateProject.addToDo(newTodo);
  localStorage.setItem(projectName, JSON.stringify(updateProject));
  loadTask(newTodo);
}

function deleteTodo(projectName, taskContainer, task) {
  const projectJSON = JSON.parse(localStorage.getItem(projectName));
  const newProject = Object.assign(new Project(), projectJSON);
  newProject.removeToDo(task.id);
  localStorage.setItem(projectName, JSON.stringify(newProject));
  taskContainer.remove();
}

function updateForm(task) {
  const editTodoForm = document.querySelector("#editTodoDialog form");
  const editTitle = document.querySelector("#editTodoTitle");
  const editDescription = document.querySelector("#editTodoDesc");
  const editDate = document.querySelector("#editTodoDate");
  const editTime = document.querySelector("#editTodoTime");
  const [lowPriorityBtn, mediumPriorityBtn, highPriorityBtn] = [
    ...document.getElementsByName("editPriorityOption"),
  ];

  editTitle.value = task.title;

  if (editDescription !== undefined && editDescription !== null) {
    editDescription.value = task.description;
  }

  if (editDate !== undefined && editDate !== null) {
    editDate.value = task.dueDate;
  }

  if (editTime !== undefined && editTime !== null) {
    editTime.value = task.timeDue;
  }

  if (task.priority === "Low") {
    lowPriorityBtn.checked = true;
  } else if (task.priority === "Medium") {
    mediumPriorityBtn.checked = true;
  } else if (task.priority === "Hard") {
    highPriorityBtn.checked = true;
  }
}

function getTime(time) {
  let [hours, minutes] = [...time.split(":")];
  let meridian;

  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
    }
    hours = hours[1];
  } else {
    meridian = "PM";
  }

  return `${hours}:${minutes} ${meridian}`;
}

export {
  loadProject,
  loadProjectList,
  updateProjectList,
  initialLoad,
  createTodo,
};
