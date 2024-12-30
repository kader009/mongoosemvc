import { Router } from 'express';
import { taskController } from '../controller/TaskController';
import { authentication } from '../middleware/authentication';

const router = Router();

router.get('/', taskController.getTask);
router.get('/:id', taskController.singleTask);
router.post('/', authentication, taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
