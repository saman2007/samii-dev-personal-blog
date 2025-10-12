import * as pg from "drizzle-orm/pg-core";

export const usersTokenModel = pg.pgTable("user_tokens", {
  id: pg.integer().primaryKey().unique().generatedAlwaysAsIdentity(),
  userId: pg.integer().notNull(),
  refreshToken: pg.text().unique().notNull(),
});
