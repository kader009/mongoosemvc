import { Request, Response, NextFunction } from 'express';
import { aj } from '../utils/arcJet';

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'Bot detected' });
      }
      return res.status(403).json({ error: 'Access denied' });
    }

    // Proceed to the next middleware if access is allowed
    return next();
  } catch (error) {
    console.error(`Arcjet middleware error: ${error}`);
    return next(error); // Pass the error to Express error handler
  }
};

export default arcjetMiddleware;
