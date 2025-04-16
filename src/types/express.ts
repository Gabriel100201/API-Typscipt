import { AuthPayload } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}