import { Router } from 'express';
import TaskManager from '../controllers/TaskManager.js'
import Task from '../models/Task.js';

const router = Router();

const taskManager = new TaskManager();

router.get('/', (req, res) => { 
    let tasks = taskManager.renderTasks();
    res.render('index',{
        username: 'Rony', 
        tasksPending: tasks[0],
        tasksCompleted: tasks[1],
        date: taskManager.getDate()}) 
});

router.get('/about', (req, res) => { res.render('index') });

router.get('/contact', (req, res) => { res.render('index') });

router.get('/login', (req, res) => { res.render('login') });

router.post('/add-task', (req, res) => { 
    const newTask = new Task(req.body.title, req.body.description, req.body.dueDate, req.body.priority, req.body.category);
    taskManager.addTask(newTask);
    res.redirect('/');
})

router.post('/complete-tasks', (req, res) => { 
    const tasksIds = req.body.tasks;
    taskManager.completeTasks(tasksIds);
    res.redirect('/');
});

export default router;