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
        userCreated: userData.userCreated,
        rol: newData.rol || "",
        descriptionRol: newData.descripcion || "",
        updateDate: "",
        state: "active",
        idRol: id_rol,
        creationDate: ""
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
        id: role.idRol,
        item: role.idRol,
        rol: role.rol,
        descripcion: role.descriptionRol,
        autor: userData.username,
        estado: role.state
      }))
    );
  }, [roles]);

  useEffect(() => {
    setDataPermissions(
      permissions.map((permission) => ({
        id: permission.idPermissions,
        item: permission.idPermissions,
        permiso: permission.permissions,
        descripcion: permission.descriptionPermissions,
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
