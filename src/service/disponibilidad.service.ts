import { crearDiaOperativoSchema } from '../validators/disponibilidad.validator';
import { prisma } from '../lib/prisma';
import { parse } from 'date-fns';

export const crearDiaOperativo = async (id_profesional: number, dia_semana: string) => {
  const validatedData = crearDiaOperativoSchema.parse({ dia_semana });
  return prisma.dias_operativos.upsert({
    where: {
      id_profesional_dia_semana: {
        id_profesional,
        dia_semana: validatedData.dia_semana,
      },
    },
    update: { activo: true },
    create: {
      id_profesional,
      dia_semana: validatedData.dia_semana,
    },
  });
};

export const obtenerDiasOperativos = async (id_profesional: number) => {
  return prisma.dias_operativos.findMany({
    where: { id_profesional },
  });
};

export const crearHorarioOperativo = async (data: {
  id_dia_operativo: number;
  hora_inicio: string;
  hora_fin: string;
  duracion_turno: number;
  capacidad: number;
}) => {
  return prisma.horarios_operativos.create({
    data: {
      id_dia_operativo: data.id_dia_operativo,
      hora_inicio: parse(data.hora_inicio, 'HH:mm', new Date()),
      hora_fin: parse(data.hora_fin, 'HH:mm', new Date()),
      duracion_turno: data.duracion_turno,
      capacidad: data.capacidad,
    },
  });
};

export const obtenerHorariosPorDia = async (id_dia_operativo: number) => {
  return prisma.horarios_operativos.findMany({
    where: { id_dia_operativo },
    orderBy: { hora_inicio: 'asc' },
  });
};