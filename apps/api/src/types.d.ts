declare namespace Express {
  interface Request {
    /** Set by requireAuth. */
    userId?: number;
  }
}
