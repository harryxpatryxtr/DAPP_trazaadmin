import Text "mo:base/Text";
module {

  public type SetGroupInformations_Type = {
    idGroupInformation : Text;
    groupInformationName : Text;
    groupInformationDescription : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    userUpdate : Text;
    updateDate : Text;
  };

  public type SetUserType_Type = {
    idTypeUser : Text;
    typeUser : Text;
    descriptionTypeUser : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    userUpdate : Text;
    updateDate : Text;
  };

  public type SetDocumentType_Type = {
    idTypeDocument : Text;
    typeDocument : Text;
    descriptionTypeDocument : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    userUpdate : Text;
    updateDate : Text;
  };

  public type SetCargoType_Type = {
    idTypeCargo : Text;
    typeCargo : Text;
    descriptionTypeCargo : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    userUpdate : Text;
    updateDate : Text;
  };

  public type AdmPermissions_Type = {
    idPermissions : Text;
    permissions : Text;
    descriptionPermissions : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    updateDate : Text;
  };

  public type AdmRoles_Type = {
    idRol : Text;
    rol : Text;
    descriptionRol : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    updateDate : Text;
  };

  public type AdmRolPermissions_Type = {
    idRolPermissions : Text;
    idPermissions : Text;
    idRol : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    updateDate : Text;
  };

  public type TypeUser_Type = {
    idTypeUser : Text;
    typeUser : Text;
    descriptionTypeUser : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    updateDate : Text;
  };

  public type TypeDocument_Type = {
    idTypeDocument : Text;
    typeDocument : Text;
    descriptionTypeDocument : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    updateDate : Text;
  };

  public type User_Type = {
    idUser : Text;
    idTypeUser : Text;
    idTypeDocument : Text;
    user : Text;
    email : Text;
    password : Text;
    nroDocument : Text;
    name : Text;
    paternal_surname : Text;
    maternal_surname : Text;
    photo_user : Text;
    state : Text;
    phoneNumber: Text;
    userCreated : Text;
    creationDate : Text;
    updateDate : Text;
  };

  public type RolUser_Type = {
    idRolUser : Text;
    idUser : Text;
    idRol : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    updateDate : Text;
  };

  public type ParentCompanyREO_Type = {
    idParentCompany : Text;
    glnParentCompany : Text;
    parentCompany : Text;
    parentCompanyRuc : Text;
    parentCompanyUbigeo : Text;
    parentCompanyAddress : Text;
    parentCompanyLocation : Text;
    parentCompanyContactEmail : Text;
    parentCompanyContactCellular : Text;
    parentCompanyWeb : Text;
    logo : Text;
    idCanisterData : Text;
    idCanisterAssets : Text;
    state : Text;
    userCreated : Text;
    creationDate : Text;
    userUpdate : Text;
    updateDate : Text;

  };
};
