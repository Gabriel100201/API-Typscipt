import { Request, Response } from 'express';
import { buscarTurnosDisponiblesSchema } from '../validators/turno.validator';
import { buscarTurnosDisponibles } from '../service/turno.service';

export const getTurnosDisponibles = async (req: Request, res: Response) => {
  const result = buscarTurnosDisponiblesSchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      message: 'Parámetros inválidos',
      errors: result.error.flatten(),
    });
  }

  const turnos = await buscarTurnosDisponibles(result.data);
  res.json(turnos);
};
