import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "../../app/paths";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import { safeNext } from "../../lib/safeNext";
import { useAuth } from "./useAuth";

const inputClass =
  "mt-2 w-full rounded-full bg-surface px-5 py-3.5 outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-60";

const AuthForm = ({ mode }: { mode: "login" | "register" }) => {
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const isRegister = mode === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to={next} replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (isRegister) await register({ name, email, password });
      else await login({ email, password });
      navigate(next, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const otherPath = `${isRegister ? paths.login : paths.register}${params.get("next") ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <Container className="max-w-[480px] py-12 lg:py-20">
      <h1 className="font-display text-3xl lg:text-4xl">{isRegister ? "CREATE ACCOUNT" : "LOG IN"}</h1>
      <p className="mt-2 text-muted">
        {isRegister ? "Sign up to save your cart and place orders." : "Welcome back. Log in to continue."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        {isRegister && (
          <label className="block">
            <span className="text-sm">Name</span>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              disabled={submitting}
            />
          </label>
        )}
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={submitting}
          />
        </label>
        <label className="block">
          <span className="text-sm">Password</span>
          <input
            type="password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 8 : undefined}
            required
            disabled={submitting}
          />
          {isRegister && <span className="mt-1 block text-xs text-muted">At least 8 characters.</span>}
        </label>

        <p role="alert" className="min-h-5 text-sm text-sale">
          {error}
        </p>

        <Button type="submit" full disabled={submitting}>
          {submitting ? "Please wait…" : isRegister ? "Create account" : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {isRegister ? "Already have an account?" : "New here?"}{" "}
        <Link to={otherPath} className="text-black underline">
          {isRegister ? "Log in" : "Create an account"}
        </Link>
      </p>
    </Container>
  );
};

export default AuthForm;
