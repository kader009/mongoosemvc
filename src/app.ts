import express, { Request, Response } from 'express';
import { errorHandler } from './utils/ErrorHandler';
const app = express();
import userRoutes from "./routes/UserRouter";

// middleware
app.use(express.json());

app.use('/api/user', userRoutes)

app.use(errorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

export default app;
