import { Router } from 'express';
import {
  createConsultorio,
  getAllConsultorios,
  getConsultorioById,
  postInvitarProfesional,
  getProfesionalesDelConsultorio,
} from '../controllers/consultorio.controller';
import { asyncHandler } from '../lib/asyncHandler';
import { authMiddleware, requireRole } from '../middlewares';

const router = Router();

router.use(authMiddleware);

router.post('/', requireRole('PLUS'), asyncHandler(createConsultorio));
router.get('/', asyncHandler(getAllConsultorios));
router.get('/:id', asyncHandler(getConsultorioById));
router.post('/:id/invitar', requireRole('PLUS'), asyncHandler(postInvitarProfesional));
router.get('/:id/profesionales', asyncHandler(getProfesionalesDelConsultorio));

export default router;

/* Rutas para obtener info de los consultorios, para invitar a alguien o crear uno nuevo se debe ser usuario PLUS */