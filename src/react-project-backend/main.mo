import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Types "./types/types";

import Cycles = "mo:base/ExperimentalCycles";
import IC = "mo:base/Principal";
import Principal "mo:base/Principal";

actor class Adm() {
  type Key<K> = Trie.Key<K>;
  func key(t : Text) : Key<Text> { { hash = Text.hash t; key = t } };

  private stable var informationSet : Trie.Trie<Text, Types.SetGroupInformations_Type> = Trie.empty();
  private stable var informationSetKey : Int = 0;

  public func createInformationSet(informationReq : Types.SetGroupInformations_Type) : async Text {
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(informationSet, key(informationReq.idGroupInformation), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let informationDB : Types.SetGroupInformations_Type = {
          idGroupInformation = Int.toText(informationSetKey);
          groupInformationName = informationReq.groupInformationName;
          groupInformationDescription = informationReq.groupInformationDescription;
          state = informationReq.state;
          userCreated = informationReq.userCreated;
          creationDate = ahoraComoTexto;
          userUpdate = informationReq.userUpdate;
          updateDate = informationReq.updateDate;
        };

        informationSet := Trie.replace(
          informationSet,
          key(informationDB.idGroupInformation),
          Text.equal,
          ?informationDB,
        ).0;

        informationSetKey := informationSetKey + 1;
      };
      case (?value) {
        let informationDB : Types.SetGroupInformations_Type = {
          idGroupInformation = informationReq.idGroupInformation;
          groupInformationName = informationReq.groupInformationName;
          groupInformationDescription = informationReq.groupInformationDescription;
          state = informationReq.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          userUpdate = informationReq.userUpdate;
          updateDate = ahoraComoTexto;
        };
        informationSet := Trie.replace(
          informationSet,
          key(informationDB.idGroupInformation),
          Text.equal,
          ?informationDB,
        ).0;
      };
    };
    return informationReq.idGroupInformation;
  };
  public query func readGroupInformationId(idGroupInformation : Text) : async ?Types.SetGroupInformations_Type {
    let result = Trie.find(informationSet, key(idGroupInformation), Text.equal);
    return result;
  };

  public query func readAllGroupInformations() : async [(Text, Types.SetGroupInformations_Type)] {
    let result = Iter.toArray(Trie.iter(informationSet));
    return result;
  };

  private stable var userTypeSet : Trie.Trie<Text, Types.SetUserType_Type> = Trie.empty();
  private stable var userTypeSetKey : Int = 0;

  public func createUserTypeSet(userTypeSetReq : Types.SetUserType_Type) : async Text {

    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(userTypeSet, key(userTypeSetReq.idTypeUser), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let userTypeSetDB : Types.SetUserType_Type = {
          idTypeUser = Int.toText(userTypeSetKey);
          typeUser = userTypeSetReq.typeUser;
          descriptionTypeUser = userTypeSetReq.descriptionTypeUser;
          state = userTypeSetReq.state;
          userCreated = userTypeSetReq.userCreated;
          creationDate = ahoraComoTexto;
          userUpdate = userTypeSetReq.userUpdate;
          updateDate = userTypeSetReq.updateDate;
        };

        userTypeSet := Trie.replace(
          userTypeSet,
          key(userTypeSetDB.idTypeUser),
          Text.equal,
          ?userTypeSetDB,
        ).0;

        userTypeSetKey := userTypeSetKey + 1;
      };
      case (?value) {
        let userTypeSetDB : Types.SetUserType_Type = {
          idTypeUser = userTypeSetReq.idTypeUser;
          typeUser = userTypeSetReq.typeUser;
          descriptionTypeUser = userTypeSetReq.descriptionTypeUser;
          state = userTypeSetReq.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          userUpdate = userTypeSetReq.userUpdate;
          updateDate = ahoraComoTexto;
        };
        userTypeSet := Trie.replace(
          userTypeSet,
          key(userTypeSetDB.idTypeUser),
          Text.equal,
          ?userTypeSetDB,
        ).0;
      };
    };
    return userTypeSetReq.idTypeUser;
  };
  public query func readUserTypeSetId(idTypeUser : Text) : async ?Types.SetUserType_Type {
    let result = Trie.find(userTypeSet, key(idTypeUser), Text.equal);
    return result;
  };

  public query func readAllUserTypeSet() : async [(Text, Types.SetUserType_Type)] {
    let result = Iter.toArray(Trie.iter(userTypeSet));
    return result;
  };

  private stable var documentTypeSet : Trie.Trie<Text, Types.SetDocumentType_Type> = Trie.empty();
  private stable var documentTypeSetKey : Int = 0;

  public func createDocumentTypeSet(documentTypeReq : Types.SetDocumentType_Type) : async Text {
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(documentTypeSet, key(documentTypeReq.idTypeDocument), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let documentTypeDB : Types.SetDocumentType_Type = {
          idTypeDocument = Int.toText(documentTypeSetKey);
          typeDocument = documentTypeReq.typeDocument;
          descriptionTypeDocument = documentTypeReq.descriptionTypeDocument;
          state = documentTypeReq.state;
          userCreated = documentTypeReq.userCreated;
          creationDate = ahoraComoTexto;
          userUpdate = documentTypeReq.userUpdate;
          updateDate = documentTypeReq.updateDate;
        };

        documentTypeSet := Trie.replace(
          documentTypeSet,
          key(documentTypeDB.idTypeDocument),
          Text.equal,
          ?documentTypeDB,
        ).0;

        documentTypeSetKey := documentTypeSetKey + 1;
      };
      case (?value) {
        let documentTypeDB : Types.SetDocumentType_Type = {
          idTypeDocument = documentTypeReq.idTypeDocument;
          typeDocument = documentTypeReq.typeDocument;
          descriptionTypeDocument = documentTypeReq.descriptionTypeDocument;
          state = documentTypeReq.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          userUpdate = documentTypeReq.userUpdate;
          updateDate = ahoraComoTexto;
        };
        documentTypeSet := Trie.replace(
          documentTypeSet,
          key(documentTypeDB.idTypeDocument),
          Text.equal,
          ?documentTypeDB,
        ).0;
      };
    };
    return documentTypeReq.idTypeDocument;
  };
  public query func readDocumentTypeSetId(idTypeDocument : Text) : async ?Types.SetDocumentType_Type {
    let result = Trie.find(documentTypeSet, key(idTypeDocument), Text.equal);
    return result;
  };

  public query func readAllDocumentTypeSet() : async [(Text, Types.SetDocumentType_Type)] {
    let result = Iter.toArray(Trie.iter(documentTypeSet));
    return result;
  };

  private stable var cargoTypeSet : Trie.Trie<Text, Types.SetCargoType_Type> = Trie.empty();
  private stable var cargoTypeSetKey : Int = 0;

  public func createCargoTypeSet(cargoTypeReq : Types.SetCargoType_Type) : async Text {
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(cargoTypeSet, key(cargoTypeReq.idTypeCargo), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let cargoTypeDB : Types.SetCargoType_Type = {
          idTypeCargo = Int.toText(cargoTypeSetKey);
          typeCargo = cargoTypeReq.typeCargo;
          descriptionTypeCargo = cargoTypeReq.descriptionTypeCargo;
          state = cargoTypeReq.state;
          userCreated = cargoTypeReq.userCreated;
          creationDate = ahoraComoTexto;
          userUpdate = cargoTypeReq.userUpdate;
          updateDate = cargoTypeReq.updateDate;
        };

        cargoTypeSet := Trie.replace(
          cargoTypeSet,
          key(cargoTypeDB.idTypeCargo),
          Text.equal,
          ?cargoTypeDB,
        ).0;

        cargoTypeSetKey := cargoTypeSetKey + 1;
      };
      case (?value) {
        let cargoTypeDB : Types.SetCargoType_Type = {
          idTypeCargo = cargoTypeReq.idTypeCargo;
          typeCargo = cargoTypeReq.typeCargo;
          descriptionTypeCargo = cargoTypeReq.descriptionTypeCargo;
          state = cargoTypeReq.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          userUpdate = cargoTypeReq.userUpdate;
          updateDate = ahoraComoTexto;
        };
        cargoTypeSet := Trie.replace(
          cargoTypeSet,
          key(cargoTypeDB.idTypeCargo),
          Text.equal,
          ?cargoTypeDB,
        ).0;
      };
    };
    return cargoTypeReq.idTypeCargo;
  };
  public query func readCargoTypeSetId(idTypeCargo : Text) : async ?Types.SetCargoType_Type {
    let result = Trie.find(cargoTypeSet, key(idTypeCargo), Text.equal);
    return result;
  };

  public query func readAllCargoTypeSet() : async [(Text, Types.SetCargoType_Type)] {
    let result = Iter.toArray(Trie.iter(cargoTypeSet));
    return result;
  };

  private stable var permissionsADM : Trie.Trie<Text, Types.AdmPermissions_Type> = Trie.empty();
  private stable var permissionsKey : Int = 0;
  public func createPermission(permission : Types.AdmPermissions_Type) : async Text {
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);
    switch (Trie.get(permissionsADM, key(permission.idPermissions), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let permissionDB : Types.AdmPermissions_Type = {
          idPermissions = Int.toText(permissionsKey);
          permissions = permission.permissions;
          descriptionPermissions = permission.descriptionPermissions;
          state = permission.state;
          userCreated = permission.userCreated;
          creationDate = ahoraComoTexto;
          updateDate = permission.updateDate;
        };
        permissionsADM := Trie.replace(
          permissionsADM,
          key(permissionDB.idPermissions),
          Text.equal,
          ?permissionDB,
        ).0;

        permissionsKey := permissionsKey + 1;
      };
      case (?value) {
        let permissionDB : Types.AdmPermissions_Type = {
          idPermissions = permission.idPermissions;
          permissions = permission.permissions;
          descriptionPermissions = permission.descriptionPermissions;
          state = permission.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          updateDate = ahoraComoTexto;
        };
        permissionsADM := Trie.replace(
          permissionsADM,
          key(permissionDB.idPermissions),
          Text.equal,
          ?permissionDB,
        ).0;
      };
    };
    return permission.idPermissions;
  };
  public query func readPermissionId(id_permissions : Text) : async ?Types.AdmPermissions_Type {
    let result = Trie.find(permissionsADM, key(id_permissions), Text.equal);
    return result;
  };
  public query func readAllPermissions() : async [(Text, Types.AdmPermissions_Type)] {
    let result = Iter.toArray(Trie.iter(permissionsADM));
    return result;
  };

  private stable var rolesADM : Trie.Trie<Text, Types.AdmRoles_Type> = Trie.empty();
  private stable var rolesADMKey : Int = 0;
  public func createRole(role : Types.AdmRoles_Type) : async Text {
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);
    switch (Trie.get(rolesADM, key(role.idRol), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let roleDB : Types.AdmRoles_Type = {
          idRol = Int.toText(rolesADMKey);
          rol = role.rol;
          descriptionRol = role.descriptionRol;
          state = role.state;
          userCreated = role.userCreated;
          creationDate = ahoraComoTexto;
          updateDate = role.updateDate;
        };
        rolesADM := Trie.replace(
          rolesADM,
          key(roleDB.idRol),
          Text.equal,
          ?roleDB,
        ).0;

        rolesADMKey := rolesADMKey + 1;
      };
      case (?value) {
        let roleDB : Types.AdmRoles_Type = {
          idRol = role.idRol;
          rol = role.rol;
          descriptionRol = role.descriptionRol;
          state = role.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          updateDate = ahoraComoTexto;
        };
        rolesADM := Trie.replace(
          rolesADM,
          key(roleDB.idRol),
          Text.equal,
          ?roleDB,
        ).0;
      };
    };

    return role.idRol;
  };
  public query func readRoleId(idRol : Text) : async ?Types.AdmRoles_Type {
    let result = Trie.find(rolesADM, key(idRol), Text.equal);
    return result;
  };
  public query func readAllRoles() : async [(Text, Types.AdmRoles_Type)] {
    let result = Iter.toArray(Trie.iter(rolesADM));
    return result;
  };
  private stable var rolPermissionADM : Trie.Trie<Text, Types.AdmRolPermissions_Type> = Trie.empty();
  private stable var rolPermissionADMKey : Int = 0;
  public func createRolPermission(rolPermission : Types.AdmRolPermissions_Type) : async Text {
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);
    switch (Trie.get(rolPermissionADM, key(rolPermission.idRolPermissions), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let rolPermissionADMDB : Types.AdmRolPermissions_Type = {
          idRolPermissions = Int.toText(rolPermissionADMKey);
          idPermissions = rolPermission.idPermissions;
          idRol = rolPermission.idRol;
          state = rolPermission.state;
          userCreated = rolPermission.userCreated;
          creationDate = ahoraComoTexto;
          updateDate = rolPermission.updateDate;
        };
        rolPermissionADM := Trie.replace(
          rolPermissionADM,
          key(rolPermissionADMDB.idRol),
          Text.equal,
          ?rolPermissionADMDB,
        ).0;

        rolPermissionADMKey := rolPermissionADMKey + 1;
      };
      case (?value) {
        let rolPermissionADMDB : Types.AdmRolPermissions_Type = {
          idRolPermissions = rolPermission.idRolPermissions;
          idPermissions = rolPermission.idPermissions;
          idRol = rolPermission.idRol;
          state = rolPermission.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          updateDate = ahoraComoTexto;
        };

        rolPermissionADM := Trie.replace(
          rolPermissionADM,
          key(rolPermissionADMDB.idRol),
          Text.equal,
          ?rolPermissionADMDB,
        ).0;
      };
    };
    return rolPermission.idRolPermissions;
  };
  public query func readRolPermissionId(idRolPermissions : Text) : async ?Types.AdmRolPermissions_Type {
    let result = Trie.find(rolPermissionADM, key(idRolPermissions), Text.equal);
    return result;
  };
  public query func readRolPermissions() : async [(Text, Types.AdmRolPermissions_Type)] {
    let result = Iter.toArray(Trie.iter(rolPermissionADM));
    return result;
  };
  private stable var TypeUserADM : Trie.Trie<Text, Types.TypeUser_Type> = Trie.empty();
  private stable var TypeUserADMKey : Int = 0;
  public func createTypeUser(typeUser : Types.TypeUser_Type) : async Text {

    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(TypeUserADM, key(typeUser.idTypeUser), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let typeUserDB : Types.TypeUser_Type = {
          idTypeUser = Int.toText(TypeUserADMKey);
          typeUser = typeUser.typeUser;
          descriptionTypeUser = typeUser.descriptionTypeUser;
          state = typeUser.state;
          userCreated = typeUser.userCreated;
          creationDate = ahoraComoTexto;
          updateDate = typeUser.updateDate;
        };
        TypeUserADM := Trie.replace(
          TypeUserADM,
          key(typeUserDB.idTypeUser),
          Text.equal,
          ?typeUserDB,
        ).0;

        TypeUserADMKey := TypeUserADMKey + 1;
      };
      case (?value) {
        let typeUserDB : Types.TypeUser_Type = {
          idTypeUser = typeUser.idTypeUser;
          typeUser = typeUser.typeUser;
          descriptionTypeUser = typeUser.descriptionTypeUser;
          state = typeUser.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          updateDate = ahoraComoTexto;
        };

        TypeUserADM := Trie.replace(
          TypeUserADM,
          key(typeUserDB.idTypeUser),
          Text.equal,
          ?typeUserDB,
        ).0;
      };
    };

    return typeUser.idTypeUser;
  };
  public query func readTypeUser(idTypeUser : Text) : async ?Types.TypeUser_Type {
    let result = Trie.find(TypeUserADM, key(idTypeUser), Text.equal);
    return result;
  };

  private stable var UserADM : Trie.Trie<Text, Types.User_Type> = Trie.empty();
  private stable var UserADMKey : Int = 0;
  public func createUser(user : Types.User_Type) : async Text {

    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(UserADM, key(user.idUser), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let userDB : Types.User_Type = {
          idUser = Int.toText(UserADMKey);
          idTypeUser = user.idTypeUser;
          idTypeDocument = user.idTypeDocument;
          user = user.user;
          email = user.email;
          password = user.password;
          nroDocument = user.nroDocument;
          name = user.name;
          paternal_surname = user.paternal_surname;
          maternal_surname = user.maternal_surname;
          photo_user = user.photo_user;
          state = user.state;
          userCreated = user.userCreated;
          creationDate = ahoraComoTexto;
          updateDate = user.updateDate;
        };
        UserADM := Trie.replace(
          UserADM,
          key(userDB.idUser),
          Text.equal,
          ?userDB,
        ).0;

        UserADMKey := UserADMKey + 1;
      };
      case (?value) {
        let userDB : Types.User_Type = {
          idUser = user.idUser;
          idTypeUser = user.idTypeUser;
          idTypeDocument = user.idTypeDocument;
          user = user.user;
          email = user.email;
          password = user.password;
          nroDocument = user.nroDocument;
          name = user.name;
          paternal_surname = user.paternal_surname;
          maternal_surname = user.maternal_surname;
          photo_user = user.photo_user;
          state = user.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          updateDate = ahoraComoTexto;
        };

        UserADM := Trie.replace(
          UserADM,
          key(userDB.idUser),
          Text.equal,
          ?userDB,
        ).0;
      };
    };
    return user.idUser;
  };
  public query func readUser(idUser : Text) : async ?Types.User_Type {
    let result = Trie.find(UserADM, key(idUser), Text.equal);
    return result;
  };

  public query func readAllUsers() : async [(Text, Types.User_Type)] {
    let result = Iter.toArray(Trie.iter(UserADM));
    return result;
  };

  private stable var RolUserADM : Trie.Trie<Text, Types.RolUser_Type> = Trie.empty();
  private stable var RolUserADMKey : Int = 0;
  public func createRolUser(rolUser : Types.RolUser_Type) : async Text {
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(RolUserADM, key(rolUser.idRolUser), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let rolUserDB : Types.RolUser_Type = {
          idRolUser = Int.toText(RolUserADMKey);
          idUser = rolUser.idUser;
          idRol = rolUser.idRol;
          state = rolUser.state;
          userCreated = rolUser.userCreated;
          creationDate = ahoraComoTexto;
          updateDate = rolUser.updateDate;
        };
        RolUserADM := Trie.replace(
          RolUserADM,
          key(rolUserDB.idRolUser),
          Text.equal,
          ?rolUserDB,
        ).0;
        RolUserADMKey := RolUserADMKey + 1;
      };
      case (?value) {
        let rolUserDB : Types.RolUser_Type = {
          idRolUser = rolUser.idRolUser;
          idUser = rolUser.idUser;
          idRol = rolUser.idRol;
          state = rolUser.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          updateDate = ahoraComoTexto;
        };

        RolUserADM := Trie.replace(
          RolUserADM,
          key(rolUserDB.idRolUser),
          Text.equal,
          ?rolUserDB,
        ).0;

      };
    };
        return rolUser.idRolUser;
  };

  public query func readRolUserId(idRolUser : Text) : async ?Types.RolUser_Type {
    let result = Trie.find(RolUserADM, key(idRolUser), Text.equal);
    return result;
  };

  let management_canister = actor ("aaaaa-aa") : actor {
    create_canister : shared { settings : ?{ controllers : ?[Principal] } } -> async {
      canister_id : Principal;
    };
    install_code : shared {
      canister_id : Principal;
      mode : { #install };
      wasm_module : [Nat8];
      arg : [Nat8];
    } -> async ();
    start_canister : shared { canister_id : Principal } -> async ();
  };

  public func createCanister() : async Principal {
    // Asignamos ciclos al nuevo canister
    Cycles.add(2_000_000_000_000);
    // Creamos el canister
    let create_result = await management_canister.create_canister({
      settings = null;
    });

    return create_result.canister_id;
  };

  public func installWasm(canister_id : Text, wasm_module : [Nat8]) : async () {
    await management_canister.install_code({
      canister_id = Principal.fromText(canister_id);
      mode = #install; // Usa #upgrade si quieres actualizar sin borrar el estado
      wasm_module = wasm_module;
      arg = [];
    });
  };

  public func fetchMessageFromExternal(canisterId : Text, arg_greet : Text) : async Text {
    let external_canister = actor (canisterId) : actor {
      greet : (name : Text) -> async Text;
    };
    return await external_canister.greet(arg_greet);
  };



  private stable var ParentCompanyREO : Trie.Trie<Text, Types.ParentCompanyREO_Type> = Trie.empty();
  private stable var ParentCompanyREOKey : Int = 0;
  public func createParentCompany(parentCompany : Types.ParentCompanyREO_Type) : async Text {
   
    let ahora : Time.Time = Time.now();
    let ahoraComoTexto : Text = Int.toText(ahora);

    switch (Trie.get(ParentCompanyREO, key(parentCompany.idParentCompany), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
      let dataCanister : Text =  Principal.toText( await createCanister()) ;
      let assetCanister : Text = Principal.toText( await createCanister()) ;

        let parentCompanyDB : Types.ParentCompanyREO_Type = {
          idParentCompany = Int.toText(ParentCompanyREOKey);
          glnParentCompany = parentCompany.glnParentCompany;
          parentCompany = parentCompany.parentCompany;
          parentCompanyRuc = parentCompany.parentCompanyRuc;
          parentCompanyUbigeo = parentCompany.parentCompanyUbigeo;
          parentCompanyAddress = parentCompany.parentCompanyAddress;
          parentCompanyLocation = parentCompany.parentCompanyLocation;
          parentCompanyContactEmail = parentCompany.parentCompanyContactEmail;
          parentCompanyContactCellular = parentCompany.parentCompanyContactCellular;
          parentCompanyWeb = parentCompany.parentCompanyWeb;
          logo = parentCompany.logo;
          idCanisterData = dataCanister;
          idCanisterAssets =  assetCanister;
          state = parentCompany.state;
          userCreated = parentCompany.userCreated;
          creationDate = ahoraComoTexto;
          userUpdate = parentCompany.userUpdate;
          updateDate = parentCompany.updateDate;
        };
        ParentCompanyREO := Trie.replace(
          ParentCompanyREO,
          key(parentCompanyDB.idParentCompany),
          Text.equal,
          ?parentCompanyDB,
        ).0;

        ParentCompanyREOKey := ParentCompanyREOKey + 1;
      };
      case (?value) {
        let parentCompanyDB : Types.ParentCompanyREO_Type = {
          idParentCompany = parentCompany.idParentCompany ;
           glnParentCompany = parentCompany.glnParentCompany;
          parentCompany = parentCompany.parentCompany;
          parentCompanyRuc = parentCompany.parentCompanyRuc;
          parentCompanyUbigeo = parentCompany.parentCompanyUbigeo;
          parentCompanyAddress = parentCompany.parentCompanyAddress;
          parentCompanyLocation = parentCompany.parentCompanyLocation;
          parentCompanyContactEmail = parentCompany.parentCompanyContactEmail;
          parentCompanyContactCellular = parentCompany.parentCompanyContactCellular;
          parentCompanyWeb = parentCompany.parentCompanyWeb;
          logo = parentCompany.logo;
          idCanisterData = parentCompany.idCanisterData;
          idCanisterAssets =  parentCompany.idCanisterAssets;
          state = parentCompany.state;
          userCreated = value.userCreated;
          creationDate = value.creationDate;
          userUpdate = parentCompany.userUpdate;
          updateDate = ahoraComoTexto;
        };

         ParentCompanyREO := Trie.replace(
          ParentCompanyREO,
          key(parentCompanyDB.idParentCompany),
          Text.equal,
          ?parentCompanyDB,
        ).0;
      };
    };
    return parentCompany.idParentCompany;
  };
  public query func readParentCompany(idParentCompany : Text) : async ?Types.ParentCompanyREO_Type {
    let result = Trie.find(ParentCompanyREO, key(idParentCompany), Text.equal);
    return result;
  };

  public query func readAllParentCompany() : async [(Text, Types.ParentCompanyREO_Type)] {
    let result = Iter.toArray(Trie.iter(ParentCompanyREO));
    return result;
  };
public shared query (msg) func whoami() : async Principal {
    msg.caller
  };
};
