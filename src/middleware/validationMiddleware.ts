import { Request, Response, NextFunction, RequestHandler } from 'express' 
import { ZodSchema, ZodError } from 'zod'

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body) // Validate the request body
      next() // Proceed to the next middleware/controller
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation error',
          errors: error.errors.map(err => ({
            path: err.path,
            message: err.message,
          })),
        })
      }
      next()
      next(error)
    }
  }
}
