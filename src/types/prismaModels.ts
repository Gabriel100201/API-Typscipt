import {
  usuarios as Usuario,
  profesionales as Profesional,
  consultorios as Consultorio,
  reservas as Reserva,
  turnos as Turno,
  horarios_operativos as HorarioOperativo,
  dias_operativos as DiaOperativo,
  excepciones as Excepcion,
  horarios_excepciones as HorarioExcepcion,
  pagos_reservas as PagoReserva,
  consultorio_profesionales as ConsultorioProfesional,
  turnos_generados_log as TurnoLog,
} from '@prisma/client';

export {
  Usuario,
  Profesional,
  Consultorio,
  Reserva,
  Turno,
  HorarioOperativo,
  DiaOperativo,
  Excepcion,
  HorarioExcepcion,
  PagoReserva,
  ConsultorioProfesional,
  TurnoLog,
};
