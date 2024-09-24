////TO DO LIST: use of DOM and localstorage
///
//working code, needs some cleanup/better comments/ increased functionality/adaptability
document.addEventListener("DOMContentLoaded", () => {
  // Task class
  class Task {
    constructor(description, priority) {
      this.description = description;
      this.priority = priority;
    }

    // Render method with priority mapping
    render() {
      const priorityClasses = {
        low: "low-priority",
        medium: "medium-priority",
        high: "high-priority",
      };
      const priorityClass = priorityClasses[this.priority] || "";
      return `
        <li class="${priorityClass}">
          <span>${this.description}</span>
          <button class="delete-btn">X</button>
        </li>
      `;
    }
  }
  class TaskList {
    constructor() {
      this.tasks = [];
      this.taskUl = document.getElementById("tasks");
    }

    addTask(description, priority) {
      const task = new Task(description, priority);
      this.tasks.push(task);
      this.renderTasks();
    }

    renderTasks() {
      if (this.tasks.length === 0) {
        // If no tasks, clear the <ul> completely to avoid empty <li> elements
        this.taskUl.innerHTML = ""; 
      } else {  
        this.taskUl.innerHTML = this.tasks.map(task => task.render()).join("");
      }
    }

    deleteTask(description) {
      this.tasks = this.tasks.filter(task => task.description !== description);
      this.renderTasks();
    }

    clearTasks() {
      this.tasks = [];
      this.renderTasks();
      localStorage.removeItem('tasks');
    }
  }

  // Create taskList instance
  const taskList = new TaskList();
  // Load tasks from localStorage
  window.onload = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => taskList.addTask(task.description, task.priority));
  };

  // Save task to localStorage
  function saveTaskToLocalStorage(description, priority) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ description, priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove task from localStorage
  function removeTaskFromLocalStorage(description) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.description !== description);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Handle form submission
  const newTaskForm = document.getElementById("create-task-form");
  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("new-task-description").value.trim();
    const priority = document.getElementById("priority-select").value;
    if (description && description.length < 40) {
      taskList.addTask(description, priority);
      saveTaskToLocalStorage(description, priority);
      e.target.reset();
    } else if(description.length > 40){
      // Display error if task description is invalid
      alert("Error: Task description must be less than 40 characters.");
    } else {
      console.log("You have completed all your todos, nice1");
    }
  });

  // Handle task deletion
  const taskUl = document.getElementById("tasks");
  taskUl.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const taskLi = e.target.closest("li"); 
      const taskDescription = taskLi.querySelector("span").textContent;
      taskList.deleteTask(taskDescription); 
      removeTaskFromLocalStorage(taskDescription); 
    }
  });

  // Clear all button
  const clearButton = document.getElementById("clear-tasks-btn");
  clearButton.addEventListener("click", () => {
    taskList.clearTasks();
    localStorage.removeItem("tasks");
  }
  );
});
