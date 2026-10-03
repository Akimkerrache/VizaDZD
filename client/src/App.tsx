import { Navigate, Route, Routes } from "react-router-dom";
import MapWorkspace from "./features/map/MapWorkspace";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MapWorkspace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
