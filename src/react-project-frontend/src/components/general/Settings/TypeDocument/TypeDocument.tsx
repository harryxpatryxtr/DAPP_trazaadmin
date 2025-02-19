import Layout from "@/components/layout";
import { DataTable, Modal } from "../../";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { useTypeDocument } from "./hooks/useTypeDocument";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

const TypeDocument = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { newData, setNewData } = useNewData(null);
  // const { userData } = useUser();
  const columns = useColumns(setNewData);
  const { typeDocuments, loading, error, fetchDomains, createTypeDocument } =
    useTypeDocument();
  // console.log(typeDocuments, "typeDocuments");
  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} />}
      subTitle="Nuevo dominio"
      title="Nuevo"
    />
  ];

  useEffect(() => {
    fetchDomains();
  }, []);

  // descriptionTypeDocument:text; idTypeDocument:text; userUpdate:text; creationDate:text; typeDocument:text; state:text; userCreated:text; updateDate:text}
  useEffect(() => {
    if (newData) {
      createTypeDocument({
        descriptionTypeDocument: newData.description,
        typeDocument: newData.typeDocument,
        state: userData.state || "activo",
        userCreated: userData.userCreated || "",
        updateDate: userData.updateDate || "",
        userUpdate: userData.userUpdate || "",
        creationDate: userData.creationDate || "",
        idTypeDocument: userData.idTypeDocument || ""
      });
    }
  }, [newData]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo de Documento</h1>
      <DataTable
        columns={columns}
        data={typeDocuments}
        headerActions={headerActions}
      />
    </Layout>
  );
};

export default TypeDocument;
