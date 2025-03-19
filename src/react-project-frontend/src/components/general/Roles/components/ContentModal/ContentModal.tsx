import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type Inputs = {
  rol: string;
  descriptionRol: string;
};

export const ContentModal = ({
  setNewData,
  setOpen
}: {
  setNewData: (data: Inputs) => void;
  setOpen: (open: boolean) => void;
}) => {
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
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Rol
        </Label>
        <Input
          className="col-span-3"
          id="name"
          placeholder="Rol"
          {...register("rol", { required: true })}
        />
        {errors.rol && (
          <span className="text-red-500 col-span-4 text-xs text-right">
            Este campo es requerido
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Descripcion
        </Label>
        <Textarea
          className="col-span-3"
          id="name"
          placeholder="Descripcion"
          {...register("descriptionRol", { required: true })}
        />
        {errors.descriptionRol && (
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
