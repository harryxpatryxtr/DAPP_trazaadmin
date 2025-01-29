import { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";

interface Permission {
  user_created: string;
  permissions: string;
  description_permissions: string;
  update_date: string;
  id_group: string;
  state: string;
  id_permissions: string;
  creation_date: string;
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
        user_created: permission.user_created,
        permissions: permission.permissions,
        description_permissions: permission.description_permissions,
        update_date: permission.update_date,
        id_group: permission.id_group,
        state: permission.state,
        id_permissions: permission.id_permissions,
        creation_date: permission.creation_date
      }));
      setPermissions(formattedData);
    } catch (err: any) {
      console.error(err);
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
      console.log(permission, "permission end");
      await fetchPermissions();
    } catch (err: any) {
      console.error(err);
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
