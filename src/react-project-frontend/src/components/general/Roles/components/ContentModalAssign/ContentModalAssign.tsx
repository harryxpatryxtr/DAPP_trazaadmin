import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";

export const ContentModalAssign = ({
  roles,
  permissions
}: {
  roles: any[];
  permissions: any[];
}) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  return (
    <div className="grid gap-4">
      <div className="grid grid-rows-2 items-center gap-1">
        <Label htmlFor="name" className="text-left">
          Rol
        </Label>
        <Select onValueChange={setSelectedRole}>
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

      {/* #TODO: Implementar el select multiple de permisos */}
      <div className="grid grid-rows-2 items-center gap-1">
        <Label htmlFor="name" className="text-left">
          Permisos
        </Label>
        <div className="flex">
          <MultiSelect
            options={permissions.map((permission) => ({
              label: permission.permissions,
              value: permission.id_permissions
            }))}
            className="col-span-3"
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
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
    </div>
  );
};
