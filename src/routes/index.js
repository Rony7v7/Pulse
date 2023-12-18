import { Router } from 'express';
import TaskManager from '../controllers/TaskManager.js'

const router = Router();

const username = 'test';

const taskManager = new TaskManager(username);

let tasksFiltered = false;

router.get('/', (req, res) => { 
    let tasks = taskManager.renderTasks(tasksFiltered);
    res.render('index',{
        username: username, 
        tasksPending: tasks[0],
        tasksCompleted: tasks[1],
        date: taskManager.getDate()});
    tasksFiltered = false; 
});

router.get('/about', (req, res) => { res.render('index') });

router.get('/contact', (req, res) => { res.render('index') });

router.get('/login', (req, res) => { res.render('login') });

router.get('/get-task', (req, res) => {
    const task = taskManager.getTask(req.query.id);
    res.json(task);
});

router.get('/search-tasks', (req, res) => {
    const title = req.query.title;
    const status = req.query.status;
    const priority = req.query.priority;
    const daysLeft = req.query.daysLeft;
    const category = req.query.category;
    const tasks = taskManager.filterTasks(title, status, priority, daysLeft, category);
    tasksFiltered = true;
    res.json(tasks);
});

router.post('/add-task', (req, res) => { 
    taskManager.addTask(req.body.title, req.body.description, req.body.dueDate, req.body.priority, req.body.category);
    res.redirect('/');
})

router.post('/complete-tasks', (req, res) => { 
    const tasks = req.body.tasks;
    taskManager.completeTasks(tasks);
    res.sendStatus(200);
});

router.post('/edit-task', (req, res) => {
    const task = taskManager.getTask(req.body.currentTaskId);
    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.priority = req.body.priority;
    task.category = req.body.category;
    taskManager.saveTasks();
    res.redirect('/');
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