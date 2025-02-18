import { Router } from 'express';
import { validate } from '../middleware/validationMiddleware';
import { UserValidation } from '../validations/UserValidation';
import { AuthController } from '../controller/AuthController';

const authRouter = Router();

authRouter.post(
  '/sign-up',
  validate(UserValidation),
  AuthController.SingupUser,
);
authRouter.post('/sign-in', AuthController.SiginUser);

export default authRouter;
