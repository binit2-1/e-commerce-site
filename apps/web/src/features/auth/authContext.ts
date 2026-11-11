import type { LoginInput, RegisterInput, User } from "@shop/shared";
import { createContext } from "react";

export interface AuthContextValue {
  /** null when logged out. */
  user: User | null;
  /** true until the first /api/auth/me check finishes. */
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
