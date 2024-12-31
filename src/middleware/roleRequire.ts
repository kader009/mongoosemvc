import { NextFunction, Request, Response } from 'express'

declare module 'express' {
  export interface Request {
    user?: {
      role: string
    }
  }
}

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' })
    }
    next()
  }
}
