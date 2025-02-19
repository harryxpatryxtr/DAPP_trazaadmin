import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";

interface TypeDocument {
  descriptionTypeDocument: string;
  idTypeDocument: string;
  userUpdate: string;
  creationDate: string;
  typeDocument: string;
  state: string;
  userCreated: string;
  updateDate: string;
}

export const useTypeDocument = () => {
  const [typeDocuments, setTypeDocuments] = useState<TypeDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllDocumentTypeSet();
      console.log(data, "data type document");
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

  const createTypeDocument = async (typeDocument: TypeDocument) => {
    setLoading(true);
    setError(null);
    console.log(typeDocument, "typeDocument create");
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
