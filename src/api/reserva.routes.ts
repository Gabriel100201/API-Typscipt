import { Router } from 'express';
import {
  postReserva,
  getMisReservas,
  getReservasComoProfesional,
  patchCancelarReserva,
} from '../controllers/reserva.controller';

import { authMiddleware, requireProfesional } from '../middlewares';
import { asyncHandler } from '../lib/asyncHandler';

const router = Router();

router.use(authMiddleware);

router.post('/', asyncHandler(postReserva));
router.get('/', asyncHandler(getMisReservas));
router.get('/profesional', asyncHandler(requireProfesional), asyncHandler(getReservasComoProfesional));
router.patch('/:id/cancelar', asyncHandler(patchCancelarReserva));

export default router;
