import Layout from "@/components/layout";
import { DataTable } from "../../";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { Modal } from "@/components/general/Modal";
import { useTypeUser } from "./hooks/UseTypeUser";
import { useEffect } from "react";

const TypeUser = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const { typeUser, fetchTypeUser } = useTypeUser();

  useEffect(() => {
    fetchTypeUser();
  }, []);
  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} />}
      subTitle="Crear nuevo tipo de usuario"
      title="Nuevo tipo de usuario"
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo Usuario</h1>
      <DataTable
        columns={columns}
        data={typeUser}
        headerActions={headerActions}
      />
    </Layout>
  );
};

export default TypeUser;
