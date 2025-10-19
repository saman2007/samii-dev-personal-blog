import jwt from "jsonwebtoken";
import crypto from "crypto";

export const ACCESS_SECRET = process.env.ACCESS_SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;

//14 days
export const REFRESH_TOKEN_AGE_SECONDS = 60 * 60 * 24 * 14;

//1 hour
export const ACCESS_TOKEN_AGE_SECONDS = 60 * 60;

export interface JwtPayload {
  //`sub` is `id` column of users table
  sub: number;
  //`jti` is a random string(usually a uuid) that makes the jwt unique and not same with other stored jwt
  jti: string;
  //The time that the created jwt token expires
  exp: number;
}

export const createRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, REFRESH_SECRET);
};

export const createAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET);
};

export const validateRefreshToken = (refreshToken: string): JwtPayload => {
  return jwt.verify(refreshToken, REFRESH_SECRET, {}) as unknown as JwtPayload;
};

export const validateAccessToken = (accessToken: string): JwtPayload => {
  return jwt.verify(accessToken, ACCESS_SECRET, {}) as unknown as JwtPayload;
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
