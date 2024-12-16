import 'express';
import { AccessTokenUserInfo } from 'src/auth/types';

declare module 'express' {
  export interface Request {
    user?: AccessTokenUserInfo;
  }
}
