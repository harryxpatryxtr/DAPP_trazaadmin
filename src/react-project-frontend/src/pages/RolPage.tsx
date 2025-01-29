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
import { useRoles } from "@/hooks/useRoles";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  codigo: string;
  rol: string;
  descripcion: string;
};
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
            <SelectItem value="Rol1">administrator</SelectItem>
            <SelectItem value="Rol2">operador</SelectItem>
            <SelectItem value="Rol3">auditor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* #TODO: Implementar el select multiple de permisos */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Permisos
        </Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Permiso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rol1">update administrator</SelectItem>
            <SelectItem value="Rol2">update operator</SelectItem>
            <SelectItem value="Rol3">query administrator</SelectItem>
            <SelectItem value="Rol4">query operator</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const ModalCreate = (setNewData: (data: any) => void) => {
  const {
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNewData(data);
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Codigo
        </Label>
        <Input className="col-span-3" id="name" placeholder="Codigo" />
        {errors.codigo && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Rol
        </Label>
        <Input className="col-span-3" id="name" placeholder="Rol" />
        {errors.rol && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Descripcion
        </Label>
        <Input className="col-span-3" id="name" placeholder="Descripcion" />
        {errors.descripcion && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="flex justify-center">
        <Button type="submit">Guardar</Button>
      </div>
    </form>
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
  const [data, setData] = useState<any>(null);
  const [newData, setNewData] = useState<Inputs | null>(null);
  const { roles, loading, error, fetchRoles, createRole } = useRoles();

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
  //   {
  //     id: 1,
  //     name: "name 1",
  //     rol: "rol 1",
  //     descripcion: "descripcion 1",
  //     permiso: "permiso 1",
  //     autor: "autor 1",
  //     estado: "estado 1"
  //   },
  //   {
  //     id: 2,
  //     name: "name 2",
  //     rol: "rol 2",
  //     descripcion: "descripcion 2",
  //     permiso: "permiso 2",
  //     autor: "autor 2",
  //     estado: "estado 2"
  //   },
  //   {
  //     id: 3,
  //     name: "name 3",
  //     rol: "rol 3",
  //     descripcion: "descripcion 3",
  //     permiso: "permiso 3",
  //     autor: "autor 3",
  //     estado: "estado 3"
  //   }
  // ];
  const headerActions = [
    <Modal
      trigger={<Button>Crear</Button>}
      data={ModalCreate(setNewData)}
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
  const handleCreateRole = () => {
    console.log(newData, "newData");
    if (newData) {
      createRole({
        user_created: "user222",
        rol: newData.rol || "",
        description_rol: newData.descripcion || "",
        update_date: new Date().toISOString(),
        id_group: "group1",
        state: "active",
        id_rol: "id_rol1",
        creation_date: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    if (newData) {
      handleCreateRole();
    }
  }, [newData]);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    console.log(roles, "roles");
    setData(
      roles.map((role) => ({
        id: role.id_rol,
        item: role.id_rol,
        rol: role.rol,
        descripcion: role.description_rol,
        autor: role.user_created,
        estado: role.state
      }))
    );
  }, [roles]);

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

export default RolPage;
