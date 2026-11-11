import { Navigate, Outlet, useLocation } from "react-router-dom";
import { paths } from "../../app/paths";
import { useAuth } from "./useAuth";

/** Route wrapper: renders its child routes only for logged-in users, otherwise sends them to /login. */
const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="py-32 text-center text-muted">Loading…</p>;
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${paths.login}?next=${next}`} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
