import { DataTable, Modal } from "@/components/general";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePermissions } from "@/hooks/usePermissions";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ContentModal } from "./components";
import { ContentModalUpdate } from "./components";

type Inputs = {
  estado: string;
  permiso: string;
  descripcion: string;
  autor: string;
};

export const Permissions = () => {
  const [data, setData] = useState<any>(null);
  const [newData, setNewData] = useState<Inputs | null>(null);
  const [open, setOpen] = useState(false);
  const { permissions, loading, error, fetchPermissions, createPermission } =
    usePermissions();

  const handleCreatePermission = () => {
    const id_permissions = Math.random().toString(36).substring(2, 15);
    if (newData) {
      createPermission({
        user_created: "user222",
        permissions: newData.permiso,
        description_permissions: newData.descripcion,
        update_date: new Date().toISOString(),
        id_group: "group1",
        state: "active",
        id_permissions: id_permissions,
        creation_date: new Date().toISOString()
      });
      setOpen(false);
    }
  };

  const handleUpdatePermission = (item: any) => {
    console.log(item, "item update");
    createPermission({
      user_created: "user222",
      permissions: "permiso",
      description_permissions: "descripcion 333",
      update_date: new Date().toISOString(),
      id_group: "group1",
      state: "inactive",
      id_permissions: item.id,
      creation_date: new Date().toISOString()
    });
  };

  const columns = [
    {
      id: "item",
      header: "Item",
      accessorKey: "item"
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
            data={ContentModalUpdate(row.original, setNewData)}
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
      data={ContentModal(setNewData)}
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
        id: permission.id_permissions,
        item: permission.id_permissions,
        permiso: permission.permissions,
        description: permission.description_permissions,
        autor: permission.user_created,
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
