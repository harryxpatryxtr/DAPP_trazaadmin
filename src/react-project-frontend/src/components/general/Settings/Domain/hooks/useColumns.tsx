import { Button } from "@/components/ui/button";
import { Modal } from "../../../Modal";
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
      accessorKey: "idGroupInformation"
    },
    {
      header: "Dominio",
      accessorKey: "groupInformationName"
    },
    {
      header: "Descripcion",
      accessorKey: "groupInformationDescription"
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
            subTitle="Editar el dominio"
            title="Editar"
          />
        );
      }
    }
  ];

  return columns;
};
