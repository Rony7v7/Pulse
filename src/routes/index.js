import { Router } from 'express';
import TaskManager from '../controllers/TaskManager.js';

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

router.post('/', (req, res) => { 
    console.log(req.body);
});

router.post('/add-task', (req, res) => {
    const { title, description } = req.body;
    taskManager.addTask(title, description);
    res.redirect('/');
});



export default router;