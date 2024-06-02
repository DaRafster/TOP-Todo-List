class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get title() {
    return this.title;
  }

  set title(title) {
    this.title = title;
  }

  get description() {
    this.description = description;
  }

  set description(description) {
    this.description = description;
  }

  get dueDate() {
    return this.dueDate;
  }

  set dueDate(dueDate) {
    this.dueDate = dueDate;
  }

  get priority() {
    return this.priority;
  }

  set priority(priority) {
    this.priority = priority;
  }
}

export { Todo };
