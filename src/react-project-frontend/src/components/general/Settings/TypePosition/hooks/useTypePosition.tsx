import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";

interface TypePosition {
  idTypeCargo: string;
  typeCargo: string;
  descriptionTypeCargo: string;
}
export const useTypePosition = () => {
  const [typePosition, setTypePosition] = useState<TypePosition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTypePosition = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllTypeSet();
      console.log(data, "data type position");
      const transformedData = data.map(([_, typePosition]) => {
        return {
          idTypeCargo: typePosition.idTypeCargo,
          typeCargo: typePosition.typeCargo,
          descriptionTypeCargo: typePosition.descriptionTypeCargo,
          userUpdate: typePosition.userUpdate,
          creationDate: typePosition.creationDate,
          state: typePosition.state,
          userCreated: typePosition.userCreated,
          updateDate: typePosition.updateDate
        };
      });
      setTypePosition(transformedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar los cargos.");
    } finally {
      setLoading(false);
    }
  };

  return { typePosition, loading, error, fetchTypePosition };
};
