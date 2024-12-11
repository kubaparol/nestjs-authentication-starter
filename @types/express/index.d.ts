import { AccessTokenValue } from 'src/auth/types';

declare global {
  namespace Express {
    interface Request {
      user: AccessTokenValue;
    }
  }
}

export {};
