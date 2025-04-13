// modules/DocumentManager.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Types "../types/types";
import Database "./database";
import Utils "./utils";

module {
  // Función para crear o actualizar un tipo de documento
  public func createDocumentTypeSet(
    documentTypeSet: Trie.Trie<Text, Types.SetDocumentType_Type>,
    documentTypeReq: Types.SetDocumentType_Type,
    documentTypeSetKey: Int
  ) : (Trie.Trie<Text, Types.SetDocumentType_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateDocumentType(
      existing: Types.SetDocumentType_Type, 
      new: Types.SetDocumentType_Type,
      timestamp: Text
    ) : Types.SetDocumentType_Type {
      {
        idTypeDocument = new.idTypeDocument;
        typeDocument = new.typeDocument;
        descriptionTypeDocument = new.descriptionTypeDocument;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        userUpdate = new.userUpdate;
        updateDate = timestamp;
      }
    };
    
    // Preparar el nuevo item para creación
    let newItem : Types.SetDocumentType_Type = {
      idTypeDocument = Int.toText(documentTypeSetKey);
      typeDocument = documentTypeReq.typeDocument;
      descriptionTypeDocument = documentTypeReq.descriptionTypeDocument;
      state = documentTypeReq.state;
      userCreated = documentTypeReq.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      userUpdate = documentTypeReq.userUpdate;
      updateDate = documentTypeReq.updateDate;
    };
    
    // Usar la función genérica de Database
    Database.createOrUpdate<Types.SetDocumentType_Type>(
      documentTypeSet,
      documentTypeReq.idTypeDocument,
      newItem,
      documentTypeSetKey,
      updateDocumentType
    )
  };
  
  // Función para buscar tipos de documento por nombre
  public func findByDocumentType(
    documentTypeSet: Trie.Trie<Text, Types.SetDocumentType_Type>,
    typeName: Text
  ) : [(Text, Types.SetDocumentType_Type)] {
    Database.filter<Types.SetDocumentType_Type>(
      documentTypeSet,
      func (_, docType) : Bool {
        Text.contains(docType.typeDocument, #text typeName)
      }
    )
  };
  
  // Función para buscar tipos de documento por estado
  public func findByState(
    documentTypeSet: Trie.Trie<Text, Types.SetDocumentType_Type>,
    state: Text
  ) : [(Text, Types.SetDocumentType_Type)] {
    Database.filter<Types.SetDocumentType_Type>(
      documentTypeSet,
      func (_, docType) : Bool {
        docType.state == state
      }
    )
  };
  
  // Función para obtener todos los tipos de documento activos
  public func getAllActiveDocumentTypes(
    documentTypeSet: Trie.Trie<Text, Types.SetDocumentType_Type>
  ) : [(Text, Types.SetDocumentType_Type)] {
    findByState(documentTypeSet, "A")
  };
  
  // Función para validar un tipo de documento antes de crearlo
  public func validateDocumentType(docType: Types.SetDocumentType_Type) : Bool {
    if (Utils.isEmptyText(docType.typeDocument)) {
      return false;
    };
    
    if (Utils.isEmptyText(docType.descriptionTypeDocument)) {
      return false;
    };
    
    if (Utils.isEmptyText(docType.state)) {
      return false;
    };
    
    return true;
  };
  
  // Función para verificar si existe un tipo de documento con el mismo nombre
  public func documentTypeExists(
    documentTypeSet: Trie.Trie<Text, Types.SetDocumentType_Type>,
    typeName: Text
  ) : Bool {
    let results = findByDocumentType(documentTypeSet, typeName);
    return results.size() > 0;
  };
}