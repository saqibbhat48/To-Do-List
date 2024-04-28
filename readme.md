# To-Do List Web Application

- This To-Do List web application allows users to manage their tasks effectively, including features like adding tasks with due dates, marking   tasks as completed, editing task names, and deleting tasks.

## How It Works
Adding Tasks:
Users can input a task name and select a due date using the provided input fields.
Clicking the "Add" button will create a new task item with the entered details.
If no due date is specified, it defaults to "no due date".

## Task Management:
- Editing Task Name: Users can edit the name of a task directly by clicking on it and typing the new name. Pressing Enter will save the changes.
- Completing Tasks: Users can mark tasks as completed by clicking the checkbox next to the task name. Completed tasks are visually distinguished with a strikethrough effect.
- Deleting Tasks: Tasks can be deleted individually by clicking the delete button next to each task.

## Task Statistics:
### The application displays real-time statistics for the user:
- Remaining Tasks: Shows the number of tasks that are not yet completed.
- Completed Tasks: Displays the number of tasks that have been marked as completed.
- Total Tasks: Indicates the total number of tasks in the list.

## Due Dates:
- Users can set due dates for tasks using the date picker provided alongside the task input field.
- The due date is displayed along with the task, allowing users to track deadlines easily.

## Additional Features:
- Styling:
Utilizes Tailwind CSS for styling, providing a modern and responsive design.
Font Awesome icons are used for visual elements such as the delete button.

## Task Persistence:
- Tasks are stored locally using the browser's localStorage API, ensuring that tasks persist even after the user refreshes the page or closes the browser.

## How to Use:
- Add Tasks: Enter a task name and optionally select a due date, then click the "Add" button.
- Manage Tasks: Edit task names by clicking on them, mark tasks as completed by checking the checkbox, or delete tasks by clicking the delete button.
- View Statistics: Monitor the remaining, completed, and total tasks displayed at the top of the list.