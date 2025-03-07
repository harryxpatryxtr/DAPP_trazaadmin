import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useCompany } from "../../hooks/useCompany";
import { useEffect, useState } from "react";

type ModalCannisterProps = {
  setNewDataCannister: (data: any) => void;
  setOpen: (open: boolean) => void;
};

type Inputs = {
  companyId: string;
  idCannisterData: string;
  wasmFile: File | null;
};

export const ModalCannister = ({
  setOpen,
  setNewDataCannister
}: ModalCannisterProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();
  const { companies, fetchCompanies } = useCompany();
  useEffect(() => {
    fetchCompanies();
  }, []);
  const onSubmit: SubmitHandler<any> = (data) => {
    setNewDataCannister(data);
    setOpen(false);
  };
  const handleChangeCompany = (value: string) => {
    setValue("companyId", value);
  };
  const handleChangeCannister = (value: string) => {
    setValue("idCannisterData", value);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setValue("wasmFile", file);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Empresa
          </Label>
          <Select onValueChange={handleChangeCompany} defaultValue={""}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={"Selecciona una empresa"} />
            </SelectTrigger>
            <SelectContent position="popper">
              {companies.map((company) => (
                <SelectItem
                  key={company.idParentCompany}
                  value={company.idParentCompany}
                >
                  {company.parentCompany}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Cannister
          </Label>
          <Select onValueChange={handleChangeCannister} defaultValue={""}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={"Selecciona un Cannister"} />
            </SelectTrigger>
            <SelectContent position="popper">
              {companies.map((company) => (
                <SelectItem
                  key={company.idCanisterData}
                  value={company.idCanisterData}
                >
                  {company.idCanisterData}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.idCannisterData && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Archivo Wasm
          </Label>
          {/* <Input
            id="name"
            type="file"
            className="col-span-3"
            {...register("wasmFile", {
              required: true,
              onChange: handleFileChange
            })}
          /> */}
          <input
            id="name"
            type="file"
            className="col-span-3"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </div>
  );
};
