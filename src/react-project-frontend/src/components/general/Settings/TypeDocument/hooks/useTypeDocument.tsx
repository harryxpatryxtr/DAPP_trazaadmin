import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";
import { SetDocumentType_Type } from "../../../../../../../declarations/react-project-backend/react-project-backend.did";

export const useTypeDocument = () => {
  const [typeDocuments, setTypeDocuments] = useState<SetDocumentType_Type[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllDocumentTypeSet();
      const formattedData = data.map(([_, documentType]) => ({
        descriptionTypeDocument: documentType.descriptionTypeDocument,
        idTypeDocument: documentType.idTypeDocument,
        userUpdate: documentType.userUpdate,
        creationDate: documentType.creationDate,
        typeDocument: documentType.typeDocument,
        state: documentType.state,
        userCreated: documentType.userCreated,
        updateDate: documentType.updateDate
      }));

      setTypeDocuments(formattedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los roles.");
    } finally {
      setLoading(false);
    }
  };

  const createTypeDocument = async (typeDocument: SetDocumentType_Type) => {
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createDocumentTypeSet(typeDocument);
      await fetchDomains();
    } catch (err: any) {
      console.error(err);
      setError("Error al crear el tipo de documento.");
    } finally {
      setLoading(false);
    }
  };

  return {
    typeDocuments,
    loading,
    error,
    fetchDomains,
    createTypeDocument
  };
};
