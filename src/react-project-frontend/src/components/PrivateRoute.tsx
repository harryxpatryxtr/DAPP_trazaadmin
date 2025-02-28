import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // const isAuthenticated = !!localStorage.getItem("token"); // Simulación de autenticación
  const user_data = JSON.parse(localStorage.getItem("user") || "{}");
  const isAuthenticated = !!user_data.token;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
