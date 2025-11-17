import * as pg from "drizzle-orm/pg-core";
import { timestampCols } from "../columnHelpers";

export const usersTokenModel = pg.pgTable("user_tokens", {
  id: pg.integer().primaryKey().unique().generatedAlwaysAsIdentity(),
  jti: pg.varchar({ length: 36 }).notNull().unique(),
  userId: pg.integer().notNull(),
  hashedRefreshToken: pg.text().unique().notNull(),
  deviceName: pg.varchar({ length: 200 }),
  userAgent: pg.text(),
  ip: pg.varchar({ length: 45 }),
  expiresAt: pg.timestamp().notNull(),
  isRevoked: pg.boolean().notNull().default(false),
  ...timestampCols,
});
