import { db } from "@/db/db";
import { usersModel } from "@/db/models/UsersModel";
import { withUnexpectedError } from "@/HOC/withUnexpectedError";
import { withValidatedBody } from "@/HOC/withValidatedBody";
import { SignupAPIBody, signupAPIBodySchema } from "@/lib/apiValidationSchema";
import { eq } from "drizzle-orm";
import { ValidationError } from "yup";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_AGE_SECONDS,
  createAccessToken,
  createRefreshToken,
  hashToken,
  REFRESH_TOKEN_AGE_SECONDS,
} from "@/lib/jwt";
import { usersTokenModel } from "@/db/models/UserTokens";
import { cookies } from "next/headers";
import { UAParser } from "ua-parser-js";
import crypto from "crypto";

const validationHandler = (body: object) => {
  try {
    signupAPIBodySchema.validateSync(body);
  } catch (e) {
    const typedE = e as ValidationError;

    return { errors: typedE.errors };
  }

  return { errors: [] };
};

export const POST = withUnexpectedError(
  withValidatedBody<{ body: SignupAPIBody }>(async (req, _, { body }) => {
    const { email, password, username } = body!;

    const userByUsername = db
      .select({ id: usersModel.id })
      .from(usersModel)
      .where(eq(usersModel.username, username))
      .limit(1)
      .execute();

    const userByEmail = db
      .select({ id: usersModel.id })
      .from(usersModel)
      .where(eq(usersModel.email, email))
      .limit(1)
      .execute();

    const [res1, res2] = await Promise.all([userByEmail, userByUsername]);

    let userExistsErrorMsg: number;

    if (res1.length && res2.length) userExistsErrorMsg = 1;
    else if (res1.length) userExistsErrorMsg = 2;
    else if (res2.length) userExistsErrorMsg = 3;

    if (res1.length || res2.length) {
      return Response.json(
        { error: userExistsErrorMsg!, code: 409, data: null },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ password: __, ...createdUser }] = await db
      .insert(usersModel)
      .values({
        email,
        username,
        password: await bcrypt.hash(password, salt),
        role: "USER",
      })
      .returning();

    const currentDate = Date.now();

    const authId = crypto.randomUUID();

    const refreshToken = createRefreshToken({
      sub: createdUser.id,
      jti: authId,
      exp: Math.floor(currentDate / 1000) + REFRESH_TOKEN_AGE_SECONDS,
    });

    const accessToken = createAccessToken({
      sub: createdUser.id,
      jti: authId,
      exp: Math.floor(currentDate / 1000) + ACCESS_TOKEN_AGE_SECONDS,
    });

    const ua = new UAParser(req.headers.get("User-Agent") ?? undefined);

    await db.insert(usersTokenModel).values({
      id: authId,
      userId: createdUser.id,
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

    const c = await cookies();

    c.set("refresh_token", refreshToken, {
      maxAge: REFRESH_TOKEN_AGE_SECONDS,
      httpOnly: true,
    });
    c.set("access_token", accessToken, {
      maxAge: ACCESS_TOKEN_AGE_SECONDS,
      httpOnly: true,
    });
    c.set("is_logged_in", "1", { maxAge: REFRESH_TOKEN_AGE_SECONDS });

    return Response.json({ error: null, code: 200, data: createdUser });
  }, validationHandler)
);
