import { Router } from 'express';
import { validate } from '../middleware/validationMiddleware';
import { UserValidation } from '../validations/UserValidation';
import { UserController } from '../controller/UserController';

const authRouter = Router();

authRouter.post(
  '/sign-up',
  validate(UserValidation),
  UserController.createUser,
);
authRouter.post('/sign-in', UserController.loginUsers);

export default authRouter;
