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
  const taskList = new TaskList();
  // Load tasks from localStorage when the page loads
  window.onload = function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
      taskList.addTask(task.description, task.priority);
    });
  };

  // Event listener for form submission to create a new task
  const newTaskForm = document.getElementById("create-task-form");

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTaskDescription = document.getElementById("new-task-description").value.trim();
    const newTaskPriority = document.getElementById("priority-select").value;
    
    if (newTaskDescription) {
      taskList.addTask(newTaskDescription, newTaskPriority);
      saveTaskToLocalStorage(newTaskDescription, newTaskPriority);
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
      removeTaskFromLocalStorage(taskDescription);
    }
  });

  // Function to save a task to localStorage
  function saveTaskToLocalStorage(description, priority) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ description, priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to remove a task from localStorage
  function removeTaskFromLocalStorage(description) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.description !== description);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});