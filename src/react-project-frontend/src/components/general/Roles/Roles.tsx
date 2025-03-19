import { useEffect, useState } from "react";
import { useRoles } from "@/components/general/Roles/hooks/useRoles";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal/Modal";
import { DataTable } from "@/components/general/DataTable/DataTable";
import { ContentModal } from "./components/ContentModal";
import Layout from "@/components/layout";
import { ContentModalAssign } from "./components/ContentModalAssign";
import { usePermissions } from "../Permissions/hooks/usePermissions";
import { useColumns } from "./hooks/useColumns";
import { useNewData } from "../Settings/Dominio/hooks/useData";

export const Roles = () => {
  const { newData, setNewData } = useNewData(null);
  const { newData: dataAssign, setNewData: setDataAssign } = useNewData(null);
  const { roles, loading, error, fetchRoles, createRole, createRolPermission } =
    useRoles();
  const {
    permissions,
    loading: loadingPermissions,
    error: errorPermissions,
    fetchPermissions
  } = usePermissions();
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const user_created = userData.user_created;
  const columns = useColumns(setNewData);
  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (newData) {
      createRole({
        userCreated: user_created,
        rol: newData.rol,
        descriptionRol: newData.descriptionRol,
        updateDate: "",
        state: newData.state || "active",
        idRol: newData.idRol || "",
        creationDate: ""
      });
      setNewData(null);
    }
  }, [newData]);

  useEffect(() => {
    if (dataAssign) {
      createRolPermission({
        idRolPermissions: dataAssign.idRol,
        idPermissions: dataAssign.permissions,
        creationDate: "",
        state: dataAssign.state || "active",
        idRol: dataAssign.idRol,
        userCreated: userData.user_created,
        updateDate: ""
      });
      setDataAssign(null);
    }
  }, [dataAssign]);
  const headerActions = [
    <Modal
      trigger={<Button>Crear</Button>}
      data={<ContentModal setNewData={setNewData} setOpen={setOpen} />}
      subTitle="Nuevo rol"
      title="Nuevo"
      setOpen={() => setOpen(!open)}
      open={open}
    />,
    <Modal
      trigger={<Button>Asignar</Button>}
      data={
        <ContentModalAssign
          setDataAssign={setDataAssign}
          roles={roles}
          permissions={permissions}
        />
      }
      subTitle="Asignar rol"
      title="Asignar"
      setOpen={() => setOpenAssign(!openAssign)}
      open={openAssign}
    />
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Roles Page</h1>
      {loading && <p>Cargando roles...</p>}
      {error && <p>Error al cargar los roles.</p>}
      {roles && (
        <DataTable
          columns={columns}
          data={roles}
          headerActions={headerActions}
        />
      )}
    </Layout>
  );
};
