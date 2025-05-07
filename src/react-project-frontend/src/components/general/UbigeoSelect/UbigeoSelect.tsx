import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useUbigeo } from "@/hooks/useUbigeo";

export const UbigeoSelect = () => {
  const {
    departamentos,
    provincias,
    distritos,
    selectedDepartamento,
    selectedProvincia,
    selectedDistrito,
    handleDepartamentoChange,
    handleProvinciaChange,
    handleDistritoChange
  } = useUbigeo();

  return (
    <div className="grid grid-cols-3 gap-4 w-80">
      <div>
        {/* 🔹 Departamento */}
        <label>Departamento</label>
        <Select
          value={selectedDepartamento}
          onValueChange={(value) => handleDepartamentoChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un departamento" />
          </SelectTrigger>
          <SelectContent>
            {departamentos.map((dep) => (
              <SelectItem key={dep} value={dep}>
                {dep}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        {/* 🔹 Provincia */}
        <label>Provincia</label>
        <Select
          value={selectedProvincia}
          onValueChange={(value) => handleProvinciaChange(value)}
          disabled={!selectedDepartamento}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una provincia" />
          </SelectTrigger>
          <SelectContent>
            {provincias.map((prov) => (
              <SelectItem key={prov} value={prov}>
                {prov}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        {/* 🔹 Distrito */}
        <label>Distrito</label>
        <Select
          value={selectedDistrito}
          onValueChange={(value) => handleDistritoChange(value)}
          disabled={!selectedProvincia}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un distrito" />
          </SelectTrigger>
          <SelectContent>
            {distritos.map((dist) => (
              <SelectItem key={dist} value={dist}>
                {dist}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 🔹 Mostrando selección */}
      <div className="mt-4 p-2 border hidden">
        <strong>Seleccionado:</strong> {selectedDepartamento} -{" "}
        {selectedProvincia}
      </div>
    </div>
  );
};
