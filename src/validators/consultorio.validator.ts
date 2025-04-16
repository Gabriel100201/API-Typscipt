import { z } from 'zod';

export const crearConsultorioSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
  requiere_pago: z.boolean().optional(),
  precio_turno: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Debe ser un decimal válido')
    .optional(),
});

export const invitarProfesionalSchema = z.object({
  id_usuario: z.number(),
});
