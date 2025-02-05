import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const DropDownTypeUsers = ({
  setSelectTypeUser
}: {
  setSelectTypeUser: (value: string) => void;
}) => {
  return (
    <Select onValueChange={setSelectTypeUser}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona un tipo de usuario" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="001">Administrador</SelectItem>
        <SelectItem value="002">Empresa</SelectItem>
      </SelectContent>
    </Select>
  );
};
