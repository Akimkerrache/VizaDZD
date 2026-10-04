import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { config as mapLibreConfig } from "maplibre-gl";
import mapLibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./styles/globals.css";
import "./i18n/index";
import App from "./app/App";

// Use Vite's same-origin emitted worker asset instead of MapLibre's blob worker,
// which may be blocked by browser/CSP policies in development or production.
mapLibreConfig.WORKER_URL = mapLibreWorkerUrl;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
