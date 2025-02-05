import { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";
interface User {
  codigo: string;
  email: string;
  typeDocument: string;
  user_created: string;
  name: string;
  state: string;
}
export const useUser = () => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllUsers();
      console.log(data, "data user");
      const transformedData = data.map((user) => {
        console.log(user, "user iteracion");
        return {
          codigo: user[1].id_user,
          email: user[1].email,
          typeDocument: user[1].id_type_document,
          user_created: user[1].user_created,
          name: `${user[1].name} ${user[1].maternal_surname} ${user[1].paternal_surname}`,
          state: user[1].state,
          idTypeDocument: user[1].id_type_document,
          nroDocument: user[1].nro_document,
          password: user[1].password,
          maternalSurname: user[1].maternal_surname,
          paternalSurname: user[1].paternal_surname
        };
      });

      setUser(transformedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (newData: any) => {
    try {
      await react_project_backend.createUser(newData);
    } catch (err: any) {
      console.error(err);
      setError("Error al crear el usuario.");
    }
  };

  const handleAssignUser = async (dataAssign: any) => {
    try {
      await react_project_backend.createRolUser(dataAssign);
    } catch (err: any) {
      console.error(err);
      setError("Error al asignar el usuario.");
    }
  };

  return {
    user,
    loading,
    error,
    fetchUser,
    handleCreateUser,
    handleAssignUser
  };
};
