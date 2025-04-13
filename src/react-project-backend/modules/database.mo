// modules/Database.mo
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Types "../types/types";
import Utils "./utils";

module {
  // Definición del tipo Key para usar con Trie
  type Key<K> = Trie.Key<K>;
  
  // Función para crear una clave a partir de un texto
  public func key(t : Text) : Key<Text> { 
    { hash = Text.hash t; key = t } 
  };

  // Función genérica para crear o actualizar un registro
  public func createOrUpdate<T>(
    collection: Trie.Trie<Text, T>, 
    id: Text, 
    newItem: T, 
    currentKey: Int,
    updateItem: (T, T, Text) -> T  // Función para actualizar campos específicos
  ) : (Trie.Trie<Text, T>, Text, Int) {
    let timestamp = Utils.getCurrentTimestamp();
    
    switch (Trie.get(collection, key(id), Text.equal)) {
      case (null) {
        // Crear nuevo con ID generado
        let newId = Int.toText(currentKey);
        let newCollection = Trie.replace(
          collection,
          key(newId),
          Text.equal,
          ?newItem
        ).0;
        return (newCollection, newId, currentKey + 1);
      };
      case (?existingItem) {
        // Actualizar existente usando la función de actualización
        let updatedItem = updateItem(existingItem, newItem, timestamp);
        let updatedCollection = Trie.replace(
          collection,
          key(id),
          Text.equal,
          ?updatedItem
        ).0;
        return (updatedCollection, id, currentKey);
      };
    };
  };

  // Función genérica para leer un registro por ID
  public func readById<T>(collection: Trie.Trie<Text, T>, id: Text) : ?T {
    Trie.find(collection, key(id), Text.equal)
  };

  // Función genérica para leer todos los registros
  public func readAll<T>(collection: Trie.Trie<Text, T>) : [(Text, T)] {
    Iter.toArray(Trie.iter(collection))
  };
  
  // Función para filtrar registros basados en un predicado
  public func filter<T>(collection: Trie.Trie<Text, T>, predicate: (Text, T) -> Bool) : [(Text, T)] {
    Iter.toArray(
      Iter.filter(
        Trie.iter(collection), 
        func ((k, v) : (Text, T)) : Bool {
          predicate(k, v)
        }
      )
    )
  };
  
  // Función para eliminar un registro por ID
  public func deleteById<T>(collection: Trie.Trie<Text, T>, id: Text) : (Trie.Trie<Text, T>, ?T) {
    Trie.remove(collection, key(id), Text.equal)
  };
  
  // Función para contar el número de registros
  public func count<T>(collection: Trie.Trie<Text, T>) : Nat {
    Iter.size(Trie.iter(collection))
  };
  
  // Función para verificar si existe un registro con un ID específico
  public func exists<T>(collection: Trie.Trie<Text, T>, id: Text) : Bool {
    switch (Trie.get(collection, key(id), Text.equal)) {
      case (null) { false };
      case (?_) { true };
    }
  };
}