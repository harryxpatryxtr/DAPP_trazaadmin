import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useRoles } from "@/hooks/useRoles";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  rol: string;
  descripcion: string;
};

export const ContentModalAssign = ({
  setDataAssign
}: {
  setDataAssign: (data: any) => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string>();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { roles, loading, error, fetchRoles, createRole } = useRoles();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const {
    user,
    loading: loadingUsers,
    error: errorUsers,
    fetchUser,
    handleAssignUser
  } = useUser();

  const onSubmit: SubmitHandler<Inputs> = () => {
    const id_rol_user = Math.random().toString(36).substring(2, 15);
    handleAssignUser({
      user_created: userData.user_created,
      id_user: selectedUsers,
      id_rol: selectedRole.toString(),
      id_group: "",
      state: "active",
      id_rol_user: id_rol_user,
      creation_date: "",
      update_date: ""
    });
  };

  useEffect(() => {
    fetchRoles();
    fetchUser();
  }, []);
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-rows-2 items-center gap-1">
        <Label htmlFor="name" className="text-left">
          Usuarios
        </Label>
        <Select onValueChange={setSelectedUsers}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Usuarios" />
          </SelectTrigger>
          <SelectContent>
            {user.map((user) => (
              <SelectItem value={user.name}>{user.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-rows-2 items-center gap-1">
        <Label htmlFor="name" className="text-left">
          Rol
        </Label>
        <div className="flex">
          <MultiSelect
            options={roles.map((role) => ({
              label: role.rol,
              value: role.rol
            }))}
            onValueChange={setSelectedRole}
            defaultValue={selectedRole}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
          />
        </div>
      </div>
      <div>
        <Button type="submit">Asignar</Button>
      </div>
    </form>
  );
};
