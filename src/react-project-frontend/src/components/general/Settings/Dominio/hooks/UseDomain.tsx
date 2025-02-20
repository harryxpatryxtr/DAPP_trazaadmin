import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";
import { SetGroupInformations_Type } from "../../../../../../../declarations/react-project-backend/react-project-backend.did";

export const useDomain = () => {
  const [domains, setDomains] = useState<SetGroupInformations_Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllGroupInformations();
      const formattedData = data.map(([_, domain]) => ({
        groupInformationDescription: domain.groupInformationDescription || "",
        userUpdate: domain.userUpdate || "",
        creationDate: domain.creationDate || "",
        state: domain.state || "",
        idGroupInformation: domain.idGroupInformation || "",
        userCreated: domain.userCreated || "",
        groupInformationName: domain.groupInformationName || "",
        updateDate: domain.updateDate || ""
      }));
      setDomains(formattedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los roles.");
    } finally {
      setLoading(false);
    }
  };

  const createDomain = async (domain: SetGroupInformations_Type) => {
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createInformationSet(domain);
      await fetchDomains();
    } catch (err: any) {
      console.error(err);
    }
  };

  return { domains, loading, error, fetchDomains, createDomain };
};
