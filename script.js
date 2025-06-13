function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskList = document.getElementById('newTaskList'); // Reference the correct list

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskInput.value;

        // Create the "X" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.marginLeft = '10px'; // Add spacing between the task and the button
        deleteButton.onclick = function () {
            newTaskList.removeChild(newTask); // Remove the task when "X" is clicked
        };

        // Append the "X" button to the task
        newTask.appendChild(deleteButton);

        // Append the task to the task list
        newTaskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = '';
    }
}