import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  codigo: string;
  empresa: string;
  gln: string;
  canisterData: string;
  canisterAssets: string;
  ruc: string;
  direccion: string;
  localizacion: string;
  correo: string;
  celular: string;
  website: string;
  logo: string;
};
export const ModalCreate = ({ setNewData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    setNewData(data);
  };
  return (
    <div>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            GLN
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("gln", { required: true })}
          />
          {errors.gln && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            RUC
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("ruc", { required: true })}
          />
          {errors.ruc && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Direccion
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("direccion", { required: true })}
          />
          {errors.direccion && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Localizacion
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("localizacion", { required: true })}
          />

          {errors.localizacion && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Correo
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("correo", { required: true })}
          />
          {errors.correo && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Celular
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("celular", { required: true })}
          />
          {errors.celular && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Website
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("website", { required: true })}
          />
          {errors.website && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Logo
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("logo", { required: true })}
          />
          {errors.logo && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>

        <Button type="submit">Crear</Button>
      </form>
    </div>
  );
};
