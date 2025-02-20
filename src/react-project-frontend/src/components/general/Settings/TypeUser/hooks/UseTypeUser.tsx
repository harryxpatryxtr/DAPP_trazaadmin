import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";
import { SetUserType_Type } from "../../../../../../../declarations/react-project-backend/react-project-backend.did";

export const useTypeUser = () => {
  const [typeUser, setTypeUser] = useState<SetUserType_Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchTypeUser = async () => {
    const data = await react_project_backend.readAllUserTypeSet();
    const transformedData = data.map(([_, user]) => ({
      idTypeUser: user.idTypeUser,
      typeUser: user.typeUser,
      descriptionTypeUser: user.descriptionTypeUser,
      userUpdate: user.userUpdate,
      creationDate: user.creationDate,
      state: user.state,
      userCreated: user.userCreated,
      updateDate: user.updateDate
    }));
    setTypeUser(transformedData);
  };
  const createTypeUser = async (typeUser: SetUserType_Type) => {
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createUserTypeSet(typeUser);
      await fetchTypeUser();
    } catch (err: any) {
      console.error(err);
    }
  };

  return { typeUser, loading, error, fetchTypeUser, createTypeUser };
};
