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
        maternal_surname: newData.maternal_surname,
        password: newData.password,
        name: newData.name,
        user: newData.user,
        idTypeDocument: newData.id_type_document,
        email: newData.email,
        paternal_surname: newData.paternal_surname,
        creationDate: "",
        state: newData.state || "active",
        idUser: newData.id_user || "",
        userCreated: userData.user_created,
        idTypeUser: newData.id_type_user || "",
        photo_user: newData.photo_user || "",
        nroDocument: newData.nro_document || "",
        updateDate: "",
        phoneNumber: newData.celular || ""
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
