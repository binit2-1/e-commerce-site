import pg from "pg";

// DATABASE_URL comes from the root .env (loaded by `node --env-file` in the scripts).
export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
