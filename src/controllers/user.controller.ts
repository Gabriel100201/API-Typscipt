import { Request, Response } from 'express';
import { createUser, getUsers } from '../service/user.service';
import { User, userSchema } from '../validators/user.validator';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios' });
  }
};

export const addUser = async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);

    const newUser = await createUser({ name: validatedData.name, email: validatedData.email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Datos inválidos', error });
  }
};
