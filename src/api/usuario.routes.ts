import { Router } from 'express';
import { getAllUsers } from '../controllers/usuario.controller';
const router = Router();

router.get('/', getAllUsers);

export default router;
