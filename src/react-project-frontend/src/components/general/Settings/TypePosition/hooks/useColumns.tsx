import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal";
import { ModalUpdate } from "../components";
import { ArrowUpDown } from "lucide-react";

export const useColumns = (setNewData: (data: any) => void) => {
  const columns = [
    {
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center"
          >
            Codigo
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "idTypeCargo"
    },
    {
      header: "Tipo de Cargo",
      accessorKey: "typeCargo"
    },
    {
      header: "Descripcion",
      accessorKey: "descriptionTypeCargo"
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
              <ModalUpdate setNewData={setNewData} dataUpdate={row.original} />
            }
            subTitle="Editar el tipo de cargo"
            title="Editar"
          />
        );
      }
    }
  ];

  return columns;
};
