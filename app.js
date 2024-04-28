// Selecting DOM elements
const inputTask = document.querySelector('#inputTask'); // Input field for task name
const btn1 = document.querySelector('#btn1'); // Button to add a new task
const ul = document.querySelector('ul'); // Task list
const remaining = document.querySelector('.remaining span'); // Remaining tasks counter
const completed = document.querySelector('.completed span'); // Completed tasks counter
const total = document.querySelector('.total span'); // Total tasks counter
const date = document.querySelector('#date'); // Input field for due date

// Array to store tasks, retrieving from local storage or initializing as an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// If there are tasks in local storage, create tasks in the UI for each stored task
if(localStorage.getItem('tasks')){
    tasks.map((task) =>{
        createTask(task);
    })
}

// Event listener for adding a new task
btn1.addEventListener('click', () =>{
    let inputValue = inputTask.value; // Get task name input value
    let dateValue = date.value; // Get due date input value

    // If no due date is provided, set it to 'no due date'
    if(dateValue === ''){
        dateValue = 'no due date'
    }
    
    // If task name is empty, show an alert
    if(inputValue === ''){
        alert('task cannot be empty');
    }
    else{
        // Create a new task object with current timestamp as ID, task name, due date, and completion status
        const task = {
            id: new Date().getTime(),
            name: inputValue,
            dueDate: dateValue,
            isCompleted: false
        }

        // Add the new task to the tasks array
        tasks.push(task)
        // Save updated tasks array to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Create the task in the UI
        createTask(task);
    }

    // Clear input fields after adding a new task
    inputTask.value = '';
    date.value = '';
});

// Function to create a new task element in the UI
function createTask(task){
    const taskEl = document.createElement('li'); // Create a new list item element for the task
    taskEl.setAttribute('id', task.id); // Set the ID attribute of the list item

    // If the task is completed, add the 'checked' class to the list item for styling
    if(task.isCompleted){
        taskEl.classList.add('checked')
    }

    // HTML markup for the task element, including task name, due date, and delete button
    const taskElMarkup = `
        <div>
            <input type="checkbox">
            <span contenteditable id="taskText">${task.name}</span>
            <span id="dueDate">Due: ${task.dueDate}</span>
        </div>
        <button id="delete" class="removeTask"><i class="fa-regular fa-trash-can"></i></button>
    `;

    taskEl.innerHTML = taskElMarkup; // Set the HTML markup as the inner content of the list item

    ul.appendChild(taskEl); // Append the task element to the task list

    setupCheckboxListeners(); // Add event listeners to the checkboxes
    countTask(); // Update task counters
}

// Function to update task counters
function countTask(){
    const completedTasksArray = tasks.filter((task) => task.isCompleted === true);

    // Update counters with total, completed, and remaining tasks
    total.innerText = tasks.length
    completed.innerText = completedTasksArray.length
    remaining.innerText = tasks.length - completedTasksArray.length
}

// Event listener for task deletion
ul.addEventListener('click', (e) =>{
    // Check if the click target is the delete button or its parent
    if(e.target.classList.contains('removeTask') || e.target.parentElement.classList.contains('removeTask')){
        const taskId = e.target.closest('li').id
        
        removeTask(taskId) // Remove the task
    }
})

// Function to remove a task
function removeTask(taskId){
    tasks = tasks.filter((task) => task.id != parseInt(taskId)); // Filter out the task with the provided ID
    
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks array to local storage

    document.getElementById(taskId).remove(); // Remove the task element from the UI

    countTask() // Update task counters
}

// Event listener for task name editing
ul.addEventListener('input', (e) =>{
    const taskId = e.target.closest('li').id // Get the ID of the task being edited

    updateTask(taskId, e.target) // Update the task
})

// Function to update a task
function updateTask(taskId, el){
    const task = tasks.find((task) => task.id === parseInt(taskId)); // Find the task with the provided ID

    // If the edited element has contenteditable attribute, update the task name
    if(el.hasAttribute('contenteditable')){
        task.name = el.innerText
    }
    else{
        const span = el.nextElementSibling;
        const parent = el.closest('li')

        // Toggle task completion status and apply appropriate styling
        task.isCompleted = !task.isCompleted;

        if(task.isCompleted){
            span.removeAttribute('contenteditable')
            parent.classList.add('checked');
        }
        else{
            span.setAttribute('contenteditable', 'true')
            parent.classList.remove('checked');
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks)) // Save updated tasks array to local storage

    countTask() // Update task counters
}

// Prevent default behavior when pressing Enter key inside task name (prevents line break)
ul.addEventListener('keydown', (e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        e.target.blur();
    }
})

// Function to add event listeners to checkboxes for updating their state
function setupCheckboxListeners() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const taskId = checkbox.closest('li').id;
            const task = tasks.find(task => task.id === parseInt(taskId));
            task.isCompleted = checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks array to local storage
            countTask(); // Update task counters
        });
    });
}

// Function to load checkbox state from local storage and update checkboxes
function loadCheckboxState() {
    tasks.forEach(task => {
        const checkbox = document.querySelector(`li[id="${task.id}"] input[type="checkbox"]`);
        if (checkbox) {
            checkbox.checked = task.isCompleted;
        }
    });
}

window.addEventListener('load', loadCheckboxState); // Load checkbox state when the window is loaded
