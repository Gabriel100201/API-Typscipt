import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import users from './usuario.routes';
import auth from './auth.routes';
import register from './register.routes';
import consultorios from './consultorio.routes';
import profesionales from './profesional.routes';
import disponibilidad from './disponibilidad.routes';
import turnos from './turno.routes';
import reservas from './reserva.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/users', users);
router.use('/auth', auth);
router.use('/register', register);
router.use('/consultorios', consultorios);
router.use('/profesionales', profesionales);
router.use('/disponibilidad', disponibilidad);
router.use('/turnos', turnos);
router.use('/reservas', reservas);

export default router;
