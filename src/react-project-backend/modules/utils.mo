// modules/Utils.mo
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";

module {
    // Función para obtener el timestamp actual como texto
    public func getCurrentTimestamp() : Text {
        let ahora : Time.Time = Time.now();
        Int.toText(ahora);
    };

    // Función para obtener el timestamp actual como Int
    public func getCurrentTime() : Int {
        Time.now();
    };

    // Función para convertir un timestamp a una fecha legible (formato básico)
    public func timestampToReadableDate(timestamp : Int) : Text {
        // Esta es una implementación simplificada
        // Para una implementación completa, considera usar el paquete "time" o "datetime" de Mops
        let seconds = timestamp / 1_000_000_000;
        let nanoseconds = timestamp % 1_000_000_000;

        // Formato simple: "segundos.nanosegundos"
        Int.toText(seconds) # "." # Int.toText(nanoseconds)

        // Nota: Para una implementación completa que convierta a año, mes, día, etc.,
        // se recomienda usar bibliotecas especializadas
    };

    // Función para generar un ID único basado en un prefijo y un contador
    public func generateId(prefix : Text, counter : Nat) : Text {
        prefix # "-" # Nat.toText(counter);
    };

    // Función para validar si un texto está vacío
    public func isEmptyText(text : Text) : Bool {
        text == "";
    };

    // Función para obtener un valor por defecto si el valor es nulo
    public func defaultValue<T>(value : ?T, defaultVal : T) : T {
        Option.get(value, defaultVal);
    };

    // Función para convertir un array de bytes a texto hexadecimal
    public func bytesToHex(bytes : [Nat8]) : Text {
        let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var result = "";
        for (byte in bytes.vals()) {
            let high = Nat8.toNat(byte / 16);
            let low = Nat8.toNat(byte % 16);
            result := result # hex[high] # hex[low];
        };
        result;
    };

    // Función para validar un formato de email básico
    public func isValidEmail(email : Text) : Bool {
        // Motoko no soporta expresiones regulares completas
        // Hacemos una validación básica verificando la presencia de @ y .
        let containsAt = Text.contains(email, #char '@');
        let containsDot = Text.contains(email, #char '.');

        // Verificar que el @ no sea el primer o último carácter
        let notStartsWithAt = not Text.startsWith(email, #char '@');
        let notEndsWithAt = not Text.endsWith(email, #char '@');

        // Verificar que el . no sea el primer o último carácter
        let notStartsWithDot = not Text.startsWith(email, #char '.');
        let notEndsWithDot = not Text.endsWith(email, #char '.');

        // Verificar que el email no esté vacío
        let notEmpty = Text.size(email) > 0;

        // Combinar todas las condiciones
        notEmpty and containsAt and containsDot and notStartsWithAt and notEndsWithAt and notStartsWithDot and notEndsWithDot;
    };

    // Función para truncar un texto a una longitud máxima
    public func truncateText(text : Text, maxLength : Nat) : Text {
        if (Text.size(text) <= maxLength) {
            return text;
        };

        // Convertir a un array de caracteres
        let chars = Text.toArray(text);
        // Tomar solo los primeros maxLength caracteres
        let truncated = Array.tabulate<Char>(
            Nat.min(maxLength, chars.size()),
            func(i) { chars[i] },
        );
        // Convertir de vuelta a texto y añadir los puntos suspensivos
        Text.fromArray(truncated) # "...";
    };

    // Función para convertir un Principal a Text
    public func principalToText(p : Principal) : Text {
        Principal.toText(p);
    };

    // Función para intentar convertir un Text a Principal
    public func textToPrincipal(t : Text) : ?Principal {
        let p = Principal.fromText(t);
        ?p;
    };
};
