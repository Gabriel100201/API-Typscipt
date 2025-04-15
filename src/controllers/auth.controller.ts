import { Request, Response } from 'express';
import { loginSchema } from '../validators/auth.validator';
import { login } from '../service/auth.service';

export const loginUsuario = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: parsed.error.flatten(),
    });
  }

  const { correo, contrasena } = parsed.data;

  try {
    const resultado = await login(correo, contrasena);
    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
