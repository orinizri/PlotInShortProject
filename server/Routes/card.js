import express from 'express';
import authentication from './middleware/authentication.js';
import { createTask, getTaskById, getAllTasks, deleteTask, updateGraph} from '../controllers/card.js';
const cardRouter = express.Router()

cardRouter.post('/graph', authentication, createTask)
cardRouter.delete('/graph/:id', authentication, deleteTask)
cardRouter.get('/graphs', authentication, getAllTasks)
cardRouter.get('/graph/:id', authentication, getTaskById)
cardRouter.post('/graph/:id', authentication, updateGraph)


export { cardRouter };