import React from "react";
import { useAuth } from "@/context/AuthProvider";

const LoginButton: React.FC = () => {
  const { isAuthenticated, principalId, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Conectado como: {principalId}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button className="btn" onClick={login}>Iniciar sesión en ICP</button>
      )}
    </div>
  );
};

export default LoginButton;
