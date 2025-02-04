import React, { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";

export const useRolList = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(roles, "roles use hook");
  const listRolesFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllRoles();
      setRoles(data);
      console.log(data, "data use hook");
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los roles.");
    } finally {
      setLoading(false);
    }
  };
  return { roles, loading, error, listRolesFetch };
};
