import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PermisoPage from "../pages/PermisoPage";
import RolPage from "@/pages/RolPage";
import UsuarioPage from "@/pages/UsuarioPage";
import EmpresaPage from "@/pages/EmpresaPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/permiso" element={<PermisoPage />} />
        <Route path="/rol" element={<RolPage />} />
        <Route path="/usuario" element={<UsuarioPage />} />
        <Route path="/empresa" element={<EmpresaPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Ruta para manejar errores 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
