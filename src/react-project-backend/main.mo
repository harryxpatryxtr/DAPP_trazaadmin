// main.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";

// Importación de tipos
import Types "./types/types";

// Importación de módulos
import Database "./modules/database";
import Utils "./modules/utils";
import CanisterManager "./modules/canistermanager";
import InformationManager "./modules/informationmanager";
import UserManager "./modules/usermanager";
import RoleManager "./modules/rolemanager";
import PermissionManager "./modules/permissionmanager";
import DocumentManager "./modules/documentmanager";
import CargoManager "./modules/cargomanager";
import ParentCompanyManager "./modules/parentcompanymanager";

actor class Adm() = this {
  // Variables estables para almacenar datos
  private stable var informationSet : Trie.Trie<Text, Types.SetGroupInformations_Type> = Trie.empty();
  private stable var informationSetKey : Int = 0;

  private stable var userTypeSet : Trie.Trie<Text, Types.SetUserType_Type> = Trie.empty();
  private stable var userTypeSetKey : Int = 0;

  private stable var documentTypeSet : Trie.Trie<Text, Types.SetDocumentType_Type> = Trie.empty();
  private stable var documentTypeSetKey : Int = 0;

  private stable var cargoTypeSet : Trie.Trie<Text, Types.SetCargoType_Type> = Trie.empty();
  private stable var cargoTypeSetKey : Int = 0;

  private stable var permissionsADM : Trie.Trie<Text, Types.AdmPermissions_Type> = Trie.empty();
  private stable var permissionsKey : Int = 0;

  private stable var rolesADM : Trie.Trie<Text, Types.AdmRoles_Type> = Trie.empty();
  private stable var rolesADMKey : Int = 0;

  private stable var rolPermissionADM : Trie.Trie<Text, Types.AdmRolPermissions_Type> = Trie.empty();
  private stable var rolPermissionADMKey : Int = 0;

  private stable var TypeUserADM : Trie.Trie<Text, Types.TypeUser_Type> = Trie.empty();
  private stable var TypeUserADMKey : Int = 0;

  private stable var UserADM : Trie.Trie<Text, Types.User_Type> = Trie.empty();
  private stable var UserADMKey : Int = 0;

  private stable var RolUserADM : Trie.Trie<Text, Types.RolUser_Type> = Trie.empty();
  private stable var RolUserADMKey : Int = 0;

  private stable var ParentCompanyREO : Trie.Trie<Text, Types.ParentCompanyREO_Type> = Trie.empty();
  private stable var ParentCompanyREOKey : Int = 0;

  // ===== INFORMACIÓN =====
  public func createInformationSet(informationReq : Types.SetGroupInformations_Type) : async Text {
    let (newInformationSet, id, newKey) = InformationManager.createInformationSet(
      informationSet,
      informationReq,
      informationSetKey,
    );
    informationSet := newInformationSet;
    informationSetKey := newKey;
    return id;
  };

  public query func readGroupInformationId(idGroupInformation : Text) : async ?Types.SetGroupInformations_Type {
    Database.readById(informationSet, idGroupInformation);
  };

  public query func readAllGroupInformations() : async [(Text, Types.SetGroupInformations_Type)] {
    Database.readAll(informationSet);
  };

  // ===== TIPOS DE USUARIO =====
  public func createUserTypeSet(userTypeSetReq : Types.SetUserType_Type) : async Text {
    let (newUserTypeSet, id, newKey) = UserManager.createUserTypeSet(
      userTypeSet,
      userTypeSetReq,
      userTypeSetKey,
    );
    userTypeSet := newUserTypeSet;
    userTypeSetKey := newKey;
    return id;
  };

  public query func readUserTypeSetId(idTypeUser : Text) : async ?Types.SetUserType_Type {
    Database.readById(userTypeSet, idTypeUser);
  };

  public query func readAllUserTypeSet() : async [(Text, Types.SetUserType_Type)] {
    Database.readAll(userTypeSet);
  };

  // ===== TIPOS DE DOCUMENTO =====
  public func createDocumentTypeSet(documentTypeReq : Types.SetDocumentType_Type) : async Text {
    let (newDocumentTypeSet, id, newKey) = DocumentManager.createDocumentTypeSet(
      documentTypeSet,
      documentTypeReq,
      documentTypeSetKey,
    );
    documentTypeSet := newDocumentTypeSet;
    documentTypeSetKey := newKey;
    return id;
  };

  public query func readDocumentTypeSetId(idTypeDocument : Text) : async ?Types.SetDocumentType_Type {
    Database.readById(documentTypeSet, idTypeDocument);
  };

  public query func readAllDocumentTypeSet() : async [(Text, Types.SetDocumentType_Type)] {
    Database.readAll(documentTypeSet);
  };

  // ===== TIPOS DE CARGO =====
  public func createCargoTypeSet(cargoTypeReq : Types.SetCargoType_Type) : async Text {
    let (newCargoTypeSet, id, newKey) = CargoManager.createCargoTypeSet(
      cargoTypeSet,
      cargoTypeReq,
      cargoTypeSetKey,
    );
    cargoTypeSet := newCargoTypeSet;
    cargoTypeSetKey := newKey;
    return id;
  };

  public query func readCargoTypeSetId(idTypeCargo : Text) : async ?Types.SetCargoType_Type {
    Database.readById(cargoTypeSet, idTypeCargo);
  };

  public query func readAllCargoTypeSet() : async [(Text, Types.SetCargoType_Type)] {
    Database.readAll(cargoTypeSet);
  };

  // ===== PERMISOS =====
  public func createPermission(permission : Types.AdmPermissions_Type) : async Text {
    let (newPermissionsADM, id, newKey) = PermissionManager.createPermission(
      permissionsADM,
      permission,
      permissionsKey,
    );
    permissionsADM := newPermissionsADM;
    permissionsKey := newKey;
    return id;
  };

  public query func readPermissionId(id_permissions : Text) : async ?Types.AdmPermissions_Type {
    Database.readById(permissionsADM, id_permissions);
  };

  public query func readAllPermissions() : async [(Text, Types.AdmPermissions_Type)] {
    Database.readAll(permissionsADM);
  };

  // ===== ROLES =====
  public func createRole(role : Types.AdmRoles_Type) : async Text {
    let (newRolesADM, id, newKey) = RoleManager.createRole(
      rolesADM,
      role,
      rolesADMKey,
    );
    rolesADM := newRolesADM;
    rolesADMKey := newKey;
    return id;
  };

  public query func readRoleId(idRol : Text) : async ?Types.AdmRoles_Type {
    Database.readById(rolesADM, idRol);
  };

  public query func readAllRoles() : async [(Text, Types.AdmRoles_Type)] {
    Database.readAll(rolesADM);
  };

  // ===== ROL PERMISOS =====
  public func createRolPermission(rolPermission : Types.AdmRolPermissions_Type) : async Text {
    let (newRolPermissionADM, id, newKey) = PermissionManager.createRolPermission(
      rolPermissionADM,
      rolPermission,
      rolPermissionADMKey,
    );
    rolPermissionADM := newRolPermissionADM;
    rolPermissionADMKey := newKey;
    return id;
  };

  public query func readRolPermissionId(idRolPermissions : Text) : async ?Types.AdmRolPermissions_Type {
    Database.readById(rolPermissionADM, idRolPermissions);
  };

  public query func readRolPermissions() : async [(Text, Types.AdmRolPermissions_Type)] {
    Database.readAll(rolPermissionADM);
  };

  // ===== TIPO DE USUARIO =====
  public func createTypeUser(typeUser : Types.TypeUser_Type) : async Text {
    let (newTypeUserADM, id, newKey) = UserManager.createTypeUser(
      TypeUserADM,
      typeUser,
      TypeUserADMKey,
    );
    TypeUserADM := newTypeUserADM;
    TypeUserADMKey := newKey;
    return id;
  };

  public query func readTypeUser(idTypeUser : Text) : async ?Types.TypeUser_Type {
    Database.readById(TypeUserADM, idTypeUser);
  };

  // ===== USUARIO =====
  public func createUser(user : Types.User_Type) : async Text {
    let (newUserADM, id, newKey) = UserManager.createUser(
      UserADM,
      user,
      UserADMKey,
    );
    UserADM := newUserADM;
    UserADMKey := newKey;
    return id;
  };

  public query func readUser(idUser : Text) : async ?Types.User_Type {
    Database.readById(UserADM, idUser);
  };

  public query func readAllUsers() : async [(Text, Types.User_Type)] {
    Database.readAll(UserADM);
  };

  // ===== ROL USUARIO =====
  public func createRolUser(rolUser : Types.RolUser_Type) : async Text {
    let (newRolUserADM, id, newKey) = RoleManager.createRolUser(
      RolUserADM,
      rolUser,
      RolUserADMKey,
    );
    RolUserADM := newRolUserADM;
    RolUserADMKey := newKey;
    return id;
  };

  public query func readRolUserId(idRolUser : Text) : async ?Types.RolUser_Type {
    Database.readById(RolUserADM, idRolUser);
  };

  // ===== GESTIÓN DE CANISTERS =====
  public func createCanister() : async Principal {
    await CanisterManager.createCanister(2_000_000_000_000);
  };

  public func installWasm(canister_id : Text, wasm_module : [Nat8]) : async () {
    await CanisterManager.installWasm(canister_id, wasm_module);
  };

  public func fetchMessageFromExternal(canisterId : Text, arg_greet : Text) : async Text {
    let external_canister = actor (canisterId) : actor {
      greet : (Text) -> async Text;
    };

    await external_canister.greet(arg_greet);
  };

  public func createParentCompany(parentCompany : Types.ParentCompanyREO_Type) : async Text {
    let (newParentCompanyREO, id, newKey) = ParentCompanyManager.createParentCompany(
      ParentCompanyREO,
      parentCompany,
      ParentCompanyREOKey,
      this // Pasar el actor directamente, no Principal.fromActor(this)
    );
    ParentCompanyREO := newParentCompanyREO;
    ParentCompanyREOKey := newKey;
    return id;
  };

  public query func readParentCompany(idParentCompany : Text) : async ?Types.ParentCompanyREO_Type {
    Database.readById(ParentCompanyREO, idParentCompany);
  };

  public query func readAllParentCompany() : async [(Text, Types.ParentCompanyREO_Type)] {
    Database.readAll(ParentCompanyREO);
  };

  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };
};
