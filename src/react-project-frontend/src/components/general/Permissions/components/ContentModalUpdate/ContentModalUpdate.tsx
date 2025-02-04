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
  descripcion: string;
};

export const ContentModalUpdate = ({ data, setNewData }: any) => {
  console.log(data, "data update");
  // const { row } = data;
  const { item } = data;
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  const handleChangeState = (value: string) => {
    setValue("estado", value);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data, "data update");
    console.log(item, "item update");
    const newData = {
      id: item,
      ...data
    };
    setNewData(newData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Código
          </Label>
          <span>{data.codigo}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Permiso
          </Label>
          <span>{data.permiso}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Descripción
          </Label>
          <Input
            id="username"
            defaultValue={data.description}
            className="col-span-3"
            {...register("descripcion", { required: true })}
          />
          {errors.descripcion && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Estado
          </Label>
          <Select onValueChange={handleChangeState}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select" defaultValue={data.estado} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
};
