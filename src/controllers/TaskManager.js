import Task from '../models/Task.js';

class TaskManager { //clase para manejar las tareas
    constructor() {
        this.tasks = [];
        // tests
        this.addTask(new Task('Matar', 'Description 1', '2021-01-01', 'low', 'todo'));
        this.addTask(new Task('Task 2', 'Description 2', '2021-01-02', 'medium', 'todo'));
        this.addTask(new Task('Task 3', 'Description 3', '2021-01-03', 'high', 'todo'));
    }

    addTask(task) { //funcion para añadir tarea
        this.tasks.push(task);
    }

    deleteTask(id) {
        this.tasks.deleteTask(id);
    }

    renderTasks() {
        return this.tasks;
    }

}


export default TaskManager;