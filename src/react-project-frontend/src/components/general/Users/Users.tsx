import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { Modal } from "@/components/general/Modal/Modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/general/DataTable/DataTable";
import Layout from "@/components/layout";
import {
  ContentModal,
  ContentModalAssign,
  ContentModalUpdate
} from "./components";

export const Users = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { user, loading, error, fetchUser, handleCreateUser } = useUser();
  const [newData, setNewData] = useState<any>(null);
  const [dataAssign, setDataAssign] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);
  const columns = [
    {
      header: "item",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        return <p>{row.index + 1}</p>;
      }
    },
    {
      header: "Codigo",
      accessorKey: "codigo"
    },
    {
      header: "Usuario",
      accessorKey: "name"
    },
    {
      header: "Funcion",
      accessorKey: "funcion"
    },
    {
      header: "Correo",
      accessorKey: "email"
    },
    {
      header: "Rol",
      accessorKey: "rol"
    },
    {
      header: "Estado",
      accessorKey: "state"
    },
    {
      header: "actions",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => {
        return (
          <Modal
            trigger={<Button>Editar</Button>}
            data={<ContentModalUpdate data={row.original} />}
            subTitle="Editar el usuario"
            title="Editar"
          />
        );
      }
    }
  ];
  const data = user;
  const headerActions = [
    <Modal
      trigger={<Button>Crear</Button>}
      data={<ContentModal setNewData={setNewData} />}
      subTitle="Nuevo usuario"
      title="Nuevo"
      setOpen={() => setOpen(true)}
      open={open}
    />,
    <Modal
      trigger={<Button>Asignar</Button>}
      data={<ContentModalAssign setDataAssign={setDataAssign} />}
      subTitle="Asignar usuario"
      title="Asignar"
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
      <h1 className="text-3xl font-bold underline">Usuario Page</h1>

      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};
