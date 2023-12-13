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

router.get('/get-task', (req, res) => {
    const task = taskManager.getTask(req.query.id);
    res.json(task);
});

router.post('/add-task', (req, res) => { 
    const newTask = new Task(req.body.title, req.body.description, req.body.dueDate, req.body.priority, req.body.category);
    taskManager.addTask(newTask);
    res.redirect('/');
})

router.post('/complete-tasks', (req, res) => { 
    const tasks = req.body.tasks;
    taskManager.completeTasks(tasks);
    res.sendStatus(200);
});

router.delete('/delete-task', (req, res) => {
    const taskId = req.query.id;
    taskManager.deleteTask(taskId);
    res.sendStatus(200);
});

router.delete('/delete-complete-tasks', (req, res) => {
    taskManager.deleteCompleteTasks();
    res.sendStatus(200);
});

export default router;