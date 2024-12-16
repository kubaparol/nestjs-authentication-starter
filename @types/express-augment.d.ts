import 'express';
import { AccessTokenValue } from 'src/auth/types';

declare module 'express' {
  export interface Request {
    user?: AccessTokenValue;
  }
}
