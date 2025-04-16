import { prisma } from '../lib/prisma';

export const buscarTurnosDisponibles = async (filtros: {
  especialidad?: string;
  profesionalId?: number;
  consultorioId?: number;
  fecha?: string;
}) => {
  const fechaDesde = filtros.fecha ? new Date(filtros.fecha) : new Date();

  return prisma.turnos.findMany({
    where: {
      fecha: { gte: fechaDesde },
      reservados: { lt: prisma.turnos.fields.capacidad },
      profesionales: {
        ...(filtros.especialidad && { especialidad: filtros.especialidad }),
        ...(filtros.profesionalId && { id: filtros.profesionalId }),
        ...(filtros.consultorioId && {
          consultorio_profesionales: {
            some: {
              id_consultorio: filtros.consultorioId,
            },
          },
        }),
      },
    },
    orderBy: [{ fecha: 'asc' }, { hora_inicio: 'asc' }],
    include: {
      profesionales: {
        select: {
          id: true,
          nombre: true,
          especialidad: true,
          consultorio_profesionales: {
            include: {
              consultorios: {
                select: {
                  id: true,
                  nombre: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
