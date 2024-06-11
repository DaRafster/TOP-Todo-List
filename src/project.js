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

  removeToDo(name) {
    this._todos = this._todos.filter((todo) => todo === name);
  }
}

export { Project };
