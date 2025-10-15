let taskInput = document.getElementById("taskInput");
        let tasks = [];

        // Load tasks from localStorage when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadTasksFromStorage();
            renderTasks();
        });

        // Save tasks to localStorage
        function saveTasksToStorage() {
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
        }

        // Load tasks from localStorage
        function loadTasksFromStorage() {
            const storedTasks = localStorage.getItem('todoTasks');
            if (storedTasks) {
                tasks = JSON.parse(storedTasks);
            }
        }

        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }

        function renderTasks() {
            let tasklist = document.getElementById("tasklist");
            if (!tasklist) return;
            tasklist.innerHTML = "";
            
            if (tasks.length === 0) {
                let emptyMessage = document.createElement("li");
                emptyMessage.className = "taskItem";
                emptyMessage.style.justifyContent = "center";
                emptyMessage.innerHTML = `<span class="taskText" style="color: var(--text-light); font-style: italic;">No tasks yet. Add one above!</span>`;
                tasklist.appendChild(emptyMessage);
                return;
            }
            
            tasks.forEach((t, index) => {
                let li = document.createElement("li");
                li.className = "taskItem";
                li.innerHTML = `
                    <label>
                        <input type="checkbox" onchange="toggleTask(${index})" ${t.checked ? 'checked' : ''}>
                        <span class="taskText ${t.checked ? 'completed' : ''}">${escapeHtml(t.text)}</span>
                    </label>
                    <span class="delete-icon" onclick="deleteTask(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </span>
                `;
                tasklist.appendChild(li);
            });
        }

        function AddTask() {
            if (!taskInput) return;
            const value = taskInput.value.trim();
            if (value === "") {
                // Create a nicer notification instead of alert
                taskInput.style.borderColor = "var(--danger-color)";
                taskInput.placeholder = "Please enter a task";
                setTimeout(() => {
                    taskInput.style.borderColor = "var(--medium-gray)";
                    taskInput.placeholder = "Add a new task";
                }, 2000);
                return;
            }
            tasks.push({ text: value, checked: false });
            saveTasksToStorage(); // Save to localStorage
            renderTasks();
            taskInput.value = "";
            taskInput.focus();
        }

        function toggleTask(index) {
            if (typeof tasks[index] === 'undefined') return;
            tasks[index].checked = !tasks[index].checked;
            saveTasksToStorage(); // Save to localStorage
            renderTasks();
        }

        function deleteTask(index) {
            if (typeof tasks[index] === 'undefined') return;
            tasks.splice(index, 1);
            saveTasksToStorage(); // Save to localStorage
            renderTasks();
        }

        // Allow adding tasks with Enter key
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                AddTask();
            }
        });