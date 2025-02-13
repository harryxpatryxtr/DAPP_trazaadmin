import { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";

interface Permission {
  userCreated: string;
  permissions: string;
  descriptionPermissions: string;
  updateDate: string;
  state: string;
  idPermissions: string;
  creationDate: string;
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Leer todos los permisos
  const fetchPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllPermissions();
      // Transform the data to match Permission interface
      const formattedData = data.map(([_, permission]) => ({
        userCreated: permission.userCreated || "",
        permissions: permission.permissions || "",
        descriptionPermissions: permission.descriptionPermissions || "",
        updateDate: permission.updateDate || "",
        state: permission.state || "",
        idPermissions: permission.idPermissions || "",
        creationDate: permission.creationDate || ""
      }));
      setPermissions(formattedData);
    } catch (err: any) {
      setError("Error al cargar los permisos.");
    } finally {
      setLoading(false);
    }
  };

  const createPermission = async (permission: Permission) => {
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createPermission(permission);
      // Opcional: Refrescar la lista de permisos después de crear
      await fetchPermissions();
    } catch (err: any) {
      setError("Error al crear el permiso.");
    } finally {
      setLoading(false);
    }
  };

  return {
    permissions,
    loading,
    error,
    fetchPermissions,
    createPermission
  };
};
