// modules/CargoManager.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Types "../types/types";
import Database "./database";
import Utils "./utils";

module {
  // Función para crear o actualizar un tipo de cargo
  public func createCargoTypeSet(
    cargoTypeSet: Trie.Trie<Text, Types.SetCargoType_Type>,
    cargoTypeReq: Types.SetCargoType_Type,
    cargoTypeSetKey: Int
  ) : (Trie.Trie<Text, Types.SetCargoType_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateCargoType(
      existing: Types.SetCargoType_Type, 
      new: Types.SetCargoType_Type,
      timestamp: Text
    ) : Types.SetCargoType_Type {
      {
        idTypeCargo = new.idTypeCargo;
        typeCargo = new.typeCargo;
        descriptionTypeCargo = new.descriptionTypeCargo;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        userUpdate = new.userUpdate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.SetCargoType_Type = {
      idTypeCargo = Int.toText(cargoTypeSetKey);
      typeCargo = cargoTypeReq.typeCargo;
      descriptionTypeCargo = cargoTypeReq.descriptionTypeCargo;
      state = cargoTypeReq.state;
      userCreated = cargoTypeReq.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      userUpdate = cargoTypeReq.userUpdate;
      updateDate = cargoTypeReq.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.SetCargoType_Type>(
      cargoTypeSet,
      cargoTypeReq.idTypeCargo,
      newItem,
      cargoTypeSetKey,
      updateCargoType
    )
  };
  
  // Función para buscar tipos de cargo por nombre
  public func findByCargoType(
    cargoTypeSet: Trie.Trie<Text, Types.SetCargoType_Type>,
    typeName: Text
  ) : [(Text, Types.SetCargoType_Type)] {
    Database.filter<Types.SetCargoType_Type>(
      cargoTypeSet,
      func (_, cargoType) : Bool {
        Text.contains(cargoType.typeCargo, #text typeName)
      }
    )
  };
  
  // Función para buscar tipos de cargo por estado
  public func findByState(
    cargoTypeSet: Trie.Trie<Text, Types.SetCargoType_Type>,
    state: Text
  ) : [(Text, Types.SetCargoType_Type)] {
    Database.filter<Types.SetCargoType_Type>(
      cargoTypeSet,
      func (_, cargoType) : Bool {
        cargoType.state == state
      }
    )
  };
  
  // Función para obtener todos los tipos de cargo activos
  public func getAllActiveCargoTypes(
    cargoTypeSet: Trie.Trie<Text, Types.SetCargoType_Type>
  ) : [(Text, Types.SetCargoType_Type)] {
    findByState(cargoTypeSet, "A")
  };
  
  // Función para validar un tipo de cargo antes de crearlo
  public func validateCargoType(cargoType: Types.SetCargoType_Type) : Bool {
    if (Utils.isEmptyText(cargoType.typeCargo)) {
      return false;
    };
    
    if (Utils.isEmptyText(cargoType.descriptionTypeCargo)) {
      return false;
    };
    
    if (Utils.isEmptyText(cargoType.state)) {
      return false;
    };
    
    return true;
  };
  
  // Función para verificar si existe un tipo de cargo con el mismo nombre
  public func cargoTypeExists(
    cargoTypeSet: Trie.Trie<Text, Types.SetCargoType_Type>,
    typeName: Text
  ) : Bool {
    let results = findByCargoType(cargoTypeSet, typeName);
    return results.size() > 0;
  };
}