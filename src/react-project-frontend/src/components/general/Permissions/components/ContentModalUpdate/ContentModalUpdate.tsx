import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

type Inputs = {
  estado: string;
  permiso: string;
  descripcion: string;
  autor: string;
};

export const ContentModalUpdate = (
  data: any,
  setNewData: (data: any) => void
) => {
  console.log(data, "data");
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
    setNewData(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Descripción
          </Label>
          <Input
            id="username"
            defaultValue={data.description}
            className="col-span-3"
            {...register("autor", { required: true })}
          />
          {errors.autor && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Estado
          </Label>
          <Select>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select" defaultValue={data.state} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectContent>
          </Select>
          {errors.estado && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
};
