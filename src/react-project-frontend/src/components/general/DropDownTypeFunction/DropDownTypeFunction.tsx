import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const DropDownTypeFunction = ({
  setSelectTypeFunction
}: {
  setSelectTypeFunction: (value: string) => void;
}) => {
  return (
    <Select onValueChange={setSelectTypeFunction}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona un tipo de documento" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ceo">CEO</SelectItem>
        <SelectItem value="cto">CTO</SelectItem>
        <SelectItem value="cio">CIO</SelectItem>
        <SelectItem value="coo">COO</SelectItem>
        <SelectItem value="cfo">CFO</SelectItem>
        <SelectItem value="cpo">CPO</SelectItem>
        <SelectItem value="cso">CSO</SelectItem>
        <SelectItem value="cpo">CPO</SelectItem>
        <SelectItem value="cpo">CPO</SelectItem>
      </SelectContent>
    </Select>
  );
};
