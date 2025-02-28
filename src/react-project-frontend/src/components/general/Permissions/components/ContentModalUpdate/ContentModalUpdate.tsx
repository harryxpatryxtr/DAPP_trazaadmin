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
  idPermissions: string;
  permissions: string;
  descriptionPermissions: string;
  state: string;
};

type ContentModalUpdateProps = {
  dataUpdate: any;
  setNewData: (data: Inputs) => void;
};

export const ContentModalUpdate = ({
  dataUpdate,
  setNewData
}: ContentModalUpdateProps) => {
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
      idPermissions: dataUpdate.idPermissions,
      permissions: data.permissions || dataUpdate.permissions,
      descriptionPermissions:
        data.descriptionPermissions || dataUpdate.descriptionPermissions,
      state: data.state || dataUpdate.state
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Código
          </Label>
          <span className="col-span-3">{dataUpdate.idPermissions}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Permiso
          </Label>
          <span className="col-span-3">{dataUpdate.permissions}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
            Descripción
          </Label>
          <Input
            id="username"
            defaultValue={dataUpdate.descriptionPermissions}
            className="col-span-3"
            {...register("descriptionPermissions", { required: true })}
          />
          {errors.descriptionPermissions && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="username" className="text-right">
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
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
};
