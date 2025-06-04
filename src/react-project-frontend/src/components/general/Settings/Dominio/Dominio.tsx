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
  const principalId = localStorage.getItem("token") || "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    console.log('init createDomain');
    if (newData) {
      console.log('newData', newData);
      createDomain({
        groupInformationDescription: newData.description,
        userUpdate: principalId,
        creationDate: "",
        state: newData.state || "active",
        idGroupInformation: newData.idGroupInformation || "",
        userCreated: principalId,
        groupInformationName: newData.dominio,
        updateDate: ""
      });
      setNewData(null);
    }
  }, [newData]);

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Crear nuevo dominio"
      title="Nuevo dominio"
      setOpen={() => setOpen(!open)}
      open={open}
    />
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Pagina Dominio</h1>
      {loading && <p>Cargando dominios...</p>}
      {error && <p>Error al cargar los permisos.</p>}
      {domains && (
        <DataTable
          columns={columns}
          data={domains}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};

export default Dominio;
