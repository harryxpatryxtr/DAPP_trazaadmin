import React from "react";
import Layout from "@/components/layout";
import { DataTable } from "../../";
// import { useColumns } from "./hooks/useColumns";
// import { useNewData } from "./hooks/useData";
const TypeDocument = () => {
  // const { newData, setNewData } = useNewData(null);
  // const columns = useColumns(setNewData);
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Tipo de Documento</h1>
      {/* <DataTable columns={columns} data={data} headerActions={headerActions} /> */}
    </Layout>
  );
};

export default TypeDocument;
