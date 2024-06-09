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

  removeToDo(index) {
    this._todos.splice(index, 1);
  }
}

export { Project };
