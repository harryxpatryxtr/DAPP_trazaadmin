import { useState } from "react";
import { react_project_backend } from "../../../../../../declarations/react-project-backend";
interface User {
  codigo: string;
  email: string;
  typeDocument: string;
  userCreated: string;
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
      const transformedData = data.map((user: any) => {
        return {
          codigo: user[1].idUser,
          email: user[1].email,
          typeDocument: user[1].idTypeDocument,
          userCreated: user[1].userCreated,
          name: `${user[1].name} ${user[1].maternal_surname} ${user[1].paternal_surname}`,
          state: user[1].state,
          idTypeDocument: user[1].idTypeDocument,
          nroDocument: user[1].nroDocument,
          password: user[1].password,
          maternalSurname: user[1].maternal_surname,
          paternalSurname: user[1].paternal_surname
        };
      });
      console.log(data, "transformedData");
      setUser(transformedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (newData: any) => {
    console.log(newData, "create user");
    try {
      await react_project_backend.createUser(newData);
      await fetchUser();
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
