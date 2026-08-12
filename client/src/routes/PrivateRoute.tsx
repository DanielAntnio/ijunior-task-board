import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
