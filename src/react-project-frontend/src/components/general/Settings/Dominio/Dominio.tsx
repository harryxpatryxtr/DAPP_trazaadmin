import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { DataTable } from "../..";
import { Modal } from "../..";
import { Button } from "@/components/ui/button";
import { ModalCreate, ModalUpdate } from "./components";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "./hooks/useData";
import { useDomain } from "./hooks/UseDomain";
const Dominio = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const { domains, loading, error, fetchDomains } = useDomain();

  useEffect(() => {
    fetchDomains();
  }, []);

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} />}
      subTitle="Crear nuevo dominio"
      title="Nuevo dominio"
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Dominio</h1>
      <DataTable
        columns={columns}
        data={domains}
        headerActions={headerActions}
      />
    </Layout>
  );
};

export default Dominio;
