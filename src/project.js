class Project {
  static numOfProjects = 0;
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  get name() {
    return this.name;
  }

  set name(name) {
    this.name = name;
  }

  addToDo(item) {
    this.todos.push(item);
    numOfTodos++;
  }

  removeToDo(index) {
    this.todos.splice(index, 1);
    numOfTodos--;
  }
}

export { Project };
