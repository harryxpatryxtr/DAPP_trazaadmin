module{

   public type AdmPermissions_Type = {
    id_permissions  : Text;
    id_group : Text;
    permissions : Text;
    description_permissions :Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };
   public type AdmPermissions_Type_shared = {
    id_permissions  : Text;
    id_group : Text;
    permissions : Text;
    description_permissions :Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };
   public type AdmRoles_Type = {
    id_rol   : Text;
    id_group : Text;
    rol : Text;
    description_rol :Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };

  public type AdmRolPermissions_Type = {
    id_rol_permissions    : Text;
    id_permissions : Text;
    id_rol : Text;
    id_group :Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };

  public type TypeUser_Type = {
    id_type_user : Text;
    id_group : Text;
    type_user : Text;
    description_type_user : Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };

 public type TypeDocument_Type = {
    id_type_document  : Text;
    id_group : Text;
    type_document : Text;
    description_type_document : Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };


  public type User_Type = {
    id_user   : Text;
    id_type_user : Text;
    id_type_document : Text;
    id_group : Text;
    user : Text;
    email : Text;
    password : Text;
    nro_document : Text;
    name : Text;
    paternal_surname: Text;
    maternal_surname : Text;
    photo_user : Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };

  public type RolUser_Type = {
    id_rol_user    : Text;
    id_user: Text;
    id_rol : Text;
    id_group : Text;
    state : Text;
    user_created : Text;
    creation_date : Text;
    update_date : Text;
  };
}