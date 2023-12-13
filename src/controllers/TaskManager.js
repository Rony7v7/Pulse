import { get } from 'http';
import Task from '../models/Task.js';
import { promises as fs } from 'fs';
class TaskManager { //clase para manejar las tareas
    constructor(userID) {
        this.userID = userID;
        this.filePATH = `./src/data/${this.userID}.json`;
        this.tasks = [];
        this.loadTasks();
    }

    async loadTasks() {
        try {
            const data = await fs.readFile(this.filePATH, 'utf8');
            if (data === '') return;
            this.tasks = JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    }

    async saveTasks() {
        try {
            await fs.writeFile(this.filePATH, JSON.stringify(this.tasks));
        } catch (error) {
            console.error(error);
        }
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    getTask(id) {
        return this.tasks.find((task) => task.id === id);
    }

    renderTasks() {
        this.sortTasksBy('dueDate');
        this.saveTasks();
        
        let tasksPending = this.tasks.filter((task) => !task.isCompleted);
        let tasksCompleted = this.tasks.filter((task) => task.isCompleted); 

        return [tasksPending, tasksCompleted];
    }

    sortTasksBy(field) {
        if (this.tasks.length === 0) return;

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
            const task = this.getTask(id);
            task.isCompleted = true;
        });
    }

    deleteCompleteTasks() {
        this.tasks = this.tasks.filter((task) => !task.isCompleted);
    }

}


export default TaskManager;