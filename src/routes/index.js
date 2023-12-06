import { Router } from 'express';
import TaskManager from '../controllers/TaskManager.js';

const router = Router();

const taskManager = new TaskManager();

router.get('/', (req, res) => { 
    res.render('index',{
        username: 'Rony', 
        tasks: taskManager.renderTasks(),
        date: taskManager.getDate()}) 
});

router.get('/about', (req, res) => { res.render('index') });

router.get('/contact', (req, res) => { res.render('index') });

export default router;