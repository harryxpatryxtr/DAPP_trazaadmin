// modules/ParentCompanyManager.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Types "../types/types";
import Database "./database";
import Utils "./utils";
import CanisterManager "./canistermanager";

module {
  // Función para crear o actualizar una empresa matriz
  public func createParentCompany(
    parentCompanyREO: Trie.Trie<Text, Types.ParentCompanyREO_Type>,
    parentCompany: Types.ParentCompanyREO_Type,
    parentCompanyREOKey: Int,
    self: actor {}
  ) : (Trie.Trie<Text, Types.ParentCompanyREO_Type>, Text, Int) {
    
    // Función para actualizar campos específicos
    func updateParentCompany(
      existing: Types.ParentCompanyREO_Type, 
      new: Types.ParentCompanyREO_Type,
      timestamp: Text
    ) : Types.ParentCompanyREO_Type {
      {
        idParentCompany = new.idParentCompany;
        glnParentCompany = new.glnParentCompany;
        parentCompany = new.parentCompany;
        parentCompanyRuc = new.parentCompanyRuc;
        parentCompanyUbigeo = new.parentCompanyUbigeo;
        parentCompanyAddress = new.parentCompanyAddress;
        parentCompanyLocation = new.parentCompanyLocation;
        parentCompanyContactEmail = new.parentCompanyContactEmail;
        parentCompanyContactCellular = new.parentCompanyContactCellular;
        parentCompanyWeb = new.parentCompanyWeb;
        logo = new.logo;
        idCanisterData = existing.idCanisterData;
        idCanisterAssets = existing.idCanisterAssets;
        state = new.state;
        userCreated = existing.userCreated;
        creationDate = existing.creationDate;
        userUpdate = new.userUpdate;
        updateDate = timestamp;
      }
    };
    
    // Verificar si es una creación o actualización
    switch (Trie.get(parentCompanyREO, Database.key(parentCompany.idParentCompany), Text.equal)) {
      case (null) {
        // Es una creación, crear nuevos canisters
        return createNewParentCompany(
          parentCompanyREO,
          parentCompany,
          parentCompanyREOKey,
          self
        );
      };
      case (?existing) {
        // Es una actualización, usar los canisters existentes
        let newItem = updateParentCompany(existing, parentCompany, Utils.getCurrentTimestamp());
        let updatedCollection = Trie.replace(
          parentCompanyREO,
          Database.key(parentCompany.idParentCompany),
          Text.equal,
          ?newItem
        ).0;
        
        return (updatedCollection, parentCompany.idParentCompany, parentCompanyREOKey);
      };
    };
  };
  
  // Función privada para crear una nueva empresa matriz con nuevos canisters
  private func createNewParentCompany(
    parentCompanyREO: Trie.Trie<Text, Types.ParentCompanyREO_Type>,
    parentCompany: Types.ParentCompanyREO_Type,
    parentCompanyREOKey: Int,
    self: actor {}
  ) : (Trie.Trie<Text, Types.ParentCompanyREO_Type>, Text, Int) {
    
    // Esta función debe ser llamada de forma asíncrona desde el actor principal
    // ya que crea nuevos canisters, lo que requiere operaciones async
    
    // En el actor principal, se crearán los canisters y se pasarán sus IDs
    // Aquí solo simulamos la creación para la estructura del módulo
    
    let newId = Int.toText(parentCompanyREOKey);
    
    let newItem : Types.ParentCompanyREO_Type = {
      idParentCompany = newId;
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
      idCanisterAssets = parentCompany.idCanisterAssets;
      state = parentCompany.state;
      userCreated = parentCompany.userCreated;
      creationDate = Utils.getCurrentTimestamp();
      userUpdate = parentCompany.userUpdate;
      updateDate = parentCompany.updateDate;
    };
    
    let newCollection = Trie.replace(
      parentCompanyREO,
      Database.key(newId),
      Text.equal,
      ?newItem
    ).0;
    
    return (newCollection, newId, parentCompanyREOKey + 1);
  };
  
  // Función para buscar empresas matrices por nombre
  public func findByCompanyName(
    parentCompanyREO: Trie.Trie<Text, Types.ParentCompanyREO_Type>,
    name: Text
  ) : [(Text, Types.ParentCompanyREO_Type)] {
    Database.filter<Types.ParentCompanyREO_Type>(
      parentCompanyREO,
      func (_, company) : Bool {
        Text.contains(company.parentCompany, #text name)
      }
    )
  };
  
  // Función para buscar empresas matrices por RUC
  public func findByRuc(
    parentCompanyREO: Trie.Trie<Text, Types.ParentCompanyREO_Type>,
    ruc: Text
  ) : ?Types.ParentCompanyREO_Type {
    let results = Database.filter<Types.ParentCompanyREO_Type>(
      parentCompanyREO,
      func (_, company) : Bool {
        company.parentCompanyRuc == ruc
      }
    );
    
    if (results.size() > 0) {
      ?results[0].1
    } else {
      null
    }
  };
  
  // Función para obtener todas las empresas matrices activas
  public func getAllActiveCompanies(
    parentCompanyREO: Trie.Trie<Text, Types.ParentCompanyREO_Type>
  ) : [(Text, Types.ParentCompanyREO_Type)] {
    Database.filter<Types.ParentCompanyREO_Type>(
      parentCompanyREO,
      func (_, company) : Bool {
        company.state == "A"
      }
    )
  };
  
  // Función para validar una empresa matriz antes de crearla
  public func validateParentCompany(company: Types.ParentCompanyREO_Type) : Bool {
    if (Utils.isEmptyText(company.parentCompany)) {
      return false;
    };
    
    if (Utils.isEmptyText(company.parentCompanyRuc)) {
      return false;
    };
    
    if (Utils.isEmptyText(company.parentCompanyContactEmail)) {
      return false;
    };
    
    if (not Utils.isValidEmail(company.parentCompanyContactEmail)) {
      return false;
    };
    
    return true;
  };
}