// modules/InformationManager.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Types "../types/types";
import Database "./database";
import Utils "./utils";

module {
  // Función para crear o actualizar información de grupo
  public func createInformationSet(
    informationSet: Trie.Trie<Text, Types.SetGroupInformations_Type>,
    informationReq: Types.SetGroupInformations_Type,
    informationSetKey: Int
  ) : (Trie.Trie<Text, Types.SetGroupInformations_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateInformation(
      existing: Types.SetGroupInformations_Type, 
      new: Types.SetGroupInformations_Type,
      timestamp: Text
    ) : Types.SetGroupInformations_Type {
      {
        idGroupInformation = new.idGroupInformation;
        groupInformationName = new.groupInformationName;
        groupInformationDescription = new.groupInformationDescription;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        userUpdate = new.userUpdate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.SetGroupInformations_Type = {
      idGroupInformation = Int.toText(informationSetKey);
      groupInformationName = informationReq.groupInformationName;
      groupInformationDescription = informationReq.groupInformationDescription;
      state = informationReq.state;
      userCreated = informationReq.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      userUpdate = informationReq.userUpdate;
      updateDate = informationReq.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.SetGroupInformations_Type>(
      informationSet,
      informationReq.idGroupInformation,
      newItem,
      informationSetKey,
      updateInformation
    )
  };
  
  // Función para buscar información por nombre
  public func findByName(
    informationSet: Trie.Trie<Text, Types.SetGroupInformations_Type>,
    name: Text
  ) : [(Text, Types.SetGroupInformations_Type)] {
    Database.filter<Types.SetGroupInformations_Type>(
      informationSet,
      func (_, info) : Bool {
        Text.contains(info.groupInformationName, #text name)
      }
    )
  };
  
  // Función para buscar información por estado
  public func findByState(
    informationSet: Trie.Trie<Text, Types.SetGroupInformations_Type>,
    state: Text
  ) : [(Text, Types.SetGroupInformations_Type)] {
    Database.filter<Types.SetGroupInformations_Type>(
      informationSet,
      func (_, info) : Bool {
        info.state == state
      }
    )
  };
  
  // Función para validar información antes de crearla
  public func validateInformation(info: Types.SetGroupInformations_Type) : Bool {
    if (Utils.isEmptyText(info.groupInformationName)) {
      return false;
    };
    
    if (Utils.isEmptyText(info.groupInformationDescription)) {
      return false;
    };
    
    if (Utils.isEmptyText(info.state)) {
      return false;
    };
    
    return true;
  };
}