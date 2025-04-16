import { z } from 'zod';

export const crearProfesionalSchema = z.object({
  nombre: z.string().min(1),
  especialidad: z.string().min(1),
  correo_notificacion: z.string().email().optional(),
});
