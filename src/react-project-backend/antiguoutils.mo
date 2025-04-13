import Text "mo:base/Text";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Trie "mo:base/Trie";

module Utils {

    public type Key<K> = Trie.Key<K>;

    public func textKey(t : Text) : Key<Text> {
        { hash = Text.hash t; key = t };
    };

    public func getCurrentTimeText() : Text {
        Int.toText(Time.now());
    };

    public func generateId(currentKey : Int) : Text {
        Int.toText(currentKey);
    };

    public func updateEntity<T>(
        trie : Trie.Trie<Text, T>,
        id : Text,
        entity : T,
        keyFunc : (Text) -> Key<Text>,
    ) : Trie.Trie<Text, T> {
        Trie.replace(
            trie,
            keyFunc(id),
            Text.equal,
            ?entity,
        ).0;
    };
};

// //funcion para obtener fecha y hora actual
// public func getCurrentDate() : Text {
//     let ahora : Time.Time = Time.now();
//     return Int.toText(ahora);
// };

// //funcion para reemplazar valores en estructura de datos Trie
// public func replaceInTrie[T](trie : Trie.Trie<Text, T>, key : Text, value : T) : Trie.Trie<Text, T> {
//     return Trie.replace(trie, key, Text.equal, ?value).0;
// };

// //funcion para validar si un registro existe, para actualizar o crear
// public func upsertInTrie[T](trie : Trie.Trie<Text, T>, key : Text, newValue : T) : Trie.Trie<Text, T> {
//     let currentValue = Trie.get(trie, key, Text.equal);
//     switch (currentValue) {
//         case (null) {
//             return replaceInTrie(trie, key, ?newValue);
//         };
//         case (?existingValue) {
//             let updatedValue = updateExistingValue(existingValue, newValue);
//             return replaceInTrie(trie, key, ?updatedValue);
//         };
//     };
// }
// //En esta función, updateExistingValue sería una función que actualiza los campos necesarios en un registro existente

// //funcion para la creacion de canister
// public func createCanister() : async Principal {
//     Cycles.add(2_000_000_000_000);
//     let create_result = await management_canister.create_canister({
//         settings = null;
//     });
//     return create_result.canister_id;
// }


