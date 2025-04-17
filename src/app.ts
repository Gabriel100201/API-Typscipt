import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import { errorHandler, notFound } from './middlewares';
import { swaggerUiHandler, swaggerUiSetup  } from './lib/swagger';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/docs', swaggerUiHandler, swaggerUiSetup);
app.use('/api/v1', api);

app.get('/error-test', () => {
  throw new Error('Forzando error para probar handler');
});

app.use(notFound);
app.use(errorHandler);

export default app;
