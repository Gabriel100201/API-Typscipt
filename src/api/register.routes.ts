import { Router } from 'express';
import { addUser } from '../controllers/register.controller';
import { asyncHandler } from '../lib/asyncHandler';
const router = Router();

router.post('/', asyncHandler(addUser));

export default router;

/* Ruta para manejar los registros de usuarios nuevos */