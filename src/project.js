class Project {
  constructor(name) {
    this._name = name;
    this._todos = [];
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get todos() {
    return this._todos;
  }

  addToDo(item) {
    this._todos.push(item);
  }

  removeToDo(taskId) {
    this._todos = this._todos.filter((todo) => todo.id !== taskId);
  }

  updateTodo(taskId, task) {
    for (let i = 0; i < this._todos.length; i++) {
      if (this._todos[i].id === taskId) {
        this._todos[i].title = task.title;
        this._todos[i].description = task.description;
        this._todos[i].priority = task.priority;
        this._todos[i].dueDate = task.dueDate;
        this._todos[i].timeDue = task.timeDue;
        this._todos[i].id = task.id;
        return;
      }
    }
  }

  sortTodos() {
    this._todos = this._todos.sort((a, b) => {
      let aHours, aMins;
      let bHours, bMins;

      if (a.timeDue !== undefined) {
        [aHours, aMins] = a.timeDue.split(":").map(Number);
      } else {
        aHours = 24;
        aMins = 59;
      }

      if (b.timeDue !== undefined) {
        [bHours, bMins] = b.timeDue.split(":").map(Number);
      } else {
        bHours = 24;
        bMins = 59;
      }

      const aDate = new Date(a.dueDate);
      aDate.setHours(aHours, aMins);

      const bDate = new Date(b.dueDate);
      bDate.setHours(bHours, bMins);

      return aDate - bDate;
    });
  }
}

export { Project };
