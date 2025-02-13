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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ModalUpdateProps = {
  setNewData: (data: any) => void;
};

type Inputs = {
  codigo: string;
  dominio: string;
  descripcion: string;
};

export const ModalUpdate = ({ setNewData }: ModalUpdateProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<any> = (data) => {
    setNewData(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Codigo
          </Label>
          <p>01</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Dominio
          </Label>
          <p>Administrador</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Descripcion
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("descripcion", { required: true })}
          />
          {errors.descripcion && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Estado
          </Label>
          <Select onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Actualizar</Button>
      </form>
    </div>
  );
};
