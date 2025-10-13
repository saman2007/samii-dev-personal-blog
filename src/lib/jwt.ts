import jwt from "jsonwebtoken";
import crypto from "crypto";

export const ACCESS_SECRET = process.env.ACCESS_SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;

//14 days
export const REFRESH_TOKEN_AGE_SECONDS = 60 * 60 * 24 * 14;

//1 hour
export const ACCESS_TOKEN_AGE_SECONDS = 60 * 60;

export interface JwtPayload {
  id: number;
}

export const createRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "14d" });
};

export const createAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1h" });
};

export const validateRefreshToken = (refreshToken: string): JwtPayload => {
  return jwt.verify(refreshToken, REFRESH_SECRET, {}) as JwtPayload;
};

export const validateAccessToken = (accessToken: string): JwtPayload => {
  return jwt.verify(accessToken, ACCESS_SECRET, {}) as JwtPayload;
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
