function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskList = document.getElementById('newTaskList'); // Reference the correct list

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.style.display = 'flex'; // Use flexbox for alignment
        newTask.style.alignItems = 'center'; // Vertically align items
        newTask.style.justifyContent = 'space-between'; // Space between left and right elements
        newTask.style.padding = '5px 0'; // Optional: Add padding for better spacing

        // Create a wrapper for the checkbox and task text
        const leftWrapper = document.createElement('div');
        leftWrapper.style.display = 'flex'; // Align checkbox and text horizontally
        leftWrapper.style.alignItems = 'center'; // Vertically align items
        leftWrapper.style.gap = '1px'; // Add spacing between checkbox and text

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginLeft = '20px';
        checkbox.style.marginTop = '8px';

        // Create the task text
        const taskText = document.createElement('span');
        taskText.textContent = taskInput.value;
        taskText.style.display = 'inline-block'; // Ensure the text aligns properly
        taskText.style.verticalAlign = 'middle';
        taskText.style.lineHeight = '16px'; 

        // Append the checkbox and task text to the wrapper
        leftWrapper.appendChild(checkbox);
        leftWrapper.appendChild(taskText);

        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.display = 'flex'; // Use flexbox for alignment
        buttonWrapper.style.gap = '1px'; 

        // Create the "X" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.color = 'white';
        deleteButton.style.cursor = 'pointer'; // Change cursor to pointer
        deleteButton.style.marginRight = '10px'; // Add margin to the right
        deleteButton.onclick = function () {
            newTaskList.removeChild(newTask); // Remove the task when "X" is clicked
        };

        // Create the "Edit" button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.color = 'white';
        editButton.style.cursor = 'pointer'; // Change cursor to pointer
        editButton.style.marginRight = '10px'; // Add margin to the right
        editButton.onclick = function () {
            // Allow editing the task text
            const newText = prompt('Edit your task:', taskText.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskText.textContent = newText; // Update the task text
            }
        };

        buttonWrapper.appendChild(deleteButton);
        buttonWrapper.appendChild(editButton);

        // Append the wrapper and "X" button to the task
        newTask.appendChild(leftWrapper);
        newTask.appendChild(buttonWrapper);

        // Append the task to the task list
        newTaskList.appendChild(newTask);

        // After creating your checkbox and newTask <li> element:
        checkbox.addEventListener('change', function() {
            const finishedTaskList = document.querySelector('.finished-tasks ul');
            const newTaskList = document.querySelector('.new-tasks ul');
            if (this.checked) {
                finishedTaskList.appendChild(newTask);
            } else {
                newTaskList.appendChild(newTask);
            }
        });

        // Clear the input field
        taskInput.value = '';
    }
}

function renderTask(task, isFinished) {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isFinished;
    checkbox.addEventListener('change', function() {
        if (isFinished) {
            // Move back to new tasks
            moveToNewTasks(task.id);
        } else {
            // Move to finished tasks
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

// When rendering, use:
function renderTasks() {
    // ...clear lists...
    newTasks.forEach(task => {
        document.getElementById('newTaskList').appendChild(renderTask(task, false));
    });
    finishedTasks.forEach(task => {
        document.getElementById('finishedTaskList').appendChild(renderTask(task, true));
    });
}

function deleteTask(taskId, isFinished) {
    if (isFinished) {
        // Remove from finishedTasks array
        finishedTasks = finishedTasks.filter(task => task.id !== taskId);
    } else {
        // Remove from newTasks array
        newTasks = newTasks.filter(task => task.id !== taskId);
    }
    renderTasks();
}