import { DataTable } from "@/components/general/DataTable";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { Modal } from "../../Modal";
import Layout from "@/components/layout";
import { useTypePosition } from "./hooks/useTypePosition";
import { useEffect, useState } from "react";

export const TypePosition = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const {
    typePosition,
    loading,
    error,
    fetchTypePosition,
    createTypePosition
  } = useTypePosition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTypePosition();
  }, []);

  useEffect(() => {
    if (newData) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const user_created = userData.user_created;
      createTypePosition({
        idTypeCargo: newData.idTypeCargo || "",
        typeCargo: newData.typeCargo,
        descriptionTypeCargo: newData.descriptionTypeCargo,
        userUpdate: user_created,
        creationDate: "",
        state: newData.state || "active",
        userCreated: user_created,
        updateDate: ""
      });
      setNewData(null);
    }
  }, [newData]);

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Nuevo tipo de cargo"
      title="Nuevo"
      setOpen={() => setOpen(!open)}
      open={open}
    />
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Pagina Tipo de Cargo</h1>
      {loading && <p>Cargando tipo de cargo...</p>}
      {error && <p>Error al cargar el tipo de cargo.</p>}
      {typePosition && (
        <DataTable
          columns={columns}
          data={typePosition}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};
