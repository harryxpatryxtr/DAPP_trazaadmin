// modules/CanisterManager.mo
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Result "mo:base/Result";
import IC "ic:aaaaa-aa";

module {
    // Definición del actor de gestión de Internet Computer
    let management_canister = actor ("aaaaa-aa") : actor {
        create_canister : shared { settings : ?{ controllers : ?[Principal] } } -> async {
            canister_id : Principal;
        };
        install_code : shared {
            canister_id : Principal;
            mode : { #install; #reinstall; #upgrade };
            wasm_module : [Nat8];
            arg : [Nat8];
        } -> async ();
        update_settings : shared {
            canister_id : Principal;
            settings : { controllers : ?[Principal] };
        } -> async ();
        start_canister : shared { canister_id : Principal } -> async ();
        stop_canister : shared { canister_id : Principal } -> async ();
        delete_canister : shared { canister_id : Principal } -> async ();
        canister_status : shared { canister_id : Principal } -> async {
            status : { #running; #stopping; #stopped };
            memory_size : Nat;
            cycles : Nat;
            settings : { controllers : [Principal] };
            module_hash : ?[Nat8];
        };
    };

    // Función para crear un nuevo canister
    public func createCanister(cyclesAmount : Nat) : async Principal {
        // Asignamos ciclos al nuevo canister
        Cycles.add(cyclesAmount);
        // Creamos el canister
        let create_result = await management_canister.create_canister({
            settings = null;
        });

        return create_result.canister_id;
    };

    // Función para crear un canister con controladores específicos
    public func createCanisterWithControllers(cyclesAmount : Nat, controllers : [Principal]) : async Principal {
        Cycles.add(cyclesAmount);
        let create_result = await management_canister.create_canister({
            settings = ?{ controllers = ?controllers };
        });

        return create_result.canister_id;
    };

    // Función para instalar código WASM en un canister
    public func installWasm(canister_id : Text, wasm_module : [Nat8]) : async () {
        await management_canister.install_code({
            canister_id = Principal.fromText(canister_id);
            mode = #install;
            wasm_module = wasm_module;
            arg = [];
        });
    };

    // Función para actualizar código WASM en un canister existente
    public func upgradeWasm(canister_id : Text, wasm_module : [Nat8]) : async () {
        await management_canister.install_code({
            canister_id = Principal.fromText(canister_id);
            mode = #upgrade;
            wasm_module = wasm_module;
            arg = [];
        });
    };

    // Función para iniciar un canister
    public func startCanister(canister_id : Text) : async () {
        await management_canister.start_canister({
            canister_id = Principal.fromText(canister_id);
        });
    };

    // Función para detener un canister
    public func stopCanister(canister_id : Text) : async () {
        await management_canister.stop_canister({
            canister_id = Principal.fromText(canister_id);
        });
    };

    // Función para eliminar un canister
    public func deleteCanister(canister_id : Text) : async () {
        await management_canister.delete_canister({
            canister_id = Principal.fromText(canister_id);
        });
    };

    // Función para obtener el estado de un canister
    public func getCanisterStatus(canister_id : Text) : async {
        status : { #running; #stopping; #stopped };
        memory_size : Nat;
        cycles : Nat;
        settings : { controllers : [Principal] };
        module_hash : ?[Nat8];
    } {
        await management_canister.canister_status({
            canister_id = Principal.fromText(canister_id);
        });
    };

    // Función para actualizar los controladores de un canister
    public func updateCanisterControllers(canister_id : Text, controllers : [Principal]) : async () {
        await management_canister.update_settings({
            canister_id = Principal.fromText(canister_id);
            settings = {
                controllers = ?controllers;
            };
        });
    };

    // Función para interactuar con un canister externo
    // Para un método específico
    public func callExternalCanister(canisterId : Text, amount : Nat) : async Nat {
        let external_canister = actor (canisterId) : actor {
            transfer : (Nat) -> async Nat;
        };

        await external_canister.transfer(amount);
    };
};
