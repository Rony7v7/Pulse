import { Router } from 'express';
import TaskManager from '../controllers/TaskManager.js'
import Task from '../models/Task.js';

const router = Router();

const taskManager = new TaskManager();

router.get('/', (req, res) => { 
    res.render('index',{
        username: 'Rony', 
        tasks: taskManager.renderTasks(),
        date: taskManager.getDate(),
        controller: taskManager}) 
});

router.get('/about', (req, res) => { res.render('index') });

router.get('/contact', (req, res) => { res.render('index') });

router.get('/login', (req, res) => { res.render('login') });

router.post('/', (req, res) => { 
    const newTask = new Task(req.body.title, req.body.description, req.body.dueDate, req.body.priority, req.body.category);
    taskManager.addTask(newTask);
    res.redirect('/');
})

export default router;