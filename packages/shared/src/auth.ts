import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  // bcrypt only uses the first 72 bytes, so cap there.
  password: z.string().min(8, "Use at least 8 characters").max(72),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  password: z.string().min(1, "Password is required").max(72),
});
export type LoginInput = z.infer<typeof loginSchema>;

export interface User {
  user_id: number;
  name: string;
  email: string;
}
