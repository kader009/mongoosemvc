import express, { Request, Response } from 'express';
import { errorHandler } from './utils/ErrorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/UserRouter';
import taskRoutes from './routes/TaskRouter';
import notFound from './middleware/notFound';
import helmet from 'helmet';
import authRouter from './routes/AuthRouter';

// main app here
const app = express();

// Replace JSDoc with type declaration
type CorsOptions = {
  origin: string;
  credentials: boolean;
};

const corsOption: CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

// middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use(helmet());

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/auth', authRouter);

// error handler
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

// not found error message
app.use(notFound);

export default app;
