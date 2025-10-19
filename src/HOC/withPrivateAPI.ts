import { AnyRouteContext, ApiRouteFunction } from "@/types/types";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import {
  ACCESS_TOKEN_AGE_SECONDS,
  createAccessToken,
  hashToken,
  JwtPayload,
  validateAccessToken,
  validateRefreshToken,
} from "@/lib/jwt";
import { db } from "@/db/db";
import { usersModel } from "@/db/models/UsersModel";
import { eq } from "drizzle-orm";
import { usersTokenModel } from "@/db/models/UserTokens";

export const withPrivateAPI =
  (apiRoute: ApiRouteFunction<object | undefined>, adminMode = false) =>
  async (
    req: NextRequest,
    ctx: AnyRouteContext,
    body?: object
  ): Promise<Response> => {
    const c = await cookies();

    const refreshToken = c.get("refresh_token")?.value;
    const accessToken = c.get("access_token")?.value;

    if (!refreshToken || !accessToken)
      return Response.json(
        { data: null, error: "Unauthorized", code: 401 },
        { status: 401 }
      );

    let refreshTokenPayload: JwtPayload;
    let accessTokenPayload: JwtPayload;
    try {
      refreshTokenPayload = validateRefreshToken(refreshToken);
      accessTokenPayload = validateAccessToken(accessToken);
    } catch {
      return Response.json(
        { data: null, error: "Unauthorized", code: 401 },
        { status: 401 }
      );
    }

    const [{ refreshTokenExp, isRevoked }] = await db
      .select({
        isRevoked: usersTokenModel.isRevoked,
        refreshTokenExp: usersTokenModel.expiresAt,
      })
      .from(usersTokenModel)
      .where(eq(usersTokenModel.hashedRefreshToken, hashToken(refreshToken)));

    if (isRevoked) {
      return Response.json(
        { data: null, error: "Unauthorized", code: 401 },
        { status: 401 }
      );
    }

    if (refreshTokenExp <= new Date()) {
      return Response.json(
        { data: null, error: "Unauthorized", code: 401 },
        { status: 401 }
      );
    }

    if (accessTokenPayload.exp <= Date.now()) {
      const jwtPayload: JwtPayload = {
        sub: accessTokenPayload.sub,
        jti: crypto.randomUUID(),
        exp: Date.now() + ACCESS_TOKEN_AGE_SECONDS * 1000,
      };

      const newAccessToken = createAccessToken(jwtPayload);

      c.set("access_token", newAccessToken, {
        maxAge: ACCESS_TOKEN_AGE_SECONDS,
        httpOnly: true,
      });
    }

    if (adminMode) {
      const [{ usersRole }] = await db
        .select({ usersRole: usersModel.role })
        .from(usersModel)
        .where(eq(usersModel.id, refreshTokenPayload.sub));

      if (usersRole !== "ADMIN") {
        return Response.json(
          { data: null, error: "Access Denied", code: 403 },
          { status: 403 }
        );
      }
    }

    return apiRoute(req, ctx, body);
  };
