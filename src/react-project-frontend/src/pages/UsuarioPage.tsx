import Layout from "@/components/layout";
import { DataTable } from "@/components/general/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal/Modal";

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
    }
  ];
  const headerActions = [
    <Modal
      trigger={<Button>Crear</Button>}
      data={() => {}}
      subTitle="Nuevo rol"
      title="Nuevo"
    />,
    <Modal
      trigger={<Button>Asignar</Button>}
      data={() => {}}
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
