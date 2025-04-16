import { Request, Response } from 'express';
import {
  crearReserva,
  obtenerReservasUsuario,
  obtenerReservasProfesional,
  cancelarReserva,
} from '../service/reserva.service';

import { crearReservaSchema } from '../validators/reserva.validator';

export const postReserva = async (req: Request, res: Response) => {
  const result = crearReservaSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  try {
    const reserva = await crearReserva(req.user!.id, result.data.id_turno);
    res.status(201).json(reserva);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getMisReservas = async (req: Request, res: Response) => {
  const reservas = await obtenerReservasUsuario(req.user!.id);
  res.json(reservas);
};

export const getReservasComoProfesional = async (req: Request, res: Response) => {
  const reservas = await obtenerReservasProfesional(req.profesionalId!);
  res.json(reservas);
};

export const patchCancelarReserva = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await cancelarReserva(req.user!.id, id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
