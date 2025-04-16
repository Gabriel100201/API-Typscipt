import { z } from 'zod';

export const crearReservaSchema = z.object({
  id_turno: z.number().int().positive(),
});
