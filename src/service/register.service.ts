import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

export const createUser = async (data: {
  nombre: string;
  correo: string;
  contrasena: string;
  telefono?: string;
  tipo_usuario?: 'NORMAL' | 'PLUS';
}) => {
  
  const existingUser = await prisma.usuarios.findUnique({
    where: { correo: data.correo },
  });
  if (existingUser) throw new Error('El correo ya está registrado');

  const { contrasena, ...restData } = data;

  const hashedPassword = await bcrypt.hash(contrasena, 10);
  return prisma.usuarios.create({
    data: {
      ...restData,
      contrasena_hash: hashedPassword,
    },
  });
};