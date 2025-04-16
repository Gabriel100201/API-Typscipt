import { prisma } from '../lib/prisma';

export const getUsers = async () => {
  return prisma.usuarios.findMany();
};

export const getUserById = async (id: number) => {
  return prisma.usuarios.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      correo: true,
      telefono: true,
      tipo_usuario: true,
      fecha_creacion: true,
      fecha_actualizacion: true,
    },
  });
};

export const updateUser = async (id: number, data: { nombre?: string; telefono?: string }) => {
  return prisma.usuarios.update({
    where: { id },
    data: {
      ...data,
      fecha_actualizacion: new Date(),
    },
    select: {
      id: true,
      nombre: true,
      correo: true,
      telefono: true,
      tipo_usuario: true,
      fecha_creacion: true,
      fecha_actualizacion: true,
    },
  });
};
