import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
type ModalUpdateProps = {
  dataUpdate: any;
  setNewData: (data: any) => void;
};

export const ModalUpdate = ({ dataUpdate, setNewData }: ModalUpdateProps) => {
  const { register, handleSubmit } = useForm();

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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Dominio
          </Label>
          <p>{dataUpdate.groupInformationName}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Descripcion
          </Label>
          <p>{dataUpdate.groupInformationDescription}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Estado
          </Label>
          <p>{dataUpdate.state}</p>
        </div>
        <Button type="submit">Actualizar</Button>
      </form>
    </div>
  );
};
