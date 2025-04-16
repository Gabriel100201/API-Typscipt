import { parse } from 'date-fns';
import { prisma } from '../lib/prisma';

export const crearExcepcion = async (id_profesional: number, data: {
  fecha_inicio: string;
  fecha_fin: string;
  tipo: 'FERIADO' | 'ESPECIAL';
  descripcion?: string;
}) => {
  return prisma.excepciones.create({
    data: {
      id_profesional,
      fecha_inicio: new Date(data.fecha_inicio),
      fecha_fin: new Date(data.fecha_fin),
      tipo: data.tipo,
      descripcion: data.descripcion,
    },
  });
};

export const obtenerExcepciones = async (id_profesional: number) => {
  return prisma.excepciones.findMany({
    where: { id_profesional },
    orderBy: { fecha_inicio: 'asc' },
  });
};

// Horarios por excepción
export const crearHorarioExcepcion = async (id_excepcion: number, data: {
  hora_inicio: string;
  hora_fin: string;
  duracion_turno: number;
  capacidad: number;
}) => {
  return prisma.horarios_excepciones.create({
    data: {
      id_excepcion,
      hora_inicio: parse(data.hora_inicio, 'HH:mm', new Date()),
      hora_fin: parse(data.hora_fin, 'HH:mm', new Date()),
      duracion_turno: data.duracion_turno,
      capacidad: data.capacidad,
    },
  });
};

export const obtenerHorariosExcepcion = async (id_excepcion: number) => {
  return prisma.horarios_excepciones.findMany({
    where: { id_excepcion },
    orderBy: { hora_inicio: 'asc' },
  });
};
