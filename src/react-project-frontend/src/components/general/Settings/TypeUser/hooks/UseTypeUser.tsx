import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";

interface TypeUser {
  idTypeUser: string;
  typeUser: string;
  description?: string;
  author?: string;
  state: string;
}

export const useTypeUser = () => {
  // readAllUserTypeSet
  const [typeUser, setTypeUser] = useState<TypeUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchTypeUser = async () => {
    const data = await react_project_backend.readAllUserTypeSet();
    console.log(data, "data type user 222");
    const transformedData = data.map(([_, user]) => {
      return {
        idTypeUser: user.idTypeUser,
        typeUser: user.typeUser,
        descriptionTypeUser: user.descriptionTypeUser,
        userUpdate: user.userUpdate,
        creationDate: user.creationDate,
        state: user.state,
        userCreated: user.userCreated,
        updateDate: user.updateDate
      };
    });
    console.log(transformedData, "transformedData");
    setTypeUser(transformedData);
  };
  console.log(typeUser, "typeUser hooks");
  return { typeUser, loading, error, fetchTypeUser };
};
