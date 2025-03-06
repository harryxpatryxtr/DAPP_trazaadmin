import { useState } from "react";
import { react_project_backend } from "../../../../../../declarations/react-project-backend";
import { ParentCompanyREO_Type } from "../../../../../../declarations/react-project-backend/react-project-backend.did";

export const useCompany = () => {
  const [companies, setCompanies] = useState<ParentCompanyREO_Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await react_project_backend.readAllParentCompany();
      const formattedData = data.map(([_, domain]) => ({
        idCanisterData: domain.idCanisterData || "",
        parentCompanyContactCellular: domain.parentCompanyContactCellular || "",
        parentCompanyAddress: domain.parentCompanyAddress || "",
        parentCompanyRuc: domain.parentCompanyRuc || "",
        parentCompanyWeb: domain.parentCompanyWeb || "",
        logo: domain.logo || "",
        parentCompanyLocation: domain.parentCompanyLocation || "",
        userUpdate: domain.userUpdate || "",
        creationDate: domain.creationDate || "",
        glnParentCompany: domain.glnParentCompany || "",
        state: domain.state || "",
        parentCompany: domain.parentCompany || "",
        parentCompanyContactEmail: domain.parentCompanyContactEmail || "",
        userCreated: domain.userCreated || "",
        parentCompanyUbigeo: domain.parentCompanyUbigeo || "",
        idCanisterAssets: domain.idCanisterAssets || "",
        updateDate: domain.updateDate || "",
        idParentCompany: domain.idParentCompany || ""
      }));
      setCompanies(formattedData);
    } catch (err: any) {
      console.error(err);
      setError("Error al cargar las empresas.");
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (company: ParentCompanyREO_Type) => {
    console.log(company, "company create");
    setLoading(true);
    setError(null);
    try {
      await react_project_backend.createParentCompany(company);
      await fetchCompanies();
    } catch (err: any) {
      console.error(err);
    }
  };

  const uploadFile = async (selectedFile: File, canisterId: string) => {
    console.log(selectedFile, "selectedFile");
    console.log(canisterId, "canisterId");
    setUploading(true);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      console.log(uint8Array, "uint8Array");
      await react_project_backend.installWasm(canisterId, [...uint8Array]);
      alert("Archivo subido con éxito a ICP");
    } catch (error) {
      console.error("Error subiendo archivo:", error);
      alert("Error subiendo archivo");
    } finally {
      setUploading(false);
    }
  };

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    createCompany,
    uploadFile
  };
};
