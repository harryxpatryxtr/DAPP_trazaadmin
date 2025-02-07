import { useUbigeo } from "@/hooks/useUbigeo";

export const UbigeoSelect = () => {
  const {
    departamentos,
    provincias,
    distritos,
    selectedDepartamento,
    selectedProvincia,
    handleDepartamentoChange,
    handleProvinciaChange
  } = useUbigeo();

  return (
    <div className="grid gap-4 w-80">
      {/* 🔹 Departamento */}
      <label>Departamento</label>
      <select
        value={selectedDepartamento}
        onChange={(e) => handleDepartamentoChange(e.target.value)}
      >
        <option value="">Seleccione un departamento</option>
        {departamentos.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>

      {/* 🔹 Provincia */}
      <label>Provincia</label>
      <select
        value={selectedProvincia}
        onChange={(e) => handleProvinciaChange(e.target.value)}
        disabled={!selectedDepartamento}
      >
        <option value="">Seleccione una provincia</option>
        {provincias.map((prov) => (
          <option key={prov} value={prov}>
            {prov}
          </option>
        ))}
      </select>

      {/* 🔹 Distrito */}
      <label>Distrito</label>
      <select disabled={!selectedProvincia}>
        <option value="">Seleccione un distrito</option>
        {distritos.map((dist) => (
          <option key={dist} value={dist}>
            {dist}
          </option>
        ))}
      </select>

      {/* 🔹 Mostrando selección */}
      <div className="mt-4 p-2 border">
        <strong>Seleccionado:</strong> {selectedDepartamento} -{" "}
        {selectedProvincia}
      </div>
    </div>
  );
};
