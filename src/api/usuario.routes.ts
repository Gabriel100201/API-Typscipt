import { Router } from 'express';
import { getAllUsers } from '../controllers/usuario.controller';
import { getProfile, updateProfile } from '../controllers/usuario.controller';
import { authMiddleware } from '../middlewares';
import { asyncHandler } from '../lib/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getAllUsers));
router.get('/me', authMiddleware, asyncHandler(getProfile));
router.patch('/me', authMiddleware, asyncHandler(updateProfile));

export default router;
