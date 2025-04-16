import { Router } from 'express';
import { postDiaOperativo, getDiasOperativos } from '../controllers/disponibilidad.controller';
import { authMiddleware, requireProfesional } from '../middlewares';
import { asyncHandler } from '../lib/asyncHandler';
import {
  postHorarioOperativo,
  getHorariosPorDia,
} from '../controllers/disponibilidad.controller';
import { getExcepciones, getHorariosExcepcion, postExcepcion, postHorarioExcepcion } from '../controllers/excepciones.controller';

const router = Router();

router.use(authMiddleware);
router.use(asyncHandler(requireProfesional));

router.post('/dias', asyncHandler(postDiaOperativo));
router.get('/dias', asyncHandler(getDiasOperativos));

router.post('/horarios', asyncHandler(postHorarioOperativo));
router.get('/horarios/:dia_id', asyncHandler(getHorariosPorDia));

router.post('/excepciones', asyncHandler(postExcepcion));
router.get('/excepciones', asyncHandler(getExcepciones));

router.post('/excepciones/:id/horarios', asyncHandler(postHorarioExcepcion));
router.get('/excepciones/:id/horarios', asyncHandler(getHorariosExcepcion));
export default router;


