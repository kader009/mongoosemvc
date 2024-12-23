import { Router } from 'express';
import { taskController } from '../controller/TaskController';

const router = Router();

router.get('/', taskController.getTask);
router.post('/', taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
