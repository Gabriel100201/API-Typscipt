import { Router } from 'express';
import { loginUsuario } from '../controllers/auth.controller';
import { asyncHandler } from '../lib/asyncHandler';

const router = Router();

router.post('/', asyncHandler(loginUsuario));

export default router;

/* Loguin del usuario */