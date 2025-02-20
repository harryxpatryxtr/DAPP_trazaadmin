import React, { useState } from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";

const UploadFile: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [canisterId, setCanisterId] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };
    const handleCanisterId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCanisterId(event.target.value)
    };


    const uploadFile = async () => {
        if (!selectedFile) {
            alert("Selecciona un archivo primero");
            return;
        }

        setUploading(true);
        try {
            // Convertir el archivo a Uint8Array (equivalente a Nat8[] en Motoko)
            const arrayBuffer = await selectedFile.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            // Llamar al canister `file_storage` para subir el archivo
            await react_project_backend.installWasm(canisterId,[...uint8Array]);

            alert("Archivo subido con éxito a ICP");
        } catch (error) {
            console.error("Error subiendo archivo:", error);
            alert("Error subiendo archivo");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            Archivo
            <input type="file" onChange={handleFileChange} />
            Canister ID
            <input type="text"  value={canisterId} onChange={handleCanisterId}/>
            <button onClick={uploadFile} disabled={!selectedFile || uploading}>
                {uploading ? "Subiendo..." : "Subir Archivo"}
            </button>
        </div>
    );
};

export default UploadFile;
