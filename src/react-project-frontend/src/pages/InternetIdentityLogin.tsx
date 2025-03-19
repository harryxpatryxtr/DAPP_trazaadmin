import React from "react";
import { react_project_backend } from "../../../declarations/react-project-backend";

const InternetIdentityLogin =  () => {
    const handleClick = async () => {
        const principal = await react_project_backend.whoami();
        console.log(`Your principal is: ${principal.toText()}`);
      };
    return (
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        
      </button>
    );
  };
export default InternetIdentityLogin;
