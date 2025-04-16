import { z } from 'zod';

export const buscarTurnosDisponiblesSchema = z.object({
  especialidad: z.string().optional(),
  profesionalId: z.string().regex(/^\d+$/).transform(Number).optional(),
  consultorioId: z.string().regex(/^\d+$/).transform(Number).optional(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
