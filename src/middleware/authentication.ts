import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface JwtPayload {
  _id: string;
  role: string;
}

// Extend Request to include user
declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req?.headers?.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret as string) as { role: string, _id: string };
    req.user = decoded 
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: (error as Error).message,
    });
    return;
  }
};
