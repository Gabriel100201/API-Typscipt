import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (correo: string, contrasena: string) => {
  const user = await prisma.usuarios.findUnique({ where: { correo } });
  if (!user) throw new Error('Usuario no encontrado');

  const isValid = await bcrypt.compare(contrasena, user.contrasena_hash);
  if (!isValid) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    { id: user.id, tipo_usuario: user.tipo_usuario },
    JWT_SECRET,
    { expiresIn: '7d' },
  );

  const { contrasena_hash: contrasenaHash, ...usuarioSinPassword } = user;

  return { token, usuario: usuarioSinPassword };
};
