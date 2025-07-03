let newTasks = [];
let finishedTasks = [];
let taskIdCounter = 0;

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() !== '') {
        newTasks.push({
            id: ++taskIdCounter,
            text: taskInput.value.trim()
        });
        taskInput.value = '';
        renderTasks();
    }
}

// Move a task to finished
function moveToFinishedTasks(taskId) {
    const idx = newTasks.findIndex(t => t.id === taskId);
    if (idx > -1) {
        finishedTasks.push(newTasks[idx]);
        newTasks.splice(idx, 1);
        renderTasks();
    }
}

// Move a task back to new
function moveToNewTasks(taskId) {
    const idx = finishedTasks.findIndex(t => t.id === taskId);
    if (idx > -1) {
        newTasks.push(finishedTasks[idx]);
        finishedTasks.splice(idx, 1);
        renderTasks();
    }
}

// Edit a task
function editTask(taskId, isFinished) {
    const arr = isFinished ? finishedTasks : newTasks;
    const idx = arr.findIndex(t => t.id === taskId);
    if (idx > -1) {
        const newText = prompt('Edit your task:', arr[idx].text);
        if (newText !== null && newText.trim() !== '') {
            arr[idx].text = newText.trim();
            renderTasks();
        }
    }
}

// Delete a task
function deleteTask(taskId, isFinished) {
    if (isFinished) {
        finishedTasks = finishedTasks.filter(task => task.id !== taskId);
    } else {
        newTasks = newTasks.filter(task => task.id !== taskId);
    }
    renderTasks();
}

// Render a single task
function renderTask(task, isFinished) {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isFinished;
    checkbox.addEventListener('change', function() {
        if (isFinished) {
            moveToNewTasks(task.id);
        } else {
            moveToFinishedTasks(task.id);
        }
    });
    li.appendChild(checkbox);

    // Task text
    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function() {
        editTask(task.id, isFinished);
    });
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id, isFinished);
    });
    li.appendChild(deleteBtn);

    return li;
}

// Render all tasks
function renderTasks() {
    const newTaskList = document.getElementById('newTaskList');
    const finishedTaskList = document.getElementById('finishedTaskList');
    newTaskList.innerHTML = '';
    finishedTaskList.innerHTML = '';
    newTasks.forEach(task => {
        newTaskList.appendChild(renderTask(task, false));
    });
    finishedTasks.forEach(task => {
        finishedTaskList.appendChild(renderTask(task, true));
    });
}

// Allow pressing Enter to add a task
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
    document.getElementById('taskInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});