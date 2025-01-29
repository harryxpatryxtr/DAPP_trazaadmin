import { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";

interface Role {
  rol: string;
  user_created: string;
  description_rol: string;
  update_date: string;
  id_group: string;
  state: string;
  id_rol: string;
  creation_date: string;
}

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllRoles();
      const formattedData = data.map(([_, role]) => ({
        rol: role.rol,
        user_created: role.user_created,
        description_rol: role.description_rol,
        update_date: role.update_date,
        id_group: role.id_group,
        state: role.state,
        id_rol: role.id_rol,
        creation_date: role.creation_date
      }));
      setRoles(formattedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los roles.");
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (role: Role) => {
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createRole(role);
      await fetchRoles();
    } catch (err: any) {
      console.error(err);
      setError("Error al crear el rol.");
    } finally {
      setLoading(false);
    }
  };

  return { roles, loading, error, fetchRoles, createRole };
};
