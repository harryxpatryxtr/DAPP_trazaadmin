import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";
import { Domain } from "../type";

export const useDomain = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
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
      console.log(formattedData, "formater date");
      setDomains(formattedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los roles.");
    } finally {
      setLoading(false);
    }
  };

  const createDomain = async (domain: Domain) => {
    setLoading(true);
    setError(null);
    console.log(domain, "domain create and update");
    try {
      const data = await react_project_backend.createInformationSet(domain);
      console.log(data, "data create domain");
      await fetchDomains();
    } catch (err: any) {
      console.error(err);
    }
  };

  return { domains, loading, error, fetchDomains, createDomain };
};
