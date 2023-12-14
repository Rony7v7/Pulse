import { promises as fs } from 'fs';
class TaskManager {
    constructor(userID) {
        this.userID = userID;
        this.filePATH = `./src/data/${this.userID}.json`;
        this.tasks = [];
        this.loadTasks();
        // Esperar a que se carguen las tareas
        this.tasksView = [];
        setTimeout(() => {
            this.tasksView = this.tasks;
        }, 50);
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
            await fs.writeFile(this.filePATH, JSON.stringify(this.tasks, null, 2));
        } catch (error) {
            console.error(error);
        }
    }

    addTask(task) {
        this.tasks.push(task);
        this.tasksView = this.tasks;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.tasksView = this.tasks;
    }

    getTask(id) {
        return this.tasks.find((task) => task.id === id);
    }

    renderTasks() {
        this.sortTasksBy('dueDate');
        this.saveTasks();
        
        let tasksPending = this.tasksView.filter((task) => !task.isCompleted);
        let tasksCompleted = this.tasksView.filter((task) => task.isCompleted);

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

    filterTasksBy(tasks, field, value) {
        
        if (tasks.length === 0) return;

        if (field === 'title') {
            return tasks.filter((task) => task[field].toLowerCase().includes(value.toLowerCase()));
        }

        if (field === 'dueDate' || field === 'priority' || field === 'category') {
            return tasks.filter((task) => task[field] === value);
        }

        if (field === 'isCompleted') {
            return tasks.filter((task) => task[field] === value);
        }

        if (field === 'daysLeft') { //TODO: Hacer que las tareas manejen el tiempo restante
            return tasks.filter((task) => task[field] <= value);
        }

    }

    filterTasks(title, status, priority, daysLeft, category) {
        this.tasksView = this.tasks;

        if (title !== '' && this.tasksView.length !== 0) {
            this.tasksView = this.filterTasksBy(this.tasksView, 'title', title);
        }

        if (status !== 'all' && this.tasksView.length !== 0) {
            this.tasksView = this.filterTasksBy(this.tasksView, 'isCompleted', status === 'true' ? true : false);
        }

        if (priority !== 'all' && this.tasksView.length !== 0) {
            this.tasksView = this.filterTasksBy(this.tasksView, 'priority', priority);
        }

        if (daysLeft !== '' && this.tasksView.length !== 0) {
            this.tasksView = this.filterTasksBy(this.tasksView, 'daysLeft', daysLeft);
        }

        if (category !== '' && this.tasksView.length !== 0) {
            this.tasksView = this.filterTasksBy(this.tasksView, 'category', category);
        }

        return [this.tasksView.filter((task) => !task.isCompleted), this.tasksView.filter((task) => task.isCompleted)];
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
        this.tasksView = this.tasks;
    }

    deleteCompleteTasks() {
        this.tasks = this.tasks.filter((task) => !task.isCompleted);
        this.tasksView = this.tasks;
    }

}


export default TaskManager;