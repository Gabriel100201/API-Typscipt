import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import ErrorResponse from '../interfaces/ErrorResponse';

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