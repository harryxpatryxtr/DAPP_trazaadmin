import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

type ModalCreateProps = {
  setNewData: (data: any) => void;
  setOpen: (open: boolean) => void;
};

type Inputs = {
  codigo: string;
  parentCompany: string;
  glnParentCompany: string;
  canisterData: string;
  canisterAssets: string;
  parentCompanyRuc: string;
  parentCompanyAddress: string;
  parentCompanyUbigeo: string;
  parentCompanyLocation: string;
  parentCompanyContactEmail: string;
  parentCompanyContactCellular: string;
  parentCompanyWeb: string;
  logo: string;
};

export const ModalCreate = ({ setNewData, setOpen }: ModalCreateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<any> = (data) => {
    setNewData(data);
    setOpen(false);
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
            {...register("glnParentCompany", { required: true })}
          />
          {errors.glnParentCompany && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Empresa
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("parentCompany", { required: true })}
          />
          {errors.parentCompany && (
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
            {...register("parentCompanyRuc", { required: true })}
          />
          {errors.parentCompanyRuc && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Ubigeo
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("parentCompanyUbigeo", { required: true })}
          />
          {errors.parentCompanyUbigeo && (
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
            {...register("parentCompanyAddress", { required: true })}
          />
          {errors.parentCompanyAddress && (
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
            {...register("parentCompanyLocation", { required: true })}
          />

          {errors.parentCompanyLocation && (
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
            {...register("parentCompanyContactEmail", { required: true })}
          />
          {errors.parentCompanyContactEmail && (
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
            {...register("parentCompanyContactCellular", { required: true })}
          />
          {errors.parentCompanyContactCellular && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Web
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("parentCompanyWeb", { required: true })}
          />
          {errors.parentCompanyWeb && (
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
