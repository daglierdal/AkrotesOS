import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      tenantId?: string;
    }
  }
}

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // If req.user is not set (public routes), skip tenant assignment
  if (!req.user) {
    return next();
  }

  if (req.user?.role === 'SUPER_ADMIN' && req.query.tenantId) {
    req.tenantId = req.query.tenantId as string;
  } else {
    req.tenantId = req.user?.tenantId;
  }
  next();
};
