import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const requireProfesional = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  const profesional = await prisma.profesionales.findUnique({
    where: { id_usuario: userId },
  });

  if (!profesional) {
    return res.status(403).json({ message: 'Acceso restringido a profesionales' });
  }

  req.profesionalId = profesional.id;
  next();
};