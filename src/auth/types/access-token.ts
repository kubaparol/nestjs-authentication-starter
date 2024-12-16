export type DecodedAccessToken = {
  firstName: string;
  lastName: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
};

export type AccessTokenUserInfo = Omit<DecodedAccessToken, 'iat' | 'exp'>;
