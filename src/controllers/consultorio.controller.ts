import { Request, Response } from 'express';
import {
  crearConsultorio,
  obtenerConsultorios,
  obtenerConsultorioPorId,
  invitarProfesional,
  obtenerProfesionalesDeConsultorio,
} from '../service/consultorio.service';
import {
  crearConsultorioSchema,
  invitarProfesionalSchema,
} from '../validators/consultorio.validator';

export const createConsultorio = async (req: Request, res: Response) => {
  const result = crearConsultorioSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  const consultorio = await crearConsultorio({
    ...result.data,
    id_usuario_plus: req.user!.id,
  });

  res.status(201).json(consultorio);
};

export const getAllConsultorios = async (_req: Request, res: Response) => {
  const consultorios = await obtenerConsultorios();
  res.json(consultorios);
};

export const getConsultorioById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const consultorio = await obtenerConsultorioPorId(id);
  if (!consultorio) return res.status(404).json({ message: 'Consultorio no encontrado' });
  res.json(consultorio);
};

export const postInvitarProfesional = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = invitarProfesionalSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  try {
    const invitacion = await invitarProfesional(id, result.data.id_usuario);
    res.status(201).json(invitacion);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProfesionalesDelConsultorio = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const profesionales = await obtenerProfesionalesDeConsultorio(id);
  res.json(profesionales);
};
