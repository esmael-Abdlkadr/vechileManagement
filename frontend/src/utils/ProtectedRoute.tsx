import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../store/useAuth";
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  //   if (isLoading) return <Spinner />;
  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=signin" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
