import * as pg from "drizzle-orm/pg-core";
import { timestampCols } from "../columnHelpers";

export const rolesEnum = pg.pgEnum("ROLES", ["USER", "ADMIN"]);

export const usersModel = pg.pgTable("users", {
  id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
  username: pg.varchar({ length: 256 }).notNull().unique(),
  email: pg.varchar({ length: 256 }).unique().notNull(),
  password: pg.varchar({ length: 256 }).notNull(),
  bio: pg.varchar({ length: 2048 }),
  profileImg: pg.varchar({ length: 512 }),
  role: rolesEnum().default("USER"),
  ...timestampCols,
});
