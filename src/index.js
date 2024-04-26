document.addEventListener("DOMContentLoaded", () => {
  // Define Task class
  class Task {
    constructor(description, priority) {
      this.description = description;
      this.priority = priority;
    }

    // Render method to generate HTML representation of task
    render() {
      let priorityClass = "";
      if (this.priority === "low") {
        priorityClass = "low-priority";
      } else if (this.priority === "medium") {
        priorityClass = "medium-priority";
      } else if (this.priority === "high") {
        priorityClass = "high-priority";
      }

      return `
        <li class="${priorityClass}">
          <span>${this.description}</span>
          <button class="delete-btn">X</button>
        </li>
      `;
    }
  }

  // Define TaskList class
  class TaskList {
    constructor() {
      this.tasks = [];
      this.taskUl = document.getElementById("tasks");
    }

    // Method to add a new task
    addTask(description, priority) {
      const task = new Task(description, priority);
      this.tasks.push(task);
      this.renderTasks();
    }

    // Method to render all tasks
    renderTasks() {
      this.taskUl.innerHTML = this.tasks.map(task => task.render()).join("");
    }

    // Method to delete a task
    deleteTask(description) {
      this.tasks = this.tasks.filter(task => task.description !== description);
      this.renderTasks();
    }
  }

  // Create an instance of TaskList
  const taskList = new TaskList();
  const newTaskForm = document.getElementById("create-task-form");

  // Event listener for form submission to create a new task
  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTaskDescription = document.getElementById("new-task-description").value.trim();
    const newTaskPriority = document.getElementById("priority-select").value;
    if (newTaskDescription) {
      taskList.addTask(newTaskDescription, newTaskPriority);
      e.target.reset();
    } else {
      alert("Please enter a task description.");
    }
  });

  // Event listener for task deletion
  const taskUl = document.getElementById("tasks");
  taskUl.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const taskDescription = e.target.previousElementSibling.textContent;
      taskList.deleteTask(taskDescription);
    }
  });
});