import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";

type ModalUpdateProps = {
  setNewData: (data: any) => void;
  dataUpdate: any;
};

type Inputs = {
  codigo: string;
  dominio: string;
  description: string;
  state: string;
};

export const ModalUpdate = ({ setNewData, dataUpdate }: ModalUpdateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>();

  const handleChangeState = (value: string) => {
    setValue("state", value);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const newData = {
      idGroupInformation: dataUpdate.idGroupInformation,
      dominio: data.dominio || dataUpdate.groupInformationName,
      description: data.description || dataUpdate.groupInformationDescription,
      state: data.state || dataUpdate.state
    };
    setNewData(newData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Codigo
          </Label>
          <p>{dataUpdate.idGroupInformation}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Dominio
          </Label>
          <p>{dataUpdate.groupInformationName}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Descripcion
          </Label>
          <Textarea
            id="name"
            defaultValue={dataUpdate.groupInformationDescription}
            className="col-span-3"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Estado
          </Label>
          <Select
            onValueChange={handleChangeState}
            defaultValue={dataUpdate.state}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={dataUpdate.state} />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Actualizar</Button>
      </form>
    </div>
  );
};
