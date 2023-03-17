"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", handleFormSubmit);

    loadTasks(); 
});

function getFormData(form) {
    return {
        name: form.querySelector("#taskname").value, 
        date: form.querySelector("#date").value, 
        urgency: form.querySelector("#taskurgency").value
    };
}

function storeTask(task) {
    if (!localStorage) {
        alert("Localstorage not supported!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("ToDo_Tasks"));
    if (!tasks) {
        tasks = {};
    }

    const tasksLength = Object.keys(tasks).length;
    tasks[tasksLength + 1] = task;
    localStorage.setItem("ToDo_Tasks", JSON.stringify(tasks));
}

function loadTaskElement(task) {
    return `
        <li class="task-item">
            <p><strong>Task Name:</strong> ${task.name}</p>
            <p><strong>Due Date:</strong> ${task.date}</p>
            <p><strong>Urgency:</strong> ${task.urgency}</p>
        </li>
    `;
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("ToDo_Tasks"));
    console.log(tasks)
    const $taskList = document.querySelector("#tasks-list");
    let taskListHtml = $taskList.innerHTML;

    // Loop over stored tasks and append their formatted html to the list
    Object.keys(tasks).forEach((key) => {
        taskListHtml += loadTaskElement(tasks[key]);
    });

    $taskList.innerHTML = taskListHtml;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const $taskList = document.querySelector("#tasks-list");
    let taskListHtml = $taskList.innerHTML;
    const $form = document.querySelector("form");

    // collect form data
    const formData = getFormData($form);
    storeTask(formData);

    taskListHtml += loadTaskElement(formData);
    $taskList.innerHTML = taskListHtml;
}