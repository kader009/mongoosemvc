import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { UserValidation } from '../validations/UserValidation';
import { validate } from '../middleware/validationMiddleware';

const router = Router();

router.get('/', UserController.getUsers);
router.post('/register', validate(UserValidation), UserController.createUser);
router.post('/login', UserController.loginUsers);

export default router;
