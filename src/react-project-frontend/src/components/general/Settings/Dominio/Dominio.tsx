import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { DataTable } from "../..";
import { Modal } from "../..";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "./hooks/useData";
import { useDomain } from "./hooks/UseDomain";
const Dominio = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const { domains, loading, error, fetchDomains, createDomain } = useDomain();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const user_created = userData.user_created;

  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    console.log(newData, "new data");
    if (newData) {
      createDomain({
        groupInformationDescription: newData.description,
        userUpdate: user_created,
        creationDate: "",
        state: newData.state || "active",
        idGroupInformation: newData.idGroupInformation || "",
        userCreated: user_created,
        groupInformationName: newData.dominio,
        updateDate: ""
      });
      setNewData(null);
    }
  }, [newData]);

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
