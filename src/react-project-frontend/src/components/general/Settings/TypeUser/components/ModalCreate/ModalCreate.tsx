import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";

type ModalCreateProps = {
  setNewData: (data: Inputs) => void;
  setOpen: (open: boolean) => void;
};

type Inputs = {
  typeUser: string;
  description: string;
};

export const ModalCreate = ({ setNewData, setOpen }: ModalCreateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNewData(data);
    setOpen(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Tipo de Usuario
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("typeUser", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Descripcion
          </Label>
          <Textarea
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("description", { required: true })}
          />
          {errors.description && (
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
