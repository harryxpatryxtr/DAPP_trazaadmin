import { useState } from "react";
import { react_project_backend } from "../../../../../../../declarations/react-project-backend";
import { SetCargoType_Type } from "../../../../../../../declarations/react-project-backend/react-project-backend.did";

export const useTypePosition = () => {
  const [typePosition, setTypePosition] = useState<SetCargoType_Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTypePosition = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllCargoTypeSet();
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

  const createTypePosition = async (typePosition: SetCargoType_Type) => {
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createCargoTypeSet(typePosition);
      await fetchTypePosition();
    } catch (err: any) {
      console.error(err);
      setError("Error al crear el cargo.");
    } finally {
      setLoading(false);
    }
  };

  return {
    typePosition,
    loading,
    error,
    fetchTypePosition,
    createTypePosition
  };
};
