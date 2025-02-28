import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Inputs = {
  permissions: string;
  descriptionPermissions: string;
};

type ContentModalProps = {
  setNewData: (data: Inputs) => void;
  setOpen: (open: boolean) => void;
};

export const ContentModal = ({ setNewData, setOpen }: ContentModalProps) => {
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
      <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Permiso
          </Label>
          <Input
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...register("permissions", { required: true })}
          />
          {errors.permissions && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Descripción
          </Label>
          <Textarea
            id="username"
            defaultValue={""}
            className="col-span-3"
            {...register("descriptionPermissions", { required: true })}
          />
          {errors.descriptionPermissions && (
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
