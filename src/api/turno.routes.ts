import { Router } from 'express';
import { getTurnosDisponibles } from '../controllers/turno.controller';
import { asyncHandler } from '../lib/asyncHandler';

const router = Router();

router.get('/disponibles', asyncHandler(getTurnosDisponibles));

export default router;

/* Ruta para ver los turnos diponibles, no requiere autenticación */