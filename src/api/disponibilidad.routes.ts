import { Router } from 'express';
import { postDiaOperativo, getDiasOperativos } from '../controllers/disponibilidad.controller';
import { authMiddleware, requireProfesional } from '../middlewares';
import { asyncHandler } from '../lib/asyncHandler';
import {
  postHorarioOperativo,
  getHorariosPorDia,
} from '../controllers/disponibilidad.controller';

const router = Router();

router.use(authMiddleware);
router.use(asyncHandler(requireProfesional));

router.post('/dias', asyncHandler(postDiaOperativo));
router.get('/dias', asyncHandler(getDiasOperativos));

router.post('/horarios', asyncHandler(postHorarioOperativo));
router.get('/horarios/:dia_id', asyncHandler(getHorariosPorDia));

export default router;


