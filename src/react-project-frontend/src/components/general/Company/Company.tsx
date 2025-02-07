import Layout from "@/components/layout";
import { DataTable, Modal, UbigeoSelect } from "..";
import { columns } from "./constants";
import { ModalCreate, ModalCannister } from "./components";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Company = () => {
  const [newData, setNewData] = useState(null);
  const data = [
    {
      codigo: "123456",
      empresa: "Lima",
      gln: "123456",
      canisterData: "123456",
      canisterAssets: "123456",
      ruc: "123456",
      estado: "Activo"
    },
    {
      codigo: "123456",
      empresa: "Lima",
      gln: "123456",
      canisterData: "123456",
      canisterAssets: "123456",
      ruc: "123456",
      estado: "Activo"
    }
  ];

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} />}
      subTitle="Nuevo ubigeo"
      title="Nuevo"
    />,
    <Modal
      trigger={<Button>Cannister</Button>}
      data={<ModalCannister setNewData={setNewData} />}
      subTitle="Nuevo Cannister"
      title="Cannister"
    />
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Ubigeo</h1>
      <UbigeoSelect />
      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};
