import { DataTable, Modal } from "@/components/general";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/components/general/Permissions/hooks/usePermissions";
import { useEffect, useState } from "react";
import { ContentModal } from "./components";
import { useColumns } from "./hooks/useColumn";
import { useNewData } from "../Settings/Domain/hooks/useData";

export const Permissions = () => {
  const { newData, setNewData } = useNewData(null);
  const [open, setOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { permissions, loading, error, fetchPermissions, createPermission } =
    usePermissions();
  const columns = useColumns(setNewData);

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (newData) {
      const user_created = userData.user_created;
      createPermission({
        userCreated: user_created,
        permissions: newData.permissions,
        descriptionPermissions: newData.descriptionPermissions,
        updateDate: "",
        state: newData.state || "active",
        idPermissions: newData.idPermissions || "",
        creationDate: ""
      });
      setNewData(null);
    }
  }, [newData]);

  const headerActions = [
    <Modal
      trigger={<Button>Nuevo</Button>}
      data={<ContentModal setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Nuevo permiso"
      title="Nuevo"
      setOpen={() => setOpen(!open)}
      open={open}
    />
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Pagina Permisos</h1>
      {loading && <p>Cargando permisos...</p>}
      {error && <p>Error al cargar los permisos.</p>}
      {permissions && (
        <DataTable
          columns={columns}
          data={permissions}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};
