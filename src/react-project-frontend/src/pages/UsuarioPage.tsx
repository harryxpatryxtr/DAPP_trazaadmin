import Layout from "@/components/layout";
import { DataTable } from "@/components/general/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ModalCreate = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Codigo
        </Label>
        <Input className="col-span-3" id="name" placeholder="Codigo" />
      </div>
    </div>
  );
};

const ModalAssign = () => {
  return <div>ModalAssign</div>;
};

const ModalEdit = () => {
  return <div>ModalEdit</div>;
};

const UsuarioPage = () => {
  const columns = [
    {
      header: "item",
      accessorKey: "name"
    },
    {
      header: "Usuario",
      accessorKey: "usuario"
    },
    {
      header: "Funcion",
      accessorKey: "funcion"
    },
    {
      header: "Correo",
      accessorKey: "correo"
    },
    {
      header: "Rol",
      accessorKey: "rol"
    },
    {
      header: "Estado",
      accessorKey: "estado"
    },
    {
      header: "actions",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => {
        return <Button>Editar</Button>;
      }
    }
  ];
  const data = [
    {
      id: 1,
      name: "name 1",
      usuario: "usuario 1",
      funcion: "funcion 1",
      correo: "correo 1",
      rol: "rol 1",
      estado: "estado 1"
    },
    {
      id: 2,
      name: "name 2",
      usuario: "usuario 2",
      funcion: "funcion 2",
      correo: "correo 2",
      rol: "rol 2",
      estado: "estado 2"
    },
    {
      id: 3,
      name: "name 3",
      usuario: "usuario 3",
      funcion: "funcion 3",
      correo: "correo 3",
      rol: "rol 3",
      estado: "estado 3"
    }
  ];
  const headerActions = [
    <Modal
      trigger={<Button>Crear</Button>}
      data={ModalCreate()}
      subTitle="Nuevo rol"
      title="Nuevo"
    />,
    <Modal
      trigger={<Button>Asignar</Button>}
      data={ModalAssign()}
      subTitle="Asignar rol"
      title="Asignar"
    />
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Usuario Page</h1>
      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};

export default UsuarioPage;
