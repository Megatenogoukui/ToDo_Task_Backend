import express from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../Controller/taskController.js'



const router = express.Router()

router.route('/').post(createTask).get(getTasks)
router.route('/:id').put(updateTask).delete(deleteTask)

export default router