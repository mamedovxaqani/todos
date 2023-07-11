"use strict";

const tasks = document.querySelector('.tasks')
const taskLocal = JSON.parse(localStorage.getItem('tasks')) || []

document.addEventListener('DOMContentLoaded', () => {
    saveTasksFromLocalStorage(taskLocal)
})
const form = document.forms.form

tasks.addEventListener('click', (event) => {
    const currentTask = event.target
    changeDoneStatus(currentTask)
    event.target.classList.toggle('done')

})

form.addEventListener('submit', (event) => {
    const formTask = form.elements.task
    event.preventDefault()
    createElement(formTask)
    formTask.value = ''
})

function saveTasksFromLocalStorage (taskLocal) {
    const liElement = taskLocal.map((element) => {
        const li = document.createElement('li')
        li.innerHTML = element.task
        return li
    })

    tasks.append(...liElement)
}

function createElement(task) {
    const taskObject = {
        isDone: false,
        task: task.value
    }

    if (!task.value || taskIsInTaskArray(task.value)) {
        return
    }

    taskLocal.push(taskObject)

    localStorage.setItem('tasks', JSON.stringify(taskLocal))
    const li = document.createElement('li')
    const close = document.createElement('span')
    close.innerHTML = 'X'
    li.append(taskObject.task)
    tasks.append(li)
}

function taskIsInTaskArray(checkTask) {
    return taskLocal.some(item => item.task === checkTask)
}

function changeDoneStatus(currentTask) {
    const thisTask = taskLocal.find(task => task.task === currentTask.innerHTML)
    thisTask.isDone = !thisTask.isDone
    localStorage.setItem('tasks', JSON.stringify(taskLocal))
}