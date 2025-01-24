import Layout from "@/components/layout";
import { DataTable } from "@/components/general/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const ModalCreate = (data?: any) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Codigo
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Codigo"
          defaultValue={data?.codigo}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Tipo de usuario
        </Label>
        <Select>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecciona un tipo de usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user1">User 1</SelectItem>
            <SelectItem value="user2">User 2</SelectItem>
            <SelectItem value="user3">User 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Tipo de Documento
        </Label>
        <Select>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecciona un tipo de documento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="doc1">Doc 1</SelectItem>
            <SelectItem value="doc2">Doc 2</SelectItem>
            <SelectItem value="doc3">Doc 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Numero de Documento
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Numero de Documento"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <Input className="col-span-3" id="name" placeholder="Nombre" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Apellido Paterno
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Apellido Paterno"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Apellido Materno
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Apellido Materno"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Foto
        </Label>
        <Input className="col-span-3" id="name" placeholder="Foto" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Correo
        </Label>
        <Input className="col-span-3" id="name" placeholder="Correo" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Usuario
        </Label>
        <Input className="col-span-3" id="name" placeholder="Usuario" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Contraseña
        </Label>
        <Input className="col-span-3" id="name" placeholder="Contraseña" />
      </div>
    </div>
  );
};

const ModalAssign = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Rol
        </Label>
        <Select>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rol1">Rol 1</SelectItem>
            <SelectItem value="rol2">Rol 2</SelectItem>
            <SelectItem value="rol3">Rol 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
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
        return (
          <Modal
            trigger={<Button>Editar</Button>}
            data={ModalCreate(row)}
            subTitle="Editar el usuario"
            title="Editar"
          />
        );
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
      subTitle="Nuevo usuario"
      title="Nuevo"
    />,
    <Modal
      trigger={<Button>Asignar</Button>}
      data={ModalAssign()}
      subTitle="Asignar usuario"
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
