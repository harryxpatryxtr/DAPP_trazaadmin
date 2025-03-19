import { Button } from "@/components/ui/button";
import { Modal } from "../../Modal";
import { ContentModalUpdate } from "../components";
import { ArrowUpDown } from "lucide-react";
export const useColumns = (setNewData: (data: any) => void) => [
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
    accessorKey: "codigo"
  },
  {
    header: "Usuario",
    accessorKey: "name"
  },
  {
    header: "Funcion",
    accessorKey: "funcion"
  },
  {
    header: "Correo",
    accessorKey: "email"
  },
  {
    header: "Rol",
    accessorKey: "rol"
  },
  {
    header: "Estado",
    accessorKey: "state"
  },
  {
    header: "actions",
    accessorKey: "actions",
    cell: ({ row }: { row: any }) => {
      return (
        <Modal
          trigger={<Button>Editar</Button>}
          data={
            <ContentModalUpdate data={row.original} setNewData={setNewData} />
          }
          subTitle="Editar el usuario"
          title="Editar"
        />
      );
    }
  }
];
