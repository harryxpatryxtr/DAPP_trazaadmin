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
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
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
      data={<ModalCreate setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Crear nuevo dominio"
      title="Nuevo dominio"
      setOpen={() => setOpen(!open)}
      open={open}
    />
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Dominio</h1>
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
