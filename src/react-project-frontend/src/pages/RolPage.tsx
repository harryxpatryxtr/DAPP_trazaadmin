import { DataTable } from "@/components/general/DataTable/DataTable";
import { Modal } from "@/components/general/Modal/Modal";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { react_project_backend } from "../../../declarations/react-project-backend";

react_project_backend.readAllRoles().then((greeting: any) => {
   console.log(greeting, "greeting");
 });

const ModalAssign = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Rol
        </Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rol1">Rol 1</SelectItem>
            <SelectItem value="Rol2">Rol 2</SelectItem>
            <SelectItem value="Rol3">Rol 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const ModalCreate = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Codigo
        </Label>
        <Input className="col-span-3" id="name" placeholder="Codigo" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Rol
        </Label>
        <Input className="col-span-3" id="name" placeholder="Rol" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Descripcion
        </Label>
        <Input className="col-span-3" id="name" placeholder="Descripcion" />
      </div>
    </div>
  );
};

const ModalEdit = (data: any) => {
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
          defaultValue={data.codigo}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Rol
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Rol"
          defaultValue={data.rol}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Descripcion
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Descripcion"
          defaultValue={data.descripcion}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Estado
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Estado"
          defaultValue={data.estado}
        />
      </div>
    </div>
  );
};

const RolPage = () => {
  const dataRol = [
    {
      rol: "e0s7ok",
      user_created: "8lrexc",
      description_rol: "qhh34r",
      update_date: "f7q90k5",
      id_group: "5q8e1on",
      state: "cl0kyhi",
      id_rol: "m3w9hzj",
      creation_date: "3s15vml"
    },
    {
      rol: "03k4iz",
      user_created: "f48dbo",
      description_rol: "6ahcjrh",
      update_date: "5olcmn9",
      id_group: "229f3fc",
      state: "sb4k0c",
      id_rol: "sy2vdqq",
      creation_date: "ljytap"
    },
    {
      rol: "5vls5zn",
      user_created: "utg0ugo",
      description_rol: "j7672sq",
      update_date: "xm4xp73",
      id_group: "swor5bk",
      state: "0uu13mi",
      id_rol: "42zen5",
      creation_date: "lba1prg"
    }
  ];
  // react_project_backend.readAllRoles
  const columns = [
    {
      header: "item",
      accessorKey: "name"
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
            data={ModalEdit(row.original)}
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
      name: "name 1",
      rol: "rol 1",
      descripcion: "descripcion 1",
      permiso: "permiso 1",
      autor: "autor 1",
      estado: "estado 1"
    },
    {
      id: 2,
      name: "name 2",
      rol: "rol 2",
      descripcion: "descripcion 2",
      permiso: "permiso 2",
      autor: "autor 2",
      estado: "estado 2"
    },
    {
      id: 3,
      name: "name 3",
      rol: "rol 3",
      descripcion: "descripcion 3",
      permiso: "permiso 3",
      autor: "autor 3",
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
      <h1 className="text-3xl font-bold underline">Roles Page</h1>
      <DataTable columns={columns} data={data} headerActions={headerActions} />
    </Layout>
  );
};

export default RolPage;
