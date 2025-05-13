import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // const isAuthenticated = !!localStorage.getItem("token"); // Simulación de autenticación
  // const user_data = JSON.parse(localStorage.getItem("user") || "{}");
  // const isAuthenticated = !!user_data.token;
  
  const { isAuthenticated: isAuthenticatedContext } = useAuth();
  return isAuthenticatedContext ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
