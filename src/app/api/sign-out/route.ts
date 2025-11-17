import { db } from "@/db/db";
import { usersTokenModel } from "@/db/models/UserTokens";
import { withUnexpectedError } from "@/HOC/withUnexpectedError";
import { validateAccessToken, validateRefreshToken } from "@/lib/jwt";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const GET = withUnexpectedError(async () => {
  const c = await cookies();

  const hasRefreshToken = c.has("refresh_token");
  const authToken = hasRefreshToken
    ? c.get("refresh_token")?.value
    : c.get("access_token")?.value;

  try {
    const authTokenPayload = hasRefreshToken
      ? validateRefreshToken(authToken || "")
      : validateAccessToken(authToken || "");

    await db
      .delete(usersTokenModel)
      .where(eq(usersTokenModel.jti, authTokenPayload.jti));
  } catch {}

  c.delete("refresh_token");
  c.delete("access_token");
  c.delete("is_logged_in");

  return Response.json({ data: null, code: 200, error: null });
});
