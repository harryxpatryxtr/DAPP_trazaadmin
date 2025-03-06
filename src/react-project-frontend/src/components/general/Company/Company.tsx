import Layout from "@/components/layout";
import { DataTable, Modal, UbigeoSelect } from "..";
import { ModalCreate, ModalCannister } from "./components";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNewData } from "../Settings/Dominio/hooks/useData";

import { useCompany } from "./hooks/useCompany";
import { useColumns } from "./hooks/use-columns";

export const Company = () => {
  const { newData, setNewData } = useNewData(null);
  const [newDataCannister, setNewDataCannister] = useState<any>(null);
  const columns = useColumns(setNewData);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const user_created = userData.user_created;
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const {
    companies,
    loading,
    error,
    fetchCompanies,
    createCompany,
    uploadFile
  } = useCompany();

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (newData) {
      console.log(newData, "newData");
      createCompany({
        ...newData,
        idCanisterData: "",
        idCanisterAssets: "",
        idParentCompany: "",
        updateDate: "",
        userCreated: user_created,
        userUpdate: user_created,
        creationDate: "",
        state: newData.state || "active"
      });
      setNewData(null);
    }
  }, [newData]);

  useEffect(() => {
    if (newDataCannister) {
      console.log(newDataCannister, "newDataCannister");
      uploadFile(newDataCannister.wasmFile, newDataCannister.idCannisterData);
    }
  }, [newDataCannister]);

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Nuevo ubigeo"
      title="Nuevo"
      setOpen={() => setOpen(!open)}
      open={open}
    />,
    <Modal
      trigger={<Button>Actualizar</Button>}
      data={
        <ModalCannister
          setNewDataCannister={setNewDataCannister}
          setOpen={setOpenUpdate}
        />
      }
      subTitle="Actualizar Cannister"
      title="Archivo"
      setOpen={() => setOpenUpdate(!openUpdate)}
      open={openUpdate}
    />
  ];
  console.log(companies, "data companies");
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Empresas</h1>
      {/* <UbigeoSelect /> */}
      {loading && <p>Cargando empresas...</p>}
      {error && <p>Error al cargar las empresas.</p>}
      {companies && (
        <DataTable
          columns={columns}
          data={companies}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};
