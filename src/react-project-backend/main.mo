import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Types "./declarations/declarations";
actor class Adm() {
  private stable var permissionsADM : Trie.Trie<Text, Types.AdmPermissions_Type> = Trie.empty();
  type Key<K> = Trie.Key<K>;
  func key(t : Text) : Key<Text> { { hash = Text.hash t; key = t } };

  public func createPermission(permission : Types.AdmPermissions_Type) : async Text {
    permissionsADM := Trie.replace(
      permissionsADM,
      key(permission.id_permissions),
      Text.equal,
      ?permission,
    ).0;

    return permission.id_permissions;
  };
  public query func readPermissionId(id_permissions : Text) : async ?Types.AdmPermissions_Type {
    let result = Trie.find(permissionsADM, key(id_permissions), Text.equal);
    return result;
  };

 private stable var rolesADM : Trie.Trie<Text, Types.AdmRoles_Type> = Trie.empty();
  public func createRole(role : Types.AdmRoles_Type) : async Text {
    rolesADM := Trie.replace(
      rolesADM,
      key(role.id_rol),
      Text.equal,
      ?role,
    ).0;

    return role.id_rol;
  };
  public query func readRoleId(id_rol : Text) : async ?Types.AdmRoles_Type {
    let result = Trie.find(rolesADM, key(id_rol), Text.equal);
    return result;
  };

 private stable var rolPermissionADM : Trie.Trie<Text, Types.AdmRolPermissions_Type> = Trie.empty();
  public func createRolPermission(rolPermission : Types.AdmRolPermissions_Type) : async Text {
    rolPermissionADM := Trie.replace(
      rolPermissionADM,
      key(rolPermission.id_rol_permissions),
      Text.equal,
      ?rolPermission,
    ).0;

    return rolPermission.id_rol_permissions;
  };
  public query func readRolPermissionId(id_rol_permissions : Text) : async ?Types.AdmRolPermissions_Type {
    let result = Trie.find(rolPermissionADM, key(id_rol_permissions), Text.equal);
    return result;
  };

  private stable var TypeUserADM : Trie.Trie<Text, Types.TypeUser_Type> = Trie.empty();
  public func createTypeUser(typeUser : Types.TypeUser_Type) : async Text {
    TypeUserADM := Trie.replace(
      TypeUserADM,
      key(typeUser.id_type_user),
      Text.equal,
      ?typeUser,
    ).0;

    return typeUser.id_type_user;
  };
  public query func readTypeUser(id_type_user : Text) : async ?Types.TypeUser_Type {
    let result = Trie.find(TypeUserADM, key(id_type_user), Text.equal);
    return result;
  };

private stable var UserADM : Trie.Trie<Text, Types.User_Type> = Trie.empty();
  public func createUser(user : Types.User_Type) : async Text {
    UserADM := Trie.replace(
      UserADM,
      key(user.id_user),
      Text.equal,
      ?user,
    ).0;

    return user.id_user;
  };
  public query func readUser(id_user : Text) : async ?Types.User_Type {
    let result = Trie.find(UserADM, key(id_user), Text.equal);
    return result;
  };
  
};
