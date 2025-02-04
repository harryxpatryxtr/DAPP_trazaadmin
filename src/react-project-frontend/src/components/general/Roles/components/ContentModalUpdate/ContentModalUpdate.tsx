import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export const ContentModalUpdate = ({ data }: { data: any }) => {
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
