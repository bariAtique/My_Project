let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskListEl = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const name = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (name === "") return;

  tasks.push({ name, dueDate, completed: false });
  taskInput.value = "";
  dueDateInput.value = "";

  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Edit task:", tasks[index].name);
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
    saveTasks();
    renderTasks();
  }
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  taskListEl.innerHTML = "";

  let filteredTasks = tasks;
  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === "incomplete") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span class="task-text">${task.name}</span>
      <small>Due: ${task.dueDate || 'No date'}</small>
      <div class="actions">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskListEl.appendChild(li);
  });
}

renderTasks();
