import express, { Request, Response } from 'express';
import { errorHandler } from './utils/ErrorHandler';
const app = express();
import userRoutes from './routes/UserRouter';
import taskRoutes from './routes/TaskRouter';
import notFound from './middleware/notFound';

// middleware
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

// not found route
app.use(notFound);

export default app;
