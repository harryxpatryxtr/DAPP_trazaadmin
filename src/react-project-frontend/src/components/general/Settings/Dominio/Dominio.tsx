import { useState } from "react";
import Layout from "@/components/layout";
import { DataTable } from "../..";
import { Modal } from "../..";
import { Button } from "@/components/ui/button";
import { ModalCreate, ModalUpdate } from "./components";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "./hooks/useData";
const Dominio = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);

  const data = [
    {
      codigo: "123456",
      dominio: "Lima",
      descripcion: "123456",
      author: "123456",
      estado: "Activo"
    },
    {
      codigo: "123456",
      dominio: "Lima",
      descripcion: "123456",
      author: "123456",
      estado: "Activo"
    }
  ];

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} />}
      subTitle="Nuevo dominio"
      title="Nuevo"
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Dominio</h1>
      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};

export default Dominio;
