import { Button } from "@/components/ui/button";
import { Modal } from "../../Modal";
import { ContentModalUpdate } from "../components";
import { ArrowUpDown } from "lucide-react";

export const useColumns = (setNewData: (data: any) => void) => {
  return [
    {
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center"
          >
            Código
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "idPermissions"
    },
    {
      header: "Permiso",
      accessorKey: "permissions"
    },
    {
      header: "Descripción",
      accessorKey: "descriptionPermissions"
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
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => {
        return (
          <Modal
            trigger={<Button>Editar</Button>}
            data={
              <ContentModalUpdate
                dataUpdate={row.original}
                setNewData={setNewData}
              />
            }
            subTitle="Editar el permiso"
            title="Editar"
          />
        );
      }
    }
  ];
};
