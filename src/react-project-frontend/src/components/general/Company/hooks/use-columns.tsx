import { Button } from "@/components/ui/button";
import { Modal } from "../..";
import { ModalUpdate } from "../components";

export const useColumns = (setNewData: (data: any) => void) => {
  // glnParentCompany: "gln";
  // idCanisterAssets: "b77ix-eeaaa-aaaaa-qaada-cai";
  // idCanisterData: "bw4dl-smaaa-aaaaa-qaacq-cai";
  // idParentCompany: "0";
  // logo: "asdasdasdasd";
  // parentCompany: "empresa";
  // parentCompanyAddress: "asdasdsa";
  // parentCompanyContactCellular: "12312312";
  // parentCompanyContactEmail: "asdasda";
  // parentCompanyLocation: "asdasds";
  // parentCompanyRuc: "123";
  // parentCompanyUbigeo: "ubigeo";
  // parentCompanyWeb: "asdasasd.com";
  // state: "active";
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
      accessorKey: "idParentCompany"
    },
    {
      header: "Empresa",
      accessorKey: "parentCompany"
    },
    {
      header: "GLN",
      accessorKey: "glnParentCompany"
    },
    {
      header: "Canister Data",
      accessorKey: "idCanisterData"
    },
    {
      header: "Canister Assets",
      accessorKey: "idCanisterAssets"
    },
    {
      header: "RUC",
      accessorKey: "parentCompanyRuc"
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
            subTitle="Editar la empresa"
            title="Editar"
          />
        );
      }
    }
  ];

  return columns;
};
