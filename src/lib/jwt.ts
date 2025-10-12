import { UserRoles } from "@/types/types";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  role: UserRoles;
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
