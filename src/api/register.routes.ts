import { Router } from 'express';
import { addUser } from '../controllers/register.controller';
const router = Router();

router.post('/', addUser);

export default router;