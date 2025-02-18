import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

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
    const decoded = jwt.verify(token, config.jwt_secret as string);
    req.user = decoded as { role: string };
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
