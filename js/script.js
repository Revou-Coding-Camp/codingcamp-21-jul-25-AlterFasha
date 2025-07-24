let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  const filterSelect = document.getElementById("statusFilter");
  const clearBtn = document.getElementById("clearAllBtn");

  form.addEventListener("submit", addTask);
  filterSelect.addEventListener("change", renderTasks);
  clearBtn.addEventListener("click", clearAll);

  renderTasks();
});

function addTask(event) {
  event.preventDefault();

  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;

  if (!text || !date) return;

  tasks.push({ text, date, done: false });

  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";

  renderTasks();
}

function toggleStatus(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearAll() {
  if (confirm("Are you sure to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const filter = document.getElementById("statusFilter").value;

  let filtered = tasks;
  if (filter === "done") {
    filtered = tasks.filter(t => t.done);
  } else if (filter === "pending") {
    filtered = tasks.filter(t => !t.done);
  }

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = "<tr><td colspan='4'>No tasks found</td></tr>";
    return;
  }

  filtered.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td>${task.done ? "Done" : "Pending"}</td>
      <td>
        <button class="action-btn" onclick="toggleStatus(${index})">✔</button>
        <button class="action-btn" onclick="deleteTask(${index})">🗑</button>
      </td>
    `;
    list.appendChild(row);
  });
}
