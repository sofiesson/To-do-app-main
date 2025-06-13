function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskList = document.getElementById('newTaskList'); // Reference the correct list

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.style.display = 'flex'; // Use flexbox for alignment
        newTask.style.alignItems = 'center'; // Vertically align items
        newTask.style.gap = '1px';
        newTask.style.justifyContent = 'space-between'; 

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const taskText = document.createElement('span');
        taskText.textContent = taskInput.value;

        // Create the "X" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.marginLeft = 'auto';
        deleteButton.onclick = function () {
            newTaskList.removeChild(newTask); // Remove the task when "X" is clicked
        };

        // Append the "X" button to the task
        newTask.appendChild(checkbox);
        newTask.appendChild(taskText);
        newTask.appendChild(deleteButton);

        // Append the task to the task list
        newTaskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = '';
    }
}