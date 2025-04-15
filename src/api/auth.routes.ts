import { Router } from 'express';
import { loginUsuario } from '../controllers/auth.controller';

const router = Router();

router.post('/', loginUsuario);

export default router;