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

        // Create the "X" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.color = 'white';
        deleteButton.style.cursor = 'pointer'; // Change cursor to pointer
        deleteButton.style.marginRight = '10px'; // Add margin to the right
        deleteButton.onclick = function () {
            newTaskList.removeChild(newTask); // Remove the task when "X" is clicked
        };

        // Append the wrapper and "X" button to the task
        newTask.appendChild(leftWrapper);
        newTask.appendChild(deleteButton);

        // Append the task to the task list
        newTaskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = '';
    }
}