import { Button } from "@/components/ui/button";
import { Modal } from "../../Modal";
import { ContentModalUpdate } from "../components";
export const useColumns = (setNewData: (data: any) => void) => {
  return [
    {
      header: "item",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        return <p>{row.index + 1}</p>;
      }
    },
    {
      header: "rol",
      accessorKey: "rol"
    },
    {
      header: "descripcion",
      accessorKey: "descriptionRol"
    },
    {
      header: "permiso",
      accessorKey: "permissions"
    },
    {
      header: "autor",
      accessorKey: "userCreated"
    },
    {
      header: "estado",
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
