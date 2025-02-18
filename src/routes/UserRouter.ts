import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { authentication } from '../middleware/authentication';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', authentication, UserController.getUser);

export default router;
