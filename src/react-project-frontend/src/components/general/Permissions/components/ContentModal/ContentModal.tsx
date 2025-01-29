import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";

type Inputs = {
  estado: string;
  permiso: string;
  descripcion: string;
  autor: string;
};

export const ContentModal = (setNewData: (data: any) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNewData(data);
  };
  return (
    <div>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Permiso
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("permiso", { required: true })}
          />
          {errors.permiso && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Descripción
          </Label>
          <Input
            id="username"
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

        <div>
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </div>
  );
};
