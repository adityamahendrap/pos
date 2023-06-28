import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export default (req: Request, res: Response, next: NextFunction) => {
  const logMessage = `${req.method} ${req.originalUrl} ${req.ip}`;
  logger.info(logMessage);
  next();
}
