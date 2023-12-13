import Task from '../models/Task.js';

class TaskManager { //clase para manejar las tareas
    constructor() {
        this.tasks = [];
        // test
        this.tasks.push(new Task('Tarea 1', 'Descripcion 1', '2024-01-01', 'priority-1', 'category-1'));
        this.tasks.push(new Task('Tarea 2', 'Descripcion 2', '2024-01-02', 'priority-2', 'category-2'));
        this.tasks.push(new Task('Tarea 3', 'Descripcion 3', '2024-01-03', 'priority-3', 'category-3'));
        this.tasks.push(new Task('Tarea 4', 'Descripcion 4', '2024-01-04', 'priority-1', 'category-1'));
        this.tasks.push(new Task('Tarea 5', 'Descripcion 5', '2024-01-05', 'priority-2', 'category-2'));
        this.tasks.push(new Task('Tarea 6', 'Descripcion 6', '2024-01-06', 'priority-3', 'category-3'));
        this.tasks.push(new Task('Tarea 7', 'Descripcion 7', '2024-01-07', 'priority-1', 'category-1'));
        this.tasks.push(new Task('Tarea 8', 'Descripcion 8', '2024-01-08', 'priority-2', 'category-2'));
        this.tasks.push(new Task('Tarea 9', 'Descripcion 9', '2024-01-09', 'priority-3', 'category-3'));
        this.tasks.push(new Task('Tarea 10', 'Descripcion 10', '2024-01-10', 'priority-1', 'category-1'));
        this.tasks.push(new Task('Tarea 11', 'Descripcion 11', '2024-01-11', 'priority-2', 'category-2'));
        this.tasks.push(new Task('Tarea 12', 'Descripcion 12', '2024-01-12', 'priority-3', 'category-3'));
        this.tasks.push(new Task('Tarea 13', 'Descripcion 13', '2024-01-13', 'priority-1', 'category-1'));
        this.tasks.push(new Task('Tarea 14', 'Descripcion 14', '2024-01-14', 'priority-2', 'category-2'));
        this.tasks.push(new Task('Tarea 15', 'Descripcion 15', '2024-01-15', 'priority-3', 'category-3'));
        this.tasks.push(new Task('Tarea 16', 'Descripcion 16', '2024-01-16', 'priority-1', 'category-1'));
        this.tasks.push(new Task('Tarea 17', 'Descripcion 17', '2024-01-17', 'priority-2', 'category-2'));
        this.tasks.push(new Task('Tarea 18', 'Descripcion 18', '2024-01-18', 'priority-3', 'category-3'));
        this.tasks.push(new Task('Tarea 19', 'Descripcion 19', '2024-01-19', 'priority-1', 'category-1'));
        this.tasks.push(new Task('Tarea 20', 'Descripcion 20', '2024-01-20', 'priority-2', 'category-2'));
        
    }

    addTask(task) { //funcion para añadir tarea
        this.tasks.push(task);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    renderTasks() {
        this.sortTasksBy('dueDate');
        
        let tasksPending = this.tasks.filter((task) => !task.isCompleted);
        let tasksCompleted = this.tasks.filter((task) => task.isCompleted); 

        return [tasksPending, tasksCompleted];
    }

    sortTasksBy(field) {
        this.tasks.sort((a, b) => {
            if (a[field] < b[field]) {
                return -1;
            }
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        });
    }

    getDate() { // Retorna un array con la hora actual (hh:mm), el formato (pm o am) y la fecha (<DIA>, <dia> de <MES> )
        const date = new Date();

        // Hora 12 horas, minutos, formato (am o pm)
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const hour = new Intl.DateTimeFormat('en-US', options).format(date);
        const format = hour.slice(-2).toLowerCase();

        // Dia de la semana, dia del mes, mes
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        let dayName = date.toLocaleString('default', { weekday: 'long' });
        dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

        // Auxiliar (dias, tardes, noches)
        let aux = '';
        if (date.getHours() >= 6 && date.getHours() < 12) {
            aux = 'Buenos dias';
        } else if (date.getHours() >= 12 && date.getHours() < 18) {
            aux = 'Buenas tardes';
        } else {
            aux = 'Buenas noches';
        }

        return [hour.split(' ')[0], format, `${dayName}, ${day} de ${month}`, aux];
    }

    completeTasks(ids) {
        ids.forEach((id) => {
            const task = this.tasks.find((task) => task.id === id);
            task.complete();
        });
    }

    deleteCompleteTasks() {
        this.tasks = this.tasks.filter((task) => !task.isCompleted);
    }

}


export default TaskManager;