import { db } from "@/db/db";
import { usersModel } from "@/db/models/UsersModel";
import { withUnexpectedError } from "@/HOC/withUnexpectedError";
import { withValidatedBody } from "@/HOC/withValidatedBody";
import { SignInAPIBody, signInAPIBodySchema } from "@/lib/apiValidationSchema";
import { eq } from "drizzle-orm";
import { ValidationError } from "yup";
import { compareSync } from "bcrypt";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_AGE_SECONDS,
  createAccessToken,
  hashToken,
  REFRESH_TOKEN_AGE_SECONDS,
} from "@/lib/jwt";
import crypto from "crypto";
import { UAParser } from "ua-parser-js";
import { usersTokenModel } from "@/db/models/UserTokens";

const validationCallback = (body: Record<string, any>) => {
  try {
    signInAPIBodySchema.validateSync(body);
  } catch (e) {
    const typedE = e as ValidationError;

    return { errors: typedE.errors };
  }

  return { errors: [] };
};

export const POST = withUnexpectedError(
  withValidatedBody<{ body: SignInAPIBody }>(
    async (req, _, { body: { email, password } }) => {
      const [user] = await db
        .select()
        .from(usersModel)
        .where(eq(usersModel.email, email))
        .limit(1);

      if (!user) {
        return Response.json(
          { code: 400, error: 4, data: null },
          { status: 400 }
        );
      }

      if (!compareSync(password, user.password)) {
        return Response.json(
          { code: 400, error: 5, data: null },
          { status: 400 }
        );
      }

      const c = await cookies();

      const accessToken = createAccessToken({
        exp: Date.now() + ACCESS_TOKEN_AGE_SECONDS * 1000,
        jti: crypto.randomUUID(),
        sub: user.id,
      });

      const refreshToken = createAccessToken({
        exp: Date.now() + REFRESH_TOKEN_AGE_SECONDS * 1000,
        jti: crypto.randomUUID(),
        sub: user.id,
      });

      const currentDate = Date.now();

      const ua = new UAParser(req.headers.get("User-Agent") ?? undefined);

      await db.insert(usersTokenModel).values({
        userId: user.id,
        hashedRefreshToken: hashToken(refreshToken),
        expiresAt: new Date(currentDate + REFRESH_TOKEN_AGE_SECONDS * 1000),
        deviceName:
          ua.getDevice().toString() === "undefined"
            ? null
            : ua.getDevice().toString(),
        isRevoked: false,
        userAgent: ua.getUA(),
        ip:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          req.headers.get("x-real-ip") ??
          null,
      });

      c.set("refresh_token", refreshToken, {
        maxAge: REFRESH_TOKEN_AGE_SECONDS,
        httpOnly: true,
      });

      c.set("access_token", accessToken, {
        maxAge: ACCESS_TOKEN_AGE_SECONDS,
        httpOnly: true,
      });

      const { password: __, ...resUser } = user;

      return Response.json(
        { data: resUser, error: null, code: 200 },
        { status: 200 }
      );
    },
    validationCallback
  )
);
