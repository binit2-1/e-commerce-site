import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "@shop/shared";
import type { Request, Response } from "express";
import { pool } from "../db.js";
import { COOKIE_NAME, COOKIE_OPTIONS, signToken } from "../middleware/auth.js";

// Compared against when the email is unknown, so "no such user" and "wrong password" take equally long.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export async function register(req: Request, res: Response) {
  const { name, email, password } = registerSchema.parse(req.body);
  const hash = await bcrypt.hash(password, 10);

  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, name, email",
      [name, email, hash],
    );
    res.cookie(COOKIE_NAME, signToken(rows[0].user_id), COOKIE_OPTIONS);
    res.status(201).json(rows[0]);
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      res.status(409).json({ error: "That email is already registered" });
      return;
    }
    throw err;
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);
  const { rows } = await pool.query("SELECT user_id, name, email, password_hash FROM users WHERE email = $1", [email]);
  const user = rows[0];

  const ok = await bcrypt.compare(password, user?.password_hash ?? DUMMY_HASH);
  if (!user || !ok) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  res.cookie(COOKIE_NAME, signToken(user.user_id), COOKIE_OPTIONS);
  res.json({ user_id: user.user_id, name: user.name, email: user.email });
}

export function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: undefined });
  res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  const { rows } = await pool.query("SELECT user_id, name, email FROM users WHERE user_id = $1", [req.userId]);
  if (!rows[0]) {
    res.status(401).json({ error: "Please log in" });
    return;
  }
  res.json(rows[0]);
}
