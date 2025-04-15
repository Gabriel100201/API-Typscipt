import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import users from './usuario.routes';
import auth from './auth.routes';
import register from './register.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/users', users);
router.use('/auth', auth);
router.use('/register', register);

export default router;
