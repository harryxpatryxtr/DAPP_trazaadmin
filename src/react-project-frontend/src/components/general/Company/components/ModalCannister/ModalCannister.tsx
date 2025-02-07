import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type ModalCannisterProps = {
  setNewData: (data: any) => void;
};

type Inputs = {
  companyId: string;
  idCannisterData: string;
  idCannisterAssets: string;
};

export const ModalCannister = ({ setNewData }: ModalCannisterProps) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Empresa
          </Label>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            ID Cannister Data
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("idCannisterData", { required: true })}
          />
          {errors.idCannisterData && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            ID Cannister Assets
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("idCannisterAssets", { required: true })}
          />
          {errors.idCannisterAssets && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <Button type="submit">Actualizar</Button>
      </form>
    </div>
  );
};
