// import { useState } from "react";
// import { react_project_backend } from "../../../../../../../declarations/react-project-backend";

// export const useTypeDocument = () => {
//   const [typeDocuments, setTypeDocuments] = useState<TypeDocument[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDomains = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await react_project_backend.readAllDocumentTypeSet();
//       // const formattedData = data.map(([_, domain]) => ({
//       //   rol: role.rol,
//       //   userCreated: role.userCreated,
//       //   descriptionRol: role.descriptionRol,
//       //   updateDate: role.updateDate,
//       //   state: role.state,
//       //   idRol: role.idRol,
//       //   creationDate: role.creationDate
//       // }));
//       // setTypeDocuments(formattedData);
//     } catch (err: any) {
//       console.error(err);
//       setError("Error al cargar los roles.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { domains, loading, error, fetchDomains };
// };
