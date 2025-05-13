import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PermisoPage from "../pages/PermisoPage";
import RolPage from "@/pages/RolPage";
import UsuarioPage from "@/pages/UsuarioPage";
import EmpresaPage from "@/pages/EmpresaPage";
import DominioPage from "@/pages/DominioPage";
import TypeDocumentPage from "@/pages/TypeDocumentPage";
import TypeUserPage from "@/pages/TypeUserPage";
import TypePositionPage from "@/pages/TypePositionPage";
import CompanyPage from "@/pages/CompanyPage";
import PrivateRoute from "@/components/PrivateRoute";
import AddFilePage from "@/pages/AddFilePage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/file" element={<AddFilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/permiso" element={<PermisoPage />} />
          <Route path="/rol" element={<RolPage />} />
          <Route path="/usuario" element={<UsuarioPage />} />
          <Route path="/empresa" element={<EmpresaPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dominio" element={<DominioPage />} />
          <Route path="/tipo-documento" element={<TypeDocumentPage />} />
          <Route path="/tipo-cargo" element={<TypePositionPage />} />
          <Route path="/tipo-usuario" element={<TypeUserPage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Route>
        {/* Ruta para manejar errores 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
