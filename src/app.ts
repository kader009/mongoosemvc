import express, { Request, Response } from 'express'; 
import { errorHandler } from './utils/ErrorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import userRoutes from './routes/UserRouter';
import taskRoutes from './routes/TaskRouter';
import notFound from './middleware/notFound';

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
};

// middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
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
