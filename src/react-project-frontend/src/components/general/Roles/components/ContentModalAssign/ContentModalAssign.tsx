import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  idRol: string;
  permissions: string[];
};

export const ContentModalAssign = ({
  roles,
  permissions,
  setDataAssign
}: {
  roles: any[];
  permissions: any[];
  setDataAssign: (data: any) => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  const handleChangeRole = (value: string) => {
    setValue("idRol", value);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setDataAssign({
      idRol: data.idRol,
      permissions: data.permissions
    });
  };
  useEffect(() => {
    setValue("permissions", selectedFrameworks);
  }, [selectedFrameworks]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-rows-2 items-center gap-1">
          <Label htmlFor="name" className="text-left">
            Rol
          </Label>
          <Select onValueChange={handleChangeRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem value={role.rol}>{role.rol}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-rows-2 items-center gap-1">
          <Label htmlFor="name" className="text-left">
            Permisos
          </Label>
          <div className="flex">
            <MultiSelect
              options={permissions.map((permission) => ({
                label: permission.permissions,
                value: permission.idPermissions
              }))}
              className="col-span-3"
              onValueChange={setSelectedFrameworks}
              defaultValue={[]}
              placeholder="Selecionar permisos"
              animation={2}
              maxCount={3}
            />
          </div>
        </div>

        <div>
          <Button type="submit">Asignar</Button>
        </div>
      </form>
    </div>
  );
};
