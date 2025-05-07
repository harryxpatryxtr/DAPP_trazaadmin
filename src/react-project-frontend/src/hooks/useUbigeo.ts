import { useState, useEffect } from "react";
import ubigeoData from "@/data/ubigeo.json";

interface Ubigeo {
  IDDIST: string;
  NOMBDEP: string;
  NOMBPROV: string;
  NOMBDIST: string;
}

// 🔹 Organiza los datos en una estructura anidada
const organizeUbigeo = (data: Ubigeo[]) => {
  const result: Record<string, Record<string, string[]>> = {};

  data.forEach(({ NOMBDEP, NOMBPROV, NOMBDIST }) => {
    if (!result[NOMBDEP]) result[NOMBDEP] = {};
    if (!result[NOMBDEP][NOMBPROV]) result[NOMBDEP][NOMBPROV] = [];
    result[NOMBDEP][NOMBPROV].push(NOMBDIST);
  });

  return result;
};

// Access the UBIGEO array inside the data
const ubigeoOrganized = organizeUbigeo(ubigeoData.UBIGEO);

// 🔹 Hook para manejar Ubigeo
export const useUbigeo = () => {
  const [departamentos, setDepartamentos] = useState<string[]>([]);
  const [provincias, setProvincias] = useState<string[]>([]);

  const [distritos, setDistritos] = useState<string[]>([]);

  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("");

  useEffect(() => {
    setDepartamentos(Object.keys(ubigeoOrganized));
  }, []);

  const handleDepartamentoChange = (departamento: string) => {
    setSelectedDepartamento(departamento);
    setProvincias(Object.keys(ubigeoOrganized[departamento] || {}));
    setDistritos([]);
  };

  const handleProvinciaChange = (provincia: string) => {
    setSelectedProvincia(provincia);
    setDistritos(ubigeoOrganized[selectedDepartamento]?.[provincia] || []);
    setSelectedDistrito("");
  };

  const handleDistritoChange = (distrito: string) => {
    setSelectedDistrito(distrito);
  };

  return {
    departamentos,
    provincias,
    distritos,
    selectedDepartamento,
    selectedProvincia,
    selectedDistrito,
    handleDepartamentoChange,
    handleProvinciaChange,
    handleDistritoChange
  };
};
