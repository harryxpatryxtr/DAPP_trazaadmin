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
      accessorKey: "idTypeUser"
    },
    {
      header: "Tipo de Usuario",
      accessorKey: "typeUser"
    },
    {
      header: "Descripcion",
      accessorKey: "descriptionTypeUser"
    },
    {
      header: "Autor",
      accessorKey: "userCreated"
    },
    {
      header: "Estado",
      accessorKey: "state"
    },
    {
      header: "Acciones",
      accessorKey: "acciones",
      cell: ({ row }: { row: any }) => {
        return (
          <Modal
            trigger={<Button variant="outline">Editar</Button>}
            data={
              <ModalUpdate dataUpdate={row.original} setNewData={setNewData} />
            }
            subTitle="Editar el tipo de usuario"
            title="Editar"
          />
        );
      }
    }
  ];

  return columns;
};
