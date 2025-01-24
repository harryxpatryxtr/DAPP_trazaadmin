import React from "react";
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
    <AppRoutes />
  </React.StrictMode>
);
