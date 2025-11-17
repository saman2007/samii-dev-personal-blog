import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SUPPORT_SSL === "true",
});

export const db = drizzle({ client: pool, casing: "snake_case" });
