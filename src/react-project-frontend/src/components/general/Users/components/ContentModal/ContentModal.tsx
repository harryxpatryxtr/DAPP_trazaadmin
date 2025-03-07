import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { DropDownTypeDocument, DropDownTypeUsers } from "@/components/general";
import { Inputs } from "./types";
export const ContentModal = ({
  setNewData,
  setOpen
}: {
  setNewData: (data: any) => void;
  setOpen: (open: boolean) => void;
}) => {
  const [selectTypeUser, setSelectTypeUser] = useState<string>("");
  const [selectTypeDocument, setSelectTypeDocument] = useState<string>("");
  const [selectTypeFunction, setSelectTypeFunction] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNewData({
      ...data,
      id_type_user: selectTypeUser,
      id_type_document: selectTypeDocument
      // id_type_function: selectTypeFunction
    });
    setOpen(false);
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Codigo
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Codigo"
          {...register("id_user", { required: true })}
        />
        {errors.id_user && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <DropDownTypeUsers setSelectTypeUser={setSelectTypeUser} />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Tipo de Documento
        </Label>
        <DropDownTypeDocument setSelectTypeDocument={setSelectTypeDocument} />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Numero de Documento
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Numero de Documento"
          {...register("nro_document", { required: true })}
        />

        {errors.nro_document && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Nombre"
          {...register("name", { required: true })}
        />

        {errors.name && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Apellido Paterno
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Apellido Paterno"
          {...register("paternal_surname", { required: true })}
        />

        {errors.paternal_surname && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Apellido Materno
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Apellido Materno"
          {...register("maternal_surname", { required: true })}
        />

        {errors.maternal_surname && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Foto
        </Label>
        {/* <Input
          className="col-span-3"
          id="name"
          placeholder="Foto"
          type="file"
          {...register("photo_user", { required: true })}
        /> */}
        <Input
          className="col-span-3"
          id="name"
          placeholder="Foto"
          {...register("photo_user", { required: true })}
        />

        {errors.photo_user && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Correo
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Correo"
          {...register("email", { required: true })}
        />

        {errors.email && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Usuario
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Usuario"
          {...register("user", { required: true })}
        />

        {errors.user && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Contraseña
        </Label>
        <Input
          type="password"
          className="col-span-3"
          id="name"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />

        {errors.password && (
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
