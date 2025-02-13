import { DataTable } from "@/components/general/DataTable";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { Modal } from "../../Modal";
import Layout from "@/components/layout";

export const TypePosition = () => {
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
      subTitle="Nuevo tipo de cargo"
      title="Nuevo"
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo de Cargo</h1>
      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};
