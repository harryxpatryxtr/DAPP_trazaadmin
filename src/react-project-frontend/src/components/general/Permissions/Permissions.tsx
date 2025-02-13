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
    const id_permissions = Math.random().toString(36).substring(2, 15);
    if (!userData) {
      return;
    }
    const user_created = userData.user_created;
    if (!newData) {
      return;
    }
    if (!user_created) {
      return;
    }
    createPermission({
      userCreated: user_created,
      permissions: newData.permiso,
      descriptionPermissions: newData.descripcion,
      updateDate: "",
      state: newData.estado || "active",
      idPermissions: newData.id || id_permissions,
      creationDate: ""
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
      id: "codigo",
      header: "Código",
      accessorKey: "codigo"
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
    if (newData) {
      handleCreatePermission();
      setOpen(false);
    }
  }, [newData]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    setData(
      permissions.map((permission) => ({
        item: permission.idPermissions,
        permiso: permission.permissions,
        description: permission.descriptionPermissions,
        codigo: permission.idPermissions,
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
