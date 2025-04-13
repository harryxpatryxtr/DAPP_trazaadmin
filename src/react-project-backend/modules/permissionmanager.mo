// modules/PermissionManager.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Types "../types/types";
import Database "./database";
import Utils "./utils";

module {
  // Función para crear o actualizar un permiso
  public func createPermission(
    permissionsADM: Trie.Trie<Text, Types.AdmPermissions_Type>,
    permission: Types.AdmPermissions_Type,
    permissionsKey: Int
  ) : (Trie.Trie<Text, Types.AdmPermissions_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updatePermission(
      existing: Types.AdmPermissions_Type, 
      new: Types.AdmPermissions_Type,
      timestamp: Text
    ) : Types.AdmPermissions_Type {
      {
        idPermissions = new.idPermissions;
        permissions = new.permissions;
        descriptionPermissions = new.descriptionPermissions;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.AdmPermissions_Type = {
      idPermissions = Int.toText(permissionsKey);
      permissions = permission.permissions;
      descriptionPermissions = permission.descriptionPermissions;
      state = permission.state;
      userCreated = permission.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      updateDate = permission.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.AdmPermissions_Type>(
      permissionsADM,
      permission.idPermissions,
      newItem,
      permissionsKey,
      updatePermission
    )
  };
  
  // Función para crear o actualizar una asignación de permiso a rol
  public func createRolPermission(
    rolPermissionADM: Trie.Trie<Text, Types.AdmRolPermissions_Type>,
    rolPermission: Types.AdmRolPermissions_Type,
    rolPermissionADMKey: Int
  ) : (Trie.Trie<Text, Types.AdmRolPermissions_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateRolPermission(
      existing: Types.AdmRolPermissions_Type, 
      new: Types.AdmRolPermissions_Type,
      timestamp: Text
    ) : Types.AdmRolPermissions_Type {
      {
        idRolPermissions = new.idRolPermissions;
        idPermissions = new.idPermissions;
        idRol = new.idRol;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.AdmRolPermissions_Type = {
      idRolPermissions = Int.toText(rolPermissionADMKey);
      idPermissions = rolPermission.idPermissions;
      idRol = rolPermission.idRol;
      state = rolPermission.state;
      userCreated = rolPermission.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      updateDate = rolPermission.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.AdmRolPermissions_Type>(
      rolPermissionADM,
      rolPermission.idRolPermissions,
      newItem,
      rolPermissionADMKey,
      updateRolPermission
    )
  };
  
  // Función para obtener todos los permisos de un rol
  public func getRolePermissions(
    rolPermissionADM: Trie.Trie<Text, Types.AdmRolPermissions_Type>,
    rolId: Text
  ) : [(Text, Types.AdmRolPermissions_Type)] {
    Database.filter<Types.AdmRolPermissions_Type>(
      rolPermissionADM,
      func (_, rolPermission) : Bool {
        rolPermission.idRol == rolId and rolPermission.state == "A"
      }
    )
  };
  
  // Función para verificar si un rol tiene un permiso específico
  public func hasPermission(
    rolPermissionADM: Trie.Trie<Text, Types.AdmRolPermissions_Type>,
    rolId: Text,
    permissionId: Text
  ) : Bool {
    let rolePermissions = getRolePermissions(rolPermissionADM, rolId);
    
    for ((_, rolPermission) in rolePermissions.vals()) {
      if (rolPermission.idPermissions == permissionId) {
        return true;
      };
    };
    
    false
  };
  
  // Función para verificar si un usuario tiene un permiso específico
  public func userHasPermission(
    rolPermissionADM: Trie.Trie<Text, Types.AdmRolPermissions_Type>,
    rolUserADM: Trie.Trie<Text, Types.RolUser_Type>,
    userId: Text,
    permissionId: Text
  ) : Bool {
    // Obtener todos los roles del usuario
    let userRoles = Database.filter<Types.RolUser_Type>(
      rolUserADM,
      func (_, rolUser) : Bool {
        rolUser.idUser == userId and rolUser.state == "A"
      }
    );
    
    // Verificar si alguno de los roles del usuario tiene el permiso
    for ((_, rolUser) in userRoles.vals()) {
      if (hasPermission(rolPermissionADM, rolUser.idRol, permissionId)) {
        return true;
      };
    };
    
    false
  };
  
  // Función para desactivar todos los permisos de un rol
  public func deactivateRolePermissions(
    rolPermissionADM: Trie.Trie<Text, Types.AdmRolPermissions_Type>,
    rolId: Text
  ) : Trie.Trie<Text, Types.AdmRolPermissions_Type> {
    let rolePermissions = getRolePermissions(rolPermissionADM, rolId);
    var updatedRolPermissionADM = rolPermissionADM;
    
    for ((id, rolPermission) in rolePermissions.vals()) {
      let updatedRolPermission : Types.AdmRolPermissions_Type = {
        idRolPermissions = rolPermission.idRolPermissions;
        idPermissions = rolPermission.idPermissions;
        idRol = rolPermission.idRol;
        state = "I"; // Inactivo
        userCreated = rolPermission.userCreated;
        creationDate = rolPermission.creationDate;
        updateDate = Utils.getCurrentTimestamp();
      };
      
      updatedRolPermissionADM := Trie.replace(
        updatedRolPermissionADM,
        Database.key(id),
        Text.equal,
        ?updatedRolPermission
      ).0;
    };
    
    updatedRolPermissionADM
  };
  
  // Función para validar un permiso antes de crearlo
  public func validatePermission(permission: Types.AdmPermissions_Type) : Bool {
    if (Utils.isEmptyText(permission.permissions)) {
      return false;
    };
    
    if (Utils.isEmptyText(permission.descriptionPermissions)) {
      return false;
    };
    
    if (Utils.isEmptyText(permission.state)) {
      return false;
    };
    
    return true;
  };
}