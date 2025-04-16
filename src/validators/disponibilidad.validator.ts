import { z } from 'zod';

export const crearDiaOperativoSchema = z.object({
  dia_semana: z.enum(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']),
});

export const crearHorarioOperativoSchema = z.object({
  id_dia_operativo: z.number().int().positive(),
  hora_inicio: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato inválido, debe ser HH:MM'),
  hora_fin: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato inválido, debe ser HH:MM'),
  duracion_turno: z.number().int().positive(),
  capacidad: z.number().int().positive(),
});