class Task {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

class TodoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.filter = "all";
    this.taskListEl = document.getElementById("taskList");
    this.taskInput = document.getElementById("taskInput");
    this.dueDateInput = document.getElementById("dueDate");
    this.addBtn = document.getElementById("addBtn");

    this.addBtn.addEventListener("click", () => this.addTask());

    this.render();
  }

  saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask() {
    const name = this.taskInput.value.trim();
    const dueDate = this.dueDateInput.value;

    if (name === "") return;

    this.tasks.push(new Task(name, dueDate));
    this.taskInput.value = "";
    this.dueDateInput.value = "";

    this.saveToStorage();
    this.render();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveToStorage();
    this.render();
  }

  toggleTask(index) {
    this.tasks[index].toggle();
    this.saveToStorage();
    this.render();
  }

  editTask(index) {
    const newName = prompt("Edit task:", this.tasks[index].name);
    if (newName !== null && newName.trim() !== "") {
      this.tasks[index].name = newName.trim();
      this.saveToStorage();
      this.render();
    }
  }

  setFilter(filter) {
    this.filter = filter;
    this.render();
  }

  render() {
    this.taskListEl.innerHTML = "";

    let filteredTasks = this.tasks;
    if (this.filter === "completed") {
      filteredTasks = this.tasks.filter(t => t.completed);
    } else if (this.filter === "incomplete") {
      filteredTasks = this.tasks.filter(t => !t.completed);
    }

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      li.innerHTML = `
        <span class="task-text">${task.name}</span>
        <small>Due: ${task.dueDate || 'No date'}</small>
        <div class="actions">
          <button onclick="todo.toggleTask(${index})">✔</button>
          <button onclick="todo.editTask(${index})">✏️</button>
          <button onclick="todo.deleteTask(${index})">🗑</button>
        </div>
      `;

      this.taskListEl.appendChild(li);
    });
  }
}

const todo = new TodoList();
