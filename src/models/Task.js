class Task {
    constructor(title, description, dueDate, priority, category) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = 'pending';
        this.category = category;
        this.dueDateView = '';
        
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

    getStatus() {
        return this.status;
    }

    setDueDateView() {
        if (this.dueDate === '') {
            this.dueDateView = '';
            return;
        }
        
        const today = new Date();
        const dueDate = new Date(this.dueDate);
        
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        switch (diffDays) {
            case 0:
                this.dueDateView = 'Hoy';
                break;
            case 1:
                this.dueDateView = 'Mañana';
                break;
            default:
                this.dueDateView = `En ${diffDays} días`;
                break;
        }
    }

}

export default Task;