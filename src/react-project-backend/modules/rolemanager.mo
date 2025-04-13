// modules/RoleManager.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Types "../types/types";
import Database "./database";
import Utils "./utils";

module {
  // Función para crear o actualizar un rol
  public func createRole(
    rolesADM: Trie.Trie<Text, Types.AdmRoles_Type>,
    role: Types.AdmRoles_Type,
    rolesADMKey: Int
  ) : (Trie.Trie<Text, Types.AdmRoles_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateRole(
      existing: Types.AdmRoles_Type, 
      new: Types.AdmRoles_Type,
      timestamp: Text
    ) : Types.AdmRoles_Type {
      {
        idRol = new.idRol;
        rol = new.rol;
        descriptionRol = new.descriptionRol;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.AdmRoles_Type = {
      idRol = Int.toText(rolesADMKey);
      rol = role.rol;
      descriptionRol = role.descriptionRol;
      state = role.state;
      userCreated = role.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      updateDate = role.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.AdmRoles_Type>(
      rolesADM,
      role.idRol,
      newItem,
      rolesADMKey,
      updateRole
    )
  };
  
  // Función para crear o actualizar una asignación de rol a usuario
  public func createRolUser(
    rolUserADM: Trie.Trie<Text, Types.RolUser_Type>,
    rolUser: Types.RolUser_Type,
    rolUserADMKey: Int
  ) : (Trie.Trie<Text, Types.RolUser_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateRolUser(
      existing: Types.RolUser_Type, 
      new: Types.RolUser_Type,
      timestamp: Text
    ) : Types.RolUser_Type {
      {
        idRolUser = new.idRolUser;
        idUser = new.idUser;
        idRol = new.idRol;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.RolUser_Type = {
      idRolUser = Int.toText(rolUserADMKey);
      idUser = rolUser.idUser;
      idRol = rolUser.idRol;
      state = rolUser.state;
      userCreated = rolUser.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      updateDate = rolUser.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.RolUser_Type>(
      rolUserADM,
      rolUser.idRolUser,
      newItem,
      rolUserADMKey,
      updateRolUser
    )
  };
  
  // Función para obtener todos los roles de un usuario
  public func getUserRoles(
    rolUserADM: Trie.Trie<Text, Types.RolUser_Type>,
    userId: Text
  ) : [(Text, Types.RolUser_Type)] {
    Database.filter<Types.RolUser_Type>(
      rolUserADM,
      func (_, rolUser) : Bool {
        rolUser.idUser == userId and rolUser.state == "A"
      }
    )
  };
  
  // Función para verificar si un usuario tiene un rol específico
  public func hasRole(
    rolUserADM: Trie.Trie<Text, Types.RolUser_Type>,
    userId: Text,
    rolId: Text
  ) : Bool {
    let userRoles = getUserRoles(rolUserADM, userId);
    
    for ((_, rolUser) in userRoles.vals()) {
      if (rolUser.idRol == rolId) {
        return true;
      };
    };
    
    false
  };
  
  // Función para desactivar todos los roles de un usuario
  public func deactivateUserRoles(
    rolUserADM: Trie.Trie<Text, Types.RolUser_Type>,
    userId: Text
  ) : Trie.Trie<Text, Types.RolUser_Type> {
    let userRoles = getUserRoles(rolUserADM, userId);
    var updatedRolUserADM = rolUserADM;
    
    for ((id, rolUser) in userRoles.vals()) {
      let updatedRolUser : Types.RolUser_Type = {
        idRolUser = rolUser.idRolUser;
        idUser = rolUser.idUser;
        idRol = rolUser.idRol;
        state = "I"; // Inactivo
        userCreated = rolUser.userCreated;
        creationDate = rolUser.creationDate;
        updateDate = Utils.getCurrentTimestamp();
      };
      
      updatedRolUserADM := Trie.replace(
        updatedRolUserADM,
        Database.key(id),
        Text.equal,
        ?updatedRolUser
      ).0;
    };
    
    updatedRolUserADM
  };
  
  // Función para validar un rol antes de crearlo
  public func validateRole(role: Types.AdmRoles_Type) : Bool {
    if (Utils.isEmptyText(role.rol)) {
      return false;
    };
    
    if (Utils.isEmptyText(role.descriptionRol)) {
      return false;
    };
    
    if (Utils.isEmptyText(role.state)) {
      return false;
    };
    
    return true;
  };
}