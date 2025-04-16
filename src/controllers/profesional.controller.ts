import { Request, Response } from 'express';
import {
  crearProfesional,
  obtenerProfesionales,
  obtenerProfesionalPorId,
} from '../service/profesional.service';
import { crearProfesionalSchema } from '../validators/profesional.validatror';

export const postCrearProfesional = async (req: Request, res: Response) => {
  const result = crearProfesionalSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  try {
    const profesional = await crearProfesional(req.user!.id, result.data);
    res.status(201).json(profesional);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProfesionales = async (_req: Request, res: Response) => {
  const profesionales = await obtenerProfesionales();
  res.json(profesionales);
};

export const getProfesionalPorId = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const profesional = await obtenerProfesionalPorId(id);
  if (!profesional) return res.status(404).json({ message: 'No encontrado' });
  res.json(profesional);
};
