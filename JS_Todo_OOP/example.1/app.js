class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this.taskListEl = document.getElementById("taskList");
    this.taskInput = document.getElementById("taskInput");
    this.addBtn = document.getElementById("addBtn");

    this.addBtn.addEventListener("click", () => this.addTask());
  }

  addTask() {
    const taskName = this.taskInput.value.trim();
    if (taskName === "") return;

    const task = new Task(taskName);
    this.tasks.push(task);
    this.taskInput.value = "";

    this.render();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.render();
  }

  toggleTask(index) {
    this.tasks[index].toggle();
    this.render();
  }

  render() {
    this.taskListEl.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      li.innerHTML = `
        <span>${task.name}</span>
        <div>
          <button onclick="todo.toggleTask(${index})">✔</button>
          <button onclick="todo.deleteTask(${index})">🗑</button>
        </div>
      `;

      this.taskListEl.appendChild(li);
    });
  }
}

// Global access for inline event handlers
const todo = new TodoList();

