import { Request, Response, NextFunction } from 'express';

export const requireRole = (role: 'PLUS' | 'NORMAL') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.tipo_usuario !== role) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
};
