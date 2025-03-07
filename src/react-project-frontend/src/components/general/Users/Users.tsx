import React, { useState } from "react";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";
import { Modal } from "@/components/general/Modal/Modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/general/DataTable/DataTable";
import Layout from "@/components/layout";
import { ContentModal, ContentModalUpdate } from "./components";
import { useColumns } from "./hooks/useColumns";

export const Users = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { user, loading, error, fetchUser, handleCreateUser } = useUser();
  const [newData, setNewData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const columns = useColumns(setNewData);
  useEffect(() => {
    fetchUser();
  }, []);
  const data = user;
  const headerActions = [
    <Modal
      trigger={<Button>Crear</Button>}
      data={<ContentModal setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Nuevo usuario"
      title="Nuevo"
      setOpen={() => setOpen(!open)}
      open={open}
    />
  ];

  useEffect(() => {
    if (newData) {
      handleCreateUser({
        ...newData,
        userCreated: userData.userCreated,
        creationDate: userData.creationDate || "",
        updateDate: userData.updateDate || "",
        idGroup: userData.idGroup || "",
        state: userData.state || "activo"
      });
      setOpen(false);
    }
  }, [newData]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Usuario Page</h1>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p>Error al cargar los usuarios.</p>}
      {data && (
        <DataTable
          columns={columns}
          data={data}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};
