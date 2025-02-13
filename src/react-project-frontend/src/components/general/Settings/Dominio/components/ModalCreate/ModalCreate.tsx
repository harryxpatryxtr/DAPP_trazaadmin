import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

type ModalCreateProps = {
  setNewData: (data: any) => void;
};

type Inputs = {
  dominio: string;
  descripcion: string;
};

export const ModalCreate = ({ setNewData }: ModalCreateProps) => {
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
            Dominio
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("dominio", { required: true })}
          />
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
        <Button type="submit">Actualizar</Button>
      </form>
    </div>
  );
};
