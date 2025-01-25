import { DataTable, Modal } from "@/components/general";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePermissions } from "@/hooks/usePermissions";
import { useEffect, useState } from "react";

const contentModal = (data: any) => {
  if (!data) return null;
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Permiso
        </Label>
        <Input id="name" defaultValue={data.permiso} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Descripción
        </Label>
        <Input
          id="username"
          defaultValue={data.description}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Autor
        </Label>
        <Input id="username" defaultValue={data.autor} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Estado
        </Label>
        <Input
          id="username"
          defaultValue={data.estado}
          className="col-span-3"
        />
      </div>
    </div>
  );
};

const PermisoPage = () => {
  const [data, setData] = useState<any>(null);
  const { permissions, loading, error, fetchPermissions, createPermission } =
    usePermissions();

  const handleCreatePermission = () => {
    console.log(data, "data");
    createPermission({
      user_created: "user222",
      permissions: data.permiso,
      description_permissions: data.description,
      update_date: "2023-01-01",
      id_group: "group1",
      state: "active",
      id_permissions: "003",
      creation_date: "2023-01-01"
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
            data={contentModal(row.original)}
            subTitle="Editar el permiso"
            title="Editar"
            handleSubmit={handleCreatePermission}
          />
        );
      }
    }
  ];

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={contentModal(data)}
      subTitle="Nuevo permiso"
      title="Nuevo"
      handleSubmit={handleCreatePermission}
    />
  ];

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

export default PermisoPage;
