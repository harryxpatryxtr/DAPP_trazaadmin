import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PermisoPage from "../pages/PermisoPage";
import RolPage from "@/pages/RolPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/permiso" element={<PermisoPage />} />
        <Route path="/rol" element={<RolPage />} />

        {/* Página principal */}
        {/* <Route path="/" element={<HomePage />} /> */}

        {/* Ruta para manejar errores 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

        {/* Ruta para Home */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
