import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const COOKIE_NAME = "token";
export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const secret = () => {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET is not set (see .env.example)");
  return s;
};

export const signToken = (userId: number) => jwt.sign({}, secret(), { subject: String(userId), expiresIn: "7d" });

/** Rejects with 401 unless the request carries a valid login cookie; sets req.userId. */
export const requireAuth: RequestHandler = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies?.[COOKIE_NAME] ?? "", secret());
    req.userId = Number(typeof payload === "string" ? NaN : payload.sub);
    if (!Number.isInteger(req.userId)) throw new Error("bad subject");
    next();
  } catch {
    res.status(401).json({ error: "Please log in" });
  }
};
