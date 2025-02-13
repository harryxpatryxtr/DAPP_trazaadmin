import { useEffect, useState } from "react";
import { useRoles } from "@/hooks/useRoles";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal/Modal";
import { DataTable } from "@/components/general/DataTable/DataTable";
import { ContentModal } from "./components/ContentModal";
import { ContentModalUpdate } from "./components/ContentModalUpdate";
import Layout from "@/components/layout";
import { ContentModalAssign } from "./components/ContentModalAssign";
import { usePermissions } from "@/hooks/usePermissions";

type Inputs = {
  codigo: string;
  rol: string;
  descripcion: string;
};

export const Roles = () => {
  const [data, setData] = useState<any>(null);
  const [dataPermissions, setDataPermissions] = useState<any>(null);
  const [newData, setNewData] = useState<Inputs | null>(null);
  const { roles, loading, error, fetchRoles, createRole } = useRoles();
  const {
    permissions,
    loading: loadingPermissions,
    error: errorPermissions,
    fetchPermissions,
    createPermission
  } = usePermissions();
  const [open, setOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const columns = [
    {
      header: "item",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        return <p>{row.index + 1}</p>;
      }
    },
    {
      header: "rol",
      accessorKey: "rol"
    },
    {
      header: "descripcion",
      accessorKey: "descripcion"
    },
    {
      header: "permiso",
      accessorKey: "permiso"
    },
    {
      header: "autor",
      accessorKey: "autor"
    },
    {
      header: "estado",
      accessorKey: "estado"
    },
    {
      header: "actions",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => {
        return (
          <Modal
            trigger={<Button>Editar</Button>}
            data={<ContentModalUpdate data={row.original} />}
            subTitle="Editar el permiso"
            title="Editar"
          />
        );
      }
    }
  ];

  const headerActions = [
    <Modal
      trigger={<Button>Crear</Button>}
      data={<ContentModal setNewData={setNewData} />}
      subTitle="Nuevo rol"
      title="Nuevo"
      setOpen={() => setOpen(true)}
      open={open}
    />,
    <Modal
      trigger={<Button>Asignar</Button>}
      data={<ContentModalAssign roles={roles} permissions={permissions} />}
      subTitle="Asignar rol"
      title="Asignar"
    />
  ];

  const handleCreateRole = () => {
    if (newData) {
      const id_rol = Math.random().toString(36).substring(2, 15);
      createRole({
        user_created: userData.user_created,
        rol: newData.rol || "",
        description_rol: newData.descripcion || "",
        update_date: "",
        state: "active",
        id_rol: id_rol,
        creation_date: ""
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (newData) {
      handleCreateRole();
    }
  }, [newData]);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  useEffect(() => {
    setData(
      roles.map((role) => ({
        id: role.id_rol,
        item: role.id_rol,
        rol: role.rol,
        descripcion: role.description_rol,
        autor: userData.username,
        estado: role.state
      }))
    );
  }, [roles]);

  useEffect(() => {
    setDataPermissions(
      permissions.map((permission) => ({
        id: permission.id_permissions,
        item: permission.id_permissions,
        permiso: permission.permissions,
        descripcion: permission.description_permissions,
        autor: userData.username,
        estado: permission.state
      }))
    );
  }, [permissions]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Roles Page</h1>
      {loading && <p>Cargando roles...</p>}
      {error && <p>Error al cargar los roles.</p>}
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
