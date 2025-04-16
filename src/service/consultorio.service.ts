import { prisma } from '../lib/prisma';

export const crearConsultorio = (data: {
  nombre: string;
  descripcion?: string;
  requiere_pago?: boolean;
  precio_turno?: string;
  id_usuario_plus: number;
}) => {
  return prisma.consultorios.create({
    data,
  });
};

export const obtenerConsultorios = () => {
  return prisma.consultorios.findMany();
};

export const obtenerConsultorioPorId = (id: number) => {
  return prisma.consultorios.findUnique({
    where: { id },
    include: { consultorio_profesionales: true },
  });
};

export const invitarProfesional = async (id_consultorio: number, id_usuario: number) => {

  const profesional = await prisma.profesionales.findUnique({
    where: { id_usuario },
  });

  if (!profesional) throw new Error('El usuario no tiene perfil profesional');

  return prisma.consultorio_profesionales.create({
    data: {
      id_consultorio,
      id_profesional: profesional.id,
    },
  });
};

export const obtenerProfesionalesDeConsultorio = async (id_consultorio: number) => {
  return prisma.consultorio_profesionales.findMany({
    where: { id_consultorio },
    include: { profesionales: true },
  });
};
