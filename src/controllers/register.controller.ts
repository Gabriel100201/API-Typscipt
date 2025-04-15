import { Request, Response } from 'express';
import { createUser } from '../service/register.service';
import { crearUsuarioSchema } from '../validators/usuario.validator';

export const addUser = async (req: Request, res: Response) => {
  try {
    const result = crearUsuarioSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors: result.error.flatten(),
      });
    }
    const validatedData = result.data;

    const newUser = await createUser({ nombre: validatedData.nombre, correo: validatedData.correo, contrasena: validatedData.contrasena, telefono: validatedData.telefono, tipo_usuario: validatedData.tipo_usuario });
    const { contrasena_hash: contrasenaHash, ...usuarioSinPassword } = newUser;
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error creando usuario' });
  }
};
