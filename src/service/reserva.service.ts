import { prisma } from '../lib/prisma';

export const crearReserva = async (id_usuario: number, id_turno: number) => {
  const turno = await prisma.turnos.findUnique({
    where: { id: id_turno },
    include: {
      profesionales: {
        include: {
          consultorio_profesionales: {
            include: {
              consultorios: true,
            },
          },
        },
      },
      reservas: true,
    },
  });

  if (!turno) throw new Error('Turno no encontrado');

  if ((turno.reservados ?? 0) >= turno.capacidad) {
    throw new Error('Turno sin disponibilidad');
  }

  const existente = await prisma.reservas.findFirst({
    where: {
      id_usuario,
      id_turno,
      estado: { not: 'CANCELADO' },
    },
  });

  if (existente) throw new Error('Ya reservaste este turno');

  const consultorio = turno.profesionales?.consultorio_profesionales?.[0]?.consultorios;
  const requierePago = consultorio?.requiere_pago ?? false;

  const nuevaReserva = await prisma.$transaction(async (tx) => {
    const reserva = await tx.reservas.create({
      data: {
        id_usuario,
        id_turno,
        estado: requierePago ? 'PENDIENTE' : 'RESERVADO',
      },
    });

    await tx.turnos.update({
      where: { id: id_turno },
      data: {
        reservados: { increment: 1 },
      },
    });

    return reserva;
  });

  return nuevaReserva;
};

export const obtenerReservasUsuario = (id_usuario: number) => {
  return prisma.reservas.findMany({
    where: { id_usuario },
    include: {
      turnos: {
        include: {
          profesionales: true,
        },
      },
    },
    orderBy: { fecha_reserva: 'desc' },
  });
};

export const obtenerReservasProfesional = async (id_profesional: number) => {
  return prisma.reservas.findMany({
    where: {
      turnos: {
        id_profesional,
      },
    },
    include: {
      usuarios: true,
      turnos: true,
    },
    orderBy: { fecha_reserva: 'desc' },
  });
};

export const cancelarReserva = async (id_usuario: number, id_reserva: number) => {
  const reserva = await prisma.reservas.findUnique({
    where: { id: id_reserva },
  });

  if (!reserva || reserva.id_usuario !== id_usuario) {
    throw new Error('No autorizado para cancelar esta reserva');
  }

  await prisma.$transaction([
    prisma.reservas.update({
      where: { id: id_reserva },
      data: { estado: 'CANCELADO' },
    }),
    prisma.turnos.update({
      where: { id: reserva.id_turno! },
      data: { reservados: { decrement: 1 } },
    }),
  ]);
};
