import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import products from './products.routes';
import users from './user.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/products', products);
router.use('/users', users);

export default router;
