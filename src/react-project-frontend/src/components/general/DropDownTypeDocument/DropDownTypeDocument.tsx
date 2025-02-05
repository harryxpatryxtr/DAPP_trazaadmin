import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const DropDownTypeDocument = ({
  setSelectTypeDocument
}: {
  setSelectTypeDocument: (value: string) => void;
}) => {
  return (
    <Select onValueChange={setSelectTypeDocument}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona un tipo de documento" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dni">DNI</SelectItem>
        <SelectItem value="ce">Carnet de Extranjeria</SelectItem>
        <SelectItem value="pasaporte">Pasaporte</SelectItem>
      </SelectContent>
    </Select>
  );
};
