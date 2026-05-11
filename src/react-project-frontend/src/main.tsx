// Polyfill for process (needed for DFX-generated declarations)
// @ts-ignore - process is not defined in browser environment
if (typeof process === "undefined") {
  // @ts-ignore
  globalThis.process = {
    env: import.meta.env,
  };
}

import React from "react";
import { AuthProvider } from "@/context/AuthProvider";
import ReactDOM from "react-dom/client";
import AppRoutes from "./router/router";
import "./index.css";
import { ActorProvider, AgentProvider } from "@ic-reactor/react";
import {
  idlFactory,
  canisterId
} from "../../declarations/react-project-backend";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
   <AuthProvider>
    <AppRoutes />
   </AuthProvider>
  </React.StrictMode>
);
