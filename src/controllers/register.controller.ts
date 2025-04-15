import { Request, Response } from 'express';
import { createUser } from '../service/register.service';
import { crearUsuarioSchema } from '../validators/usuario.validator';

export const addUser = async (req: Request, res: Response) => {
  const result = crearUsuarioSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: 'Datos inválidos',
      errors: result.error.flatten(),
    });
    return;
  }

  const newUser = await createUser(result.data);
  console.log(newUser);
  const { contrasena_hash: contrasenaHash, ...usuarioSinPassword } = newUser;
  res.status(201).json(usuarioSinPassword);
};
