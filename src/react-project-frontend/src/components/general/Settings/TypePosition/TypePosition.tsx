import { DataTable } from "@/components/general/DataTable";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Dominio/hooks/useData";
import { Button } from "@/components/ui/button";
import { ModalCreate } from "./components";
import { Modal } from "../../Modal";
import Layout from "@/components/layout";
import { useTypePosition } from "./hooks/useTypePosition";
import { useEffect } from "react";

export const TypePosition = () => {
  const { newData, setNewData } = useNewData(null);
  const columns = useColumns(setNewData);
  const { typePosition, loading, error, fetchTypePosition } = useTypePosition();

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ModalCreate setNewData={setNewData} />}
      subTitle="Nuevo tipo de cargo"
      title="Nuevo"
    />
  ];

  useEffect(() => {
    fetchTypePosition();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo de Cargo</h1>
      <DataTable
        columns={columns}
        data={typePosition}
        headerActions={headerActions}
      />
    </Layout>
  );
};
