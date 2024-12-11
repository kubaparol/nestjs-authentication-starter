export type AccessTokenValue = {
  firstName: string;
  lastName: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
};

export type AccessTokenPayload = Omit<AccessTokenValue, 'iat' | 'exp'>;

export type AccessTokenResponse = {
  access_token: string;
};
