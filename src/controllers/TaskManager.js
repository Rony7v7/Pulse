import Task from '../models/Task.js';

class TaskManager { //clase para manejar las tareas
    constructor() {
        this.tasks = [];
        // tests
        this.addTask(new Task('Task ', 'Lorem ipsum dolor sit amet consectetur', '2021-01-01', 'priority-1', 'todo'));
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

}


export default TaskManager;