import express, { Request, Response } from 'express'
import { errorHandler } from './utils/ErrorHandler'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/UserRouter'
import taskRoutes from './routes/TaskRouter'
import notFound from './middleware/notFound'
import helmet from 'helmet'
const app = express()

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
}

// middleware
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())
app.use(helmet())

// routes
app.use('/api/user', userRoutes)
app.use('/api/task', taskRoutes)

// error handler
app.use(errorHandler)

/**
 * Health check endpoint
 * @route GET /
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Object} Status message indicating server is running
 */

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

// not found route
app.use(notFound)

export default app
