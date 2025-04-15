import { prisma } from '../lib/prisma';

export const getUsers = async () => {
  return prisma.usuarios.findMany();
};