import * as pg from "drizzle-orm/pg-core";

export const timestampCols = {
  updatedAt: pg.timestamp({ withTimezone: true }),
  createdAt: pg.timestamp({ withTimezone: true }).defaultNow().notNull(),
  deletedAt: pg.timestamp({ withTimezone: true }),
};
