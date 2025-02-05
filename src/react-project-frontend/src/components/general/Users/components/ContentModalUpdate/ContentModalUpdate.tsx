import { DropDownTypeUsers } from "@/components/general/DropDownTypeUsers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Inputs } from "./types";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { DropDownTypeFunction } from "@/components/general/DropDownTypeFunction";

export const ContentModalUpdate = ({ data }: { data: any }) => {
  const {
    register,

    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  console.log(data, "dat int");
  // return null;
  return (
    <form className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Codigo
        </Label>
        <span>{data.codigo}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Tipo de Documento
        </Label>
        <span>{data.idTypeDocument}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Numero de Documento
        </Label>
        <span>{data.nroDocument}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <span className="col-span-3">{data.name}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Funcion
        </Label>
        <DropDownTypeFunction setSelectTypeFunction={() => {}} />
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
        {/* <Input
          className="col-span-3"
          id="name"
          placeholder="Foto"
          {...register("photo_user", { required: true })}
        />

        {errors.photo_user && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )} */}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Correo
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Correo"
          defaultValue={data.email}
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
          defaultValue={data.user}
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
          defaultValue={data.password}
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
