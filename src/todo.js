import uniqid from "uniqid";
class Todo {
  constructor(title, description, dueDate, priority, timeDue) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.timeDue = timeDue;
    this.id = uniqid();
  }
}

export { Todo };
