import { Request, Response, NextFunction } from 'express';
import { aj } from '../utils/arcJet';

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: 'Rate limit exceeded',
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
