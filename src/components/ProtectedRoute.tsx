import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/use-user";

const ProtectedRoute = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
