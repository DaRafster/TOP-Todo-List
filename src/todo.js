import uniqid from "uniqid";
class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority,
    timeDue,
    completed = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.timeDue = timeDue;
    this.completed = completed;
    this.id = uniqid();
  }
}

export { Todo };
