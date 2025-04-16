import { Request, Response } from 'express';
import { getUsers } from '../service/usuario.service';
import { getUserById, updateUser } from '../service/usuario.service';
import { actualizarUsuarioSchema } from '../validators/usuario.validator';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  const user = await getUserById(userId);
  res.status(200).json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const result = actualizarUsuarioSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: result.error.flatten(),
    });
  }

  const updated = await updateUser(userId, result.data);
  res.status(200).json(updated);
};