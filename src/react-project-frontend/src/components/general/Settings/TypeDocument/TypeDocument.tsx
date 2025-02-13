import Layout from "@/components/layout";
import { DataTable, Modal } from "../../";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";

const TypeDocument = () => {
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
      subTitle="Nuevo dominio"
      title="Nuevo"
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo de Documento</h1>
      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};

export default TypeDocument;
