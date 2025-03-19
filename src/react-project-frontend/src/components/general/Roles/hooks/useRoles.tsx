import { useState } from "react";
import { react_project_backend } from "../../../../../../declarations/react-project-backend";
import {
  AdmRoles_Type,
  AdmRolPermissions_Type
} from "../../../../../../declarations/react-project-backend/react-project-backend.did";
import { toast } from "sonner";
export const useRoles = () => {
  const [roles, setRoles] = useState<AdmRoles_Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllRoles();
      const formattedData = data.map(([_, role]) => ({
        rol: role.rol,
        userCreated: role.userCreated,
        descriptionRol: role.descriptionRol,
        updateDate: role.updateDate,
        state: role.state,
        idRol: role.idRol,
        creationDate: role.creationDate
      }));
      console.log(data, "data in useRoles");
      setRoles(formattedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los roles.");
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (role: AdmRoles_Type) => {
    setLoading(true);
    setError(null);
    console.log(role, "role");
    try {
      await react_project_backend.createRole(role);
      await fetchRoles();
      toast("Rol creado correctamente", {
        description: "Rol creado correctamente"
      });
    } catch (err: any) {
      console.error(err);
      setError("Error al crear el rol.");
      toast("Error al crear el rol.", {
        description: "Error al crear el rol."
      });
    } finally {
      setLoading(false);
    }
  };

  const createRolPermission = async (rolPermission: AdmRolPermissions_Type) => {
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createRolPermission(rolPermission);
      await fetchRoles();
      toast("Permiso creado correctamente", {
        description: "Permiso creado correctamente"
      });
    } catch (err: any) {
      setError("Error al crear el permiso.");
      toast("Error al crear el permiso.", {
        description: "Error al crear el permiso."
      });
    } finally {
      setLoading(false);
    }
  };

  return { roles, loading, error, fetchRoles, createRole, createRolPermission };
};
