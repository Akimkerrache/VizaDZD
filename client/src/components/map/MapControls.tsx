import { Crosshair, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onResetView,
}: MapControlsProps) {
  const { t } = useTranslation();
  return (
    <div className="map-actions" role="group" aria-label={t("controlPanel")}>
      <button
        className="icon-control"
        type="button"
        aria-label={t("centerMap")}
        title={t("centerMap")}
        onClick={onResetView}
      >
        <Crosshair size={16} aria-hidden="true" />
      </button>
      <button
        className="icon-control"
        type="button"
        aria-label={t("zoomOut")}
        title={t("zoomOut")}
        onClick={onZoomOut}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <button
        className="icon-control"
        type="button"
        aria-label={t("zoomIn")}
        title={t("zoomIn")}
        onClick={onZoomIn}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
