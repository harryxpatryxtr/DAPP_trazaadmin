import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
type ModalUpdateProps = {
  dataUpdate: any;
  setNewData: (data: any) => void;
};

export const ModalUpdate = ({ dataUpdate, setNewData }: ModalUpdateProps) => {
  const { register, handleSubmit, setValue } = useForm();
  console.log(dataUpdate, "data update");
  const onSubmit: SubmitHandler<any> = (data) => {
    const newData = {
      idParentCompany: dataUpdate.idParentCompany,
      glnParentCompany: data.glnParentCompany || dataUpdate.glnParentCompany,
      parentCompany: data.parentCompany || dataUpdate.parentCompany,
      parentCompanyRuc: data.parentCompanyRuc || dataUpdate.parentCompanyRuc,
      parentCompanyAddress:
        data.parentCompanyAddress || dataUpdate.parentCompanyAddress,
      parentCompanyLocation:
        data.parentCompanyLocation || dataUpdate.parentCompanyLocation,
      parentCompanyContactEmail:
        data.parentCompanyContactEmail || dataUpdate.parentCompanyContactEmail,
      parentCompanyContactCellular:
        data.parentCompanyContactCellular ||
        dataUpdate.parentCompanyContactCellular,
      parentCompanyWeb: data.parentCompanyWeb || dataUpdate.parentCompanyWeb,
      state: data.state || dataUpdate.state
    };
    setNewData(newData);
  };

  const handleChangeState = (value: string) => {
    setValue("state", value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Codigo
          </Label>
          <p className="col-span-3">{dataUpdate.idParentCompany}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            GLN
          </Label>
          <p className="col-span-3">{dataUpdate.glnParentCompany}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Razon Social
          </Label>
          <p className="col-span-3">{dataUpdate.parentCompany}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            RUC
          </Label>
          <p className="col-span-3">{dataUpdate.parentCompanyRuc}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Razon Social
          </Label>
          <p className="col-span-3">{dataUpdate.parentCompany}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Estado
          </Label>
          <p className="col-span-3">{dataUpdate.state}</p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Direccion
          </Label>
          <Input
            defaultValue={dataUpdate.parentCompanyAddress}
            type="text"
            className="col-span-3"
            {...register("parentCompanyAddress")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Localizacion
          </Label>
          <Input
            defaultValue={dataUpdate.parentCompanyLocation}
            type="text"
            className="col-span-3"
            {...register("parentCompanyLocation")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Correo
          </Label>
          <Input
            defaultValue={dataUpdate.parentCompanyContactEmail}
            type="text"
            className="col-span-3"
            {...register("parentCompanyContactEmail")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Celular
          </Label>
          <Input
            defaultValue={dataUpdate.parentCompanyContactCellular}
            type="text"
            className="col-span-3"
            {...register("parentCompanyContactCellular")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Web
          </Label>
          <Input
            defaultValue={dataUpdate.parentCompanyWeb}
            type="text"
            className="col-span-3"
            {...register("parentCompanyWeb")}
          />
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
