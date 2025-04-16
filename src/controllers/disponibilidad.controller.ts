import { Request, Response } from 'express';
import { crearDiaOperativoSchema } from '../validators/disponibilidad.validator';
import { crearDiaOperativo, obtenerDiasOperativos } from '../service/disponibilidad.service';
import {
  crearHorarioOperativo,
  obtenerHorariosPorDia,
} from '../service/disponibilidad.service';
import { crearHorarioOperativoSchema } from '../validators/disponibilidad.validator';

export const postDiaOperativo = async (req: Request, res: Response) => {
  const result = crearDiaOperativoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  const dia = await crearDiaOperativo(req.profesionalId!, result.data.dia_semana);
  res.status(201).json(dia);
};

export const getDiasOperativos = async (req: Request, res: Response) => {
  const dias = await obtenerDiasOperativos(req.profesionalId!);
  res.json(dias);
};

export const postHorarioOperativo = async (req: Request, res: Response) => {
  const result = crearHorarioOperativoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Datos inválidos', errors: result.error.flatten() });
  }

  const horario = await crearHorarioOperativo(result.data);
  res.status(201).json(horario);
};

export const getHorariosPorDia = async (req: Request, res: Response) => {
  const diaId = parseInt(req.params.dia_id);
  const horarios = await obtenerHorariosPorDia(diaId);
  res.json(horarios);
};
