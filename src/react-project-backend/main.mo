import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Types "./types/types";

actor class Adm() {
  private stable var permissionsADM : Trie.Trie<Text, Types.AdmPermissions_Type> = Trie.empty();
  type Key<K> = Trie.Key<K>;
  func key(t : Text) : Key<Text> { { hash = Text.hash t; key = t } };
  private stable var permissionsKey: Int = 0;
  public func createPermission(permission : Types.AdmPermissions_Type) : async Text {
  let ahora : Time.Time = Time.now();

// Convertir Time.Time (que es un Int) a Text
  let ahoraComoTexto : Text = Int.toText(ahora);

  switch (Trie.get(permissionsADM, key(permission.idPermissions), Text.equal)) {
      case (null) {
        // Acción cuando no se encuentra el elemento
        let permissionDB:Types.AdmPermissions_Type = {
      idPermissions  = Int.toText(permissionsKey);
      permissions = permission.permissions;
      descriptionPermissions = permission.descriptionPermissions ;
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

  permissionsKey := permissionsKey+1; 
      };
      case (?value) {
        let permissionDB:Types.AdmPermissions_Type = {
        idPermissions  = permission.idPermissions;
        permissions = permission.permissions;
        descriptionPermissions = permission.descriptionPermissions ;
        state = value.state;
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
  public func createRole(role : Types.AdmRoles_Type) : async Text {
    rolesADM := Trie.replace(
      rolesADM,
      key(role.idRol),
      Text.equal,
      ?role,
    ).0;

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
  public func createRolPermission(rolPermission : Types.AdmRolPermissions_Type) : async Text {
    rolPermissionADM := Trie.replace(
      rolPermissionADM,
      key(rolPermission.idRolPermissions),
      Text.equal,
      ?rolPermission,
    ).0;

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
  public func createTypeUser(typeUser : Types.TypeUser_Type) : async Text {
    TypeUserADM := Trie.replace(
      TypeUserADM,
      key(typeUser.idTypeUser),
      Text.equal,
      ?typeUser,
    ).0;

    return typeUser.idTypeUser;
  };
  public query func readTypeUser(idTypeUser : Text) : async ?Types.TypeUser_Type {
    let result = Trie.find(TypeUserADM, key(idTypeUser), Text.equal);
    return result;
  };

private stable var UserADM : Trie.Trie<Text, Types.User_Type> = Trie.empty();
  public func createUser(user : Types.User_Type) : async Text {
    UserADM := Trie.replace(
      UserADM,
      key(user.idUser),
      Text.equal,
      ?user,
    ).0;

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
  public func createRolUser(rolUser : Types.RolUser_Type) : async Text {
    RolUserADM := Trie.replace(
      RolUserADM,
      key(rolUser.idRolUser),
      Text.equal,
      ?rolUser,
    ).0;

    return rolUser.idRolUser;
  };

  public query func readRolUserId(idRolUser : Text) : async ?Types.RolUser_Type {
    let result = Trie.find(RolUserADM, key(idRolUser), Text.equal);
    return result;
  };

};
