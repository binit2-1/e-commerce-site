import type { LoginInput, RegisterInput, User } from "@shop/shared";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiGet, apiSend } from "../../lib/api-client";
import { AuthContext, type AuthContextValue } from "./authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Who am I? (401 just means "not logged in".)
  useEffect(() => {
    apiGet<User>("/api/auth/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    setUser(await apiSend<User>("POST", "/api/auth/login", input));
  }, []);
  const register = useCallback(async (input: RegisterInput) => {
    setUser(await apiSend<User>("POST", "/api/auth/register", input));
  }, []);
  const logout = useCallback(async () => {
    await apiSend("POST", "/api/auth/logout");
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
