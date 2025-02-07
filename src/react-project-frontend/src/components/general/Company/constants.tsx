export const columns = [
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
    header: "Empresa",
    accessorKey: "empresa"
  },
  {
    header: "GLN",
    accessorKey: "gln"
  },
  {
    header: "Canister Data",
    accessorKey: "canisterData"
  },
  {
    header: "Canister Assets",
    accessorKey: "canisterAssets"
  },

  {
    header: "RUC",
    accessorKey: "ruc"
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
        <div className="flex gap-2">
          <p>Editar</p>
        </div>
      );
    }
  }
];
