import { Router } from 'express';
import { getAllUsers } from '../controllers/usuario.controller';
import { getProfile, updateProfile } from '../controllers/usuario.controller';
import { asyncHandler } from '../lib/asyncHandler';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', asyncHandler(getAllUsers));
router.get('/me', authMiddleware, asyncHandler(getProfile));
router.patch('/me', authMiddleware, asyncHandler(updateProfile));

export default router;

/* Rutas para ver info de todos los usuarios, si se quiere ver de solo uno debe estar logueado como el mismo */