import Layout from "@/components/layout";
import { DataTable } from "../../";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { Modal } from "@/components/general/Modal";

const TypeUser = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const data = [
    {
      codigo: "123456",
      typeUser: "Lima",
      description: "123456",
      author: "123456",
      state: "Activo"
    }
  ];
  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} />}
      subTitle="Tipo de usuario"
      title="Nuevo"
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo Usuario</h1>
      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};

export default TypeUser;
