import { z } from 'zod';

export const crearUsuarioSchema = z.object({
  nombre: z.string().min(1),
  correo: z.string().email(),
  telefono: z.string().optional(),
  contrasena: z.string().min(6),
  tipo_usuario: z.enum(['NORMAL', 'PLUS']).optional(),
});
