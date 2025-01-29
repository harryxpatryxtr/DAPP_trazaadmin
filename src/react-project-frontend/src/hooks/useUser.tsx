import React, { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";
interface User {
  rol: string;
  user_created: string;
  description_rol: string;
  update_date: string;
  id_group: string;
  state: string;
  id_rol: string;
  creation_date: string;
}
export const useUser = () => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const fetchUser = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const data = await react_project_backend.readTypeUser();
  //     setUser(data);
  //   } catch (err: any) {
  //     console.error(err);
  //     setError("Error al cargar los usuarios.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return <div>useUser</div>;
};
