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

  addToDo(item) {
    this._todos.push(item);
    numOfTodos++;
  }

  removeToDo(index) {
    this._todos.splice(index, 1);
    numOfTodos--;
  }
}

export { Project };
