import { DataTable, Modal } from "@/components/general";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contentModal = (data: any) => {
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
          />
        );
      }
    }
  ];
  const data = [
    {
      id: 1,
      item: "Item 1",
      permiso: "Permiso 1",
      description: "Description 1",
      autor: "Autor 1",
      estado: "Estado 1"
    },
    {
      id: 2,
      item: "Item 2",
      permiso: "Permiso 2",
      description: "Description 2",
      autor: "Autor 2",
      estado: "Estado 2"
    },
    {
      id: 3,
      item: "Item 3",
      permiso: "Permiso 3",
      description: "Description 3",
      autor: "Autor 3",
      estado: "Estado 3"
    },
    {
      id: 4,
      item: "Item 4",
      permiso: "Permiso 4",
      description: "Description 4",
      autor: "Autor 4",
      estado: "Estado 4"
    }
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Permisos Page</h1>
      <DataTable columns={columns} data={data} />
    </Layout>
  );
};

export default PermisoPage;
