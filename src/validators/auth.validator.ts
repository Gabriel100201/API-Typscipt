import { z } from 'zod';

export const loginSchema = z.object({
  correo: z.string().email(),
  contrasena: z.string().min(1, 'La contraseña es obligatoria'),
});
