import { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";
import { AdmPermissions_Type } from "../../../declarations/react-project-backend/react-project-backend.did";

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<AdmPermissions_Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllPermissions();
      const formattedData = data.map(([_, permission]) => ({
        userCreated: permission.userCreated,
        permissions: permission.permissions,
        descriptionPermissions: permission.descriptionPermissions,
        updateDate: permission.updateDate,
        state: permission.state,
        idPermissions: permission.idPermissions,
        creationDate: permission.creationDate
      }));
      setPermissions(formattedData);
    } catch (err: any) {
      setError("Error al cargar los permisos.");
    } finally {
      setLoading(false);
    }
  };

  const createPermission = async (permission: AdmPermissions_Type) => {
    setLoading(true);
    setError(null);
    console.log(permission, "hook create");
    try {
      await react_project_backend.createPermission(permission);
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
