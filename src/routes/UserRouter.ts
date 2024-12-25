import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { UserValidation } from '../validations/UserValidation';
import { validate } from '../middleware/validationMiddleware';
import { authentication } from '../middleware/authentication';

const router = Router();

router.get('/', UserController.getUsers);
router.post('/register', validate(UserValidation), UserController.createUser);
router.post('/login', authentication, UserController.loginUsers);

export default router;
