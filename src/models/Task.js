class Task {
    constructor(id = Date.now() ,title, description, dueDate, priority, category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
        this.category = category;
        this.dueDateView = '';
        this.daysLeft = 0;
        
        this.setDueDateView();
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }


    setDueDateView() {
        if (this.dueDate === '') {
            this.dueDateView = '';
            return;
        }
        
        const today = new Date();
        const dueDate = new Date(this.dueDate);
        
        const diffTime = dueDate - today;
        this.daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        switch (this.daysLeft) {
            case 0:
                this.dueDateView = 'Hoy';
                break;
            case 1:
                this.dueDateView = 'Mañana';
                break;
            default:
                this.dueDateView = `En ${this.daysLeft} días`;
                break;
        }
    }

    complete() {
        this.isCompleted = true;
    }

}

export default Task;