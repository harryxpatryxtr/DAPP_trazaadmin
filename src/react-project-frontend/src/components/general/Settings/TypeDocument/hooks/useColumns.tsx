import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal";
import { ModalUpdate } from "../components";

export const useColumns = (setNewData: (data: any) => void) => {
  const columns = [
    {
      header: "Item",
      accessorKey: "item",
      cell: ({ row }: { row: any }) => {
        return <p>{row.index + 1}</p>;
      }
    },
    {
      header: "Codigo",
      accessorKey: "codigo"
    },
    {
      header: "Tipo de Usuario",
      accessorKey: "typeUser"
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion"
    },
    {
      header: "Author",
      accessorKey: "author"
    },
    {
      header: "Estado",
      accessorKey: "estado"
    },
    {
      header: "Acciones",
      accessorKey: "acciones",
      cell: ({ row }: { row: any }) => {
        return (
          <Modal
            trigger={<Button variant="outline">Editar</Button>}
            data={<ModalUpdate setNewData={setNewData} />}
            subTitle="Editar el dominio"
            title="Editar"
          />
        );
      }
    }
  ];

  return columns;
};
