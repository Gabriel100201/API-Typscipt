import { z } from 'zod';

export const crearExcepcionSchema = z.object({
  fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  fecha_fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tipo: z.enum(['FERIADO', 'ESPECIAL']),
  descripcion: z.string().optional(),
});

export const crearHorarioExcepcionSchema = z.object({
  hora_inicio: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato HH:mm'),
  hora_fin: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato HH:mm'),
  duracion_turno: z.number().int().positive(),
  capacidad: z.number().int().positive(),
});
