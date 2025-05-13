import React from "react";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { isAuthenticated, principalId, login, logout } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Button onClick={login}>Iniciar sesión en ICP</Button>
    </div>
  );
};

export default LoginPage;
