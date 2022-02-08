import express from 'express';
// import Card from '../models/card.js';
import authentication from './middleware/authentication.js';
import { createTask, getTaskById, getAllTasks, deleteTask} from '../controllers/card.js';
const cardRouter = express.Router()

cardRouter.post('/tasks', authentication, createTask)
cardRouter.delete('/tasks/:id', authentication, deleteTask)
cardRouter.get('/tasks', authentication, getAllTasks)
cardRouter.get('/tasks/:id', authentication, getTaskById)


export { cardRouter };