import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import ErrorResponse from './interfaces/ErrorResponse';
import jwt from 'jsonwebtoken';
import { AuthPayload } from './types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  const isPrismaError =
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError;

  res.status(statusCode).json({
    message: isPrismaError
      ? 'Error interno del servidor. La base de datos no está disponible.'
      : err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no enviado' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
