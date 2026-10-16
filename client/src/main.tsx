import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { config as mapLibreConfig } from "maplibre-gl";
import mapLibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./styles/globals.css";
import "./i18n/index";
import App from "./app/App";

// ?worker&url emits a .js file; hosts like Hostinger serve .mjs as text/plain.
mapLibreConfig.WORKER_URL = mapLibreWorkerUrl;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
