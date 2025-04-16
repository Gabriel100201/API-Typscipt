import { Request, Response } from 'express';
import {
  crearExcepcionSchema,
  crearHorarioExcepcionSchema,
} from '../validators/excepciones.validator';

import {
  crearExcepcion,
  obtenerExcepciones,
  crearHorarioExcepcion,
  obtenerHorariosExcepcion,
} from '../service/excepciones.service';

export const postExcepcion = async (req: Request, res: Response) => {
  const result = crearExcepcionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  const excepcion = await crearExcepcion(req.profesionalId!, result.data);
  res.status(201).json(excepcion);
};

export const getExcepciones = async (req: Request, res: Response) => {
  const excepciones = await obtenerExcepciones(req.profesionalId!);
  res.json(excepciones);
};

export const postHorarioExcepcion = async (req: Request, res: Response) => {
  const excepcionId = parseInt(req.params.id);
  const result = crearHorarioExcepcionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  const horario = await crearHorarioExcepcion(excepcionId, result.data);
  res.status(201).json(horario);
};

export const getHorariosExcepcion = async (req: Request, res: Response) => {
  const excepcionId = parseInt(req.params.id);
  const horarios = await obtenerHorariosExcepcion(excepcionId);
  res.json(horarios);
};
