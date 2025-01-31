import { DataTable, Modal } from "@/components/general";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/usePermissions";
import { useEffect, useState } from "react";
import { ContentModal } from "./components";
import { ContentModalUpdate } from "./components";

type Inputs = {
  estado: string;
  permiso: string;
  descripcion: string;
  id?: string;
};

export const Permissions = () => {
  const [data, setData] = useState<any>(null);
  const [newData, setNewData] = useState<Inputs | null>(null);
  const [open, setOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { permissions, loading, error, fetchPermissions, createPermission } =
    usePermissions();

  const handleCreatePermission = () => {
    console.log(newData, "newData comp");
    const id_permissions = Math.random().toString(36).substring(2, 15);
    if (!userData) {
      console.log("no userData");
      return;
    }
    const user_created = userData.user_created;
    if (!newData) {
      console.log("no newData");
      return;
    }
    if (!user_created) {
      return;
    }
    createPermission({
      user_created: user_created,
      permissions: newData.permiso,
      description_permissions: newData.descripcion,
      update_date: "",
      id_group: "",
      state: newData.estado || "active",
      id_permissions: newData.id || id_permissions,
      creation_date: ""
    });
    setOpen(false);
  };

  const columns = [
    {
      id: "item",
      header: "Item",
      accessorKey: "item",
      cell: ({ row }: { row: any }) => {
        return <p>{row.index + 1}</p>;
      }
    },
    {
      id: "permiso",
      header: "Permiso",
      accessorKey: "permiso"
    },
    {
      id: "description",
      header: "Descripción",
      accessorKey: "description"
    },
    {
      id: "autor",
      header: "Autor",
      accessorKey: "autor"
    },
    {
      id: "estado",
      header: "Estado",
      accessorKey: "estado"
    },
    {
      id: "actions",
      header: "Acciones",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => {
        return (
          <Modal
            trigger={<Button>Editar</Button>}
            data={
              <ContentModalUpdate data={row.original} setNewData={setNewData} />
            }
            subTitle="Editar el permiso"
            title="Editar"
          />
        );
      }
    }
  ];

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ContentModal setNewData={setNewData} />}
      subTitle="Nuevo permiso"
      title="Nuevo"
      setOpen={() => setOpen(true)}
      open={open}
    />
  ];

  useEffect(() => {
    console.log(newData, "newData1");
    if (newData) {
      handleCreatePermission();
      setOpen(false);
    }
  }, [newData]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    console.log(permissions, "permissions");
    setData(
      permissions.map((permission) => ({
        item: permission.id_permissions,
        permiso: permission.permissions,
        description: permission.description_permissions,
        autor: userData.username,
        estado: permission.state
      }))
    );
  }, [permissions]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Pagina Permisos</h1>
      {loading && <p>Cargando permisos...</p>}
      {error && <p>Error al cargar los permisos.</p>}
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
