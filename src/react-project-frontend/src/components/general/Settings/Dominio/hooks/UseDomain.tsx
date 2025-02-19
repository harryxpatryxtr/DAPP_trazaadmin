import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";
interface Domain {
  groupInformationDescription: string;
  userUpdate: string;
  creationDate: string;
  state: string;
  idGroupInformation: string;
  userCreated: string;
  groupInformationName: string;
}

export const useDomain = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = async () => {
    setLoading(true);
    setError(null);
    // groupInformationDescription: text;
    // userUpdate: text;
    // creationDate: text;
    // state: text;
    // idGroupInformation: text;
    // userCreated: text;
    // groupInformationName: text;
    // updateDate: text;
    try {
      const data = await react_project_backend.readAllGroupInformations();
      const formattedData = data.map(([_, domain]) => ({
        groupInformationDescription: domain.groupInformationDescription,
        userUpdate: domain.userUpdate,
        creationDate: domain.creationDate,
        state: domain.state,
        idGroupInformation: domain.idGroupInformation,
        userCreated: domain.userCreated,
        groupInformationName: domain.groupInformationName
      }));
      console.log(formattedData, "formater date");
      setDomains(formattedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los roles.");
    } finally {
      setLoading(false);
    }
  };

  return { domains, loading, error, fetchDomains };
};
