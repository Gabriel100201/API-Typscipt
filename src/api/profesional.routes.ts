import { Router } from 'express';
import {
  postCrearProfesional,
  getProfesionales,
  getProfesionalPorId,
} from '../controllers/profesional.controller';
import { asyncHandler } from '../lib/asyncHandler';
import { authMiddleware } from '../middlewares';

const router = Router();

router.use(authMiddleware);

router.post('/', asyncHandler(postCrearProfesional));
router.get('/', asyncHandler(getProfesionales));
router.get('/:id', asyncHandler(getProfesionalPorId));

export default router;
