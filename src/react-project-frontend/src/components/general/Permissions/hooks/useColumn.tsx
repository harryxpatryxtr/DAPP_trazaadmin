import { Button } from "@/components/ui/button";
import { Modal } from "../../Modal";
import { ContentModalUpdate } from "../components";

export const useColumns = (setNewData: (data: any) => void) => {
  return [
    {
      header: "Item",
      accessorKey: "item",
      cell: ({ row }: { row: any }) => {
        return <p>{row.index + 1}</p>;
      }
    },
    {
      header: "Código",
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
