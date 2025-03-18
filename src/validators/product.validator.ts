// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().min(1, 'El id debe ser un number'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  price: z.number().min(1, 'El precio debe ser un number'),
});

export type Product = z.infer<typeof productSchema>;