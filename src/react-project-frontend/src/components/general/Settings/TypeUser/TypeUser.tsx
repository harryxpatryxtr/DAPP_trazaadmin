import Layout from "@/components/layout";
import { DataTable } from "../../";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { Modal } from "@/components/general/Modal";
import { useTypeUser } from "./hooks/UseTypeUser";
import { useEffect, useState } from "react";

const TypeUser = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const { typeUser, fetchTypeUser, loading, error, createTypeUser } =
    useTypeUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTypeUser();
  }, []);

  useEffect(() => {
    if (newData) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const user_created = userData.user_created;
      createTypeUser({
        idTypeUser: newData.idTypeUser || "",
        typeUser: newData.typeUser,
        descriptionTypeUser: newData.description,
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
      subTitle="Crear nuevo tipo de usuario"
      title="Nuevo tipo de usuario"
      setOpen={() => setOpen(!open)}
      open={open}
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo Usuario</h1>
      {loading && <p>Cargando tipo de usuario...</p>}
      {error && <p>Error al cargar el tipo de usuario.</p>}
      {typeUser && (
        <DataTable
          columns={columns}
          data={typeUser}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};

export default TypeUser;
