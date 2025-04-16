import { prisma } from '../lib/prisma';

export const crearProfesional = async (id_usuario: number, data: {
  nombre: string;
  especialidad: string;
  correo_notificacion?: string;
}) => {
  const existente = await prisma.profesionales.findUnique({
    where: { id_usuario },
  });

  if (existente) {
    throw new Error('El usuario ya tiene perfil profesional');
  }

  return prisma.profesionales.create({
    data: {
      id_usuario,
      nombre: data.nombre,
      especialidad: data.especialidad,
      correo_notificacion_: data.correo_notificacion,
    },
  });
};

export const obtenerProfesionales = () => {
  return prisma.profesionales.findMany({
    select: {
      id: true,
      nombre: true,
      especialidad: true,
    },
  });
};

export const obtenerProfesionalPorId = (id: number) => {
  return prisma.profesionales.findUnique({
    where: { id },
    include: {
      usuarios: true,
      consultorio_profesionales: {
        include: {
          consultorios: true,
        },
      },
    },
  });
};
