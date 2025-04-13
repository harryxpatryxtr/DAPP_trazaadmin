// modules/UserManager.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Types "../types/types";
import Database "./database";
import Utils "./utils";

module {
  // Función para crear o actualizar un tipo de usuario
  public func createUserTypeSet(
    userTypeSet: Trie.Trie<Text, Types.SetUserType_Type>,
    userTypeSetReq: Types.SetUserType_Type,
    userTypeSetKey: Int
  ) : (Trie.Trie<Text, Types.SetUserType_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateUserType(
      existing: Types.SetUserType_Type, 
      new: Types.SetUserType_Type,
      timestamp: Text
    ) : Types.SetUserType_Type {
      {
        idTypeUser = new.idTypeUser;
        typeUser = new.typeUser;
        descriptionTypeUser = new.descriptionTypeUser;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        userUpdate = new.userUpdate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.SetUserType_Type = {
      idTypeUser = Int.toText(userTypeSetKey);
      typeUser = userTypeSetReq.typeUser;
      descriptionTypeUser = userTypeSetReq.descriptionTypeUser;
      state = userTypeSetReq.state;
      userCreated = userTypeSetReq.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      userUpdate = userTypeSetReq.userUpdate;
      updateDate = userTypeSetReq.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.SetUserType_Type>(
      userTypeSet,
      userTypeSetReq.idTypeUser,
      newItem,
      userTypeSetKey,
      updateUserType
    )
  };
  
  // Función para crear o actualizar un tipo de usuario (TypeUser_Type)
  public func createTypeUser(
    typeUserADM: Trie.Trie<Text, Types.TypeUser_Type>,
    typeUser: Types.TypeUser_Type,
    typeUserADMKey: Int
  ) : (Trie.Trie<Text, Types.TypeUser_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateTypeUser(
      existing: Types.TypeUser_Type, 
      new: Types.TypeUser_Type,
      timestamp: Text
    ) : Types.TypeUser_Type {
      {
        idTypeUser = new.idTypeUser;
        typeUser = new.typeUser;
        descriptionTypeUser = new.descriptionTypeUser;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.TypeUser_Type = {
      idTypeUser = Int.toText(typeUserADMKey);
      typeUser = typeUser.typeUser;
      descriptionTypeUser = typeUser.descriptionTypeUser;
      state = typeUser.state;
      userCreated = typeUser.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      updateDate = typeUser.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.TypeUser_Type>(
      typeUserADM,
      typeUser.idTypeUser,
      newItem,
      typeUserADMKey,
      updateTypeUser
    )
  };
  
  // Función para crear o actualizar un usuario
  public func createUser(
    userADM: Trie.Trie<Text, Types.User_Type>,
    user: Types.User_Type,
    userADMKey: Int
  ) : (Trie.Trie<Text, Types.User_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateUser(
      existing: Types.User_Type, 
      new: Types.User_Type,
      timestamp: Text
    ) : Types.User_Type {
      {
        idUser = new.idUser;
        idTypeUser = new.idTypeUser;
        idTypeDocument = new.idTypeDocument;
        user = new.user;
        email = new.email;
        password = new.password;
        nroDocument = new.nroDocument;
        name = new.name;
        paternal_surname = new.paternal_surname;
        maternal_surname = new.maternal_surname;
        photo_user = new.photo_user;
        phoneNumber = new.phoneNumber;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.User_Type = {
      idUser = Int.toText(userADMKey);
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
      phoneNumber = user.phoneNumber;
      state = user.state;
      userCreated = user.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      updateDate = user.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.User_Type>(
      userADM,
      user.idUser,
      newItem,
      userADMKey,
      updateUser
    )
  };
  
  // Función para buscar usuarios por nombre
  public func findUsersByName(
    userADM: Trie.Trie<Text, Types.User_Type>,
    name: Text
  ) : [(Text, Types.User_Type)] {
    Database.filter<Types.User_Type>(
      userADM,
      func (_, user) : Bool {
        Text.contains(user.name, #text name)
      }
    )
  };
  
  // Función para buscar usuarios por email
  public func findUserByEmail(
    userADM: Trie.Trie<Text, Types.User_Type>,
    email: Text
  ) : ?Types.User_Type {
    let users = Database.filter<Types.User_Type>(
      userADM,
      func (_, user) : Bool {
        user.email == email
      }
    );
    
    if (users.size() > 0) {
      ?users[0].1
    } else {
      null
    }
  };
  
  // Función para validar un usuario antes de crearlo
  public func validateUser(user: Types.User_Type) : Bool {
    if (Utils.isEmptyText(user.name)) {
      return false;
    };
    
    if (Utils.isEmptyText(user.email)) {
      return false;
    };
    
    if (not Utils.isValidEmail(user.email)) {
      return false;
    };
    
    if (Utils.isEmptyText(user.password)) {
      return false;
    };
    
    return true;
  };
}