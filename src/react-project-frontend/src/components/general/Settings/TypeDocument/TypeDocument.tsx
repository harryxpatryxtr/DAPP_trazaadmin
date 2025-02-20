import Layout from "@/components/layout";
import { DataTable, Modal } from "../../";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { useTypeDocument } from "./hooks/useTypeDocument";
import { useEffect, useState } from "react";

const TypeDocument = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const { typeDocuments, loading, error, fetchDomains, createTypeDocument } =
    useTypeDocument();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    if (newData) {
      createTypeDocument({
        descriptionTypeDocument: newData.description,
        typeDocument: newData.typeDocument,
        state: newData.state || "active",
        userCreated: userData.user_created,
        updateDate: "",
        userUpdate: userData.user_created,
        creationDate: "",
        idTypeDocument: newData.idTypeDocument || ""
      });
      setNewData(null);
    }
  }, [newData]);

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Nuevo tipo de documento"
      title="Nuevo"
      setOpen={() => setOpen(!open)}
      open={open}
    />
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo de Documento</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar los datos</p>}
      {typeDocuments && (
        <DataTable
          columns={columns}
          data={typeDocuments}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};

export default TypeDocument;
