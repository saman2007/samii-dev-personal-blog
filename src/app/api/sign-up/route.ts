import { db } from "@/db/db";
import { usersModel } from "@/db/models/UsersModel";
import { withUnexpectedError } from "@/HOC/withUnexpectedError";
import { withValidatedBody } from "@/HOC/withValidatedBody";
import { SignupAPIBody, signupAPIBodySchema } from "@/lib/apiValidationSchema";
import { eq } from "drizzle-orm";
import { ValidationError } from "yup";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken, JwtPayload } from "@/lib/jwt";
import { usersTokenModel } from "@/db/models/UserTokens";
import { cookies } from "next/headers";

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
  withValidatedBody<SignupAPIBody>(async (req, _, body) => {
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

    const jwtPayload: JwtPayload = {
      role: "USER",
      email,
      username,
      id: createdUser.id,
    };

    const refreshToken = createRefreshToken(jwtPayload);
    const accessToken = createAccessToken(jwtPayload);

    await db
      .insert(usersTokenModel)
      .values({ userId: createdUser.id, refreshToken: refreshToken });

    const c = await cookies();

    c.set("refresh_token", refreshToken, {
      maxAge: 60 * 60 * 24 * 14,
      httpOnly: true,
    });
    c.set("access_token", accessToken, { maxAge: 60 * 60, httpOnly: true });

    return Response.json({ error: null, code: 200, data: createdUser });
  }, validationHandler)
);
