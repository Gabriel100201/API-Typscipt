// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Debe ser un email válido'),
});

export type User = z.infer<typeof userSchema>;