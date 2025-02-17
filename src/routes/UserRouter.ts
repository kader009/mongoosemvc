import { Router } from 'express';
import { UserController } from '../controller/UserController';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);

export default router;
