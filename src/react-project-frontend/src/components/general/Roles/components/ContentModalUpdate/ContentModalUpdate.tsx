import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Inputs = {
  idRol: string;
  rol: string;
  descriptionRol: string;
  state: string;
};

export const ContentModalUpdate = ({
  dataUpdate,
  setNewData
}: {
  dataUpdate: any;
  setNewData: (data: any) => void;
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  const handleChangeState = (value: string) => {
    setValue("state", value);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNewData({
      idRol: dataUpdate.idRol,
      rol: data.rol || dataUpdate.rol,
      descriptionRol: data.descriptionRol || dataUpdate.descriptionRol,
      state: data.state || dataUpdate.state
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Codigo
          </Label>
          <span className="col-span-3">{dataUpdate.idRol}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Rol
          </Label>
          <span className="col-span-3">{dataUpdate.rol}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Descripcion
          </Label>
          <Textarea
            className="col-span-3"
            id="name"
            placeholder="Descripcion"
            defaultValue={dataUpdate.descriptionRol}
            {...register("descriptionRol", { required: true })}
          />
          {errors.descriptionRol && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Estado
          </Label>
          <Select
            onValueChange={handleChangeState}
            defaultValue={dataUpdate.state}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={dataUpdate.state} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </div>
  );
};
