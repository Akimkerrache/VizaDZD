import type { RefObject } from "react";
import { useState } from "react";
import Map, {
  type MapLayerMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre";
import { useTranslation } from "react-i18next";
import type { CountryMarkerCollection } from "../../hooks/useVisaMap";
import { getInitialMapView, MAP_STYLE } from "../../lib/constants";
import CountryMarkers, { VISA_MARKER_HIT_LAYER_IDS } from "./CountryMarkers";

interface MapContainerProps {
  markerData: CountryMarkerCollection;
  mapRef: RefObject<MapRef | null>;
  loaded: boolean;
  failed: boolean;
  onMapLoad: () => void;
  onMapError: () => void;
  onMapClick: (event: MapLayerMouseEvent) => void;
  onMapMouseMove: (event: MapLayerMouseEvent) => void;
  onMapMouseLeave: (event: MapLayerMouseEvent) => void;
}

export default function MapContainer({
  markerData,
  mapRef,
  loaded,
  failed,
  onMapLoad,
  onMapError,
  onMapClick,
  onMapMouseMove,
  onMapMouseLeave,
}: MapContainerProps) {
  const { t } = useTranslation();
  const [initialViewState] = useState(getInitialMapView);

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle={MAP_STYLE}
        minZoom={-1.2}
        maxZoom={8}
        dragPan
        scrollZoom
        doubleClickZoom
        touchZoomRotate
        dragRotate={false}
        touchPitch={false}
        attributionControl={{ compact: true }}
        interactiveLayerIds={VISA_MARKER_HIT_LAYER_IDS}
        onLoad={onMapLoad}
        onError={onMapError}
        onClick={onMapClick}
        onMouseMove={onMapMouseMove}
        onMouseLeave={onMapMouseLeave}
        aria-label={t("visaMap")}
      >
        <CountryMarkers data={markerData} />
      </Map>
      {!loaded && (
        <div
          className={`map-loading ${failed ? "is-error" : ""}`}
          role="status"
        >
          {!failed && (
            <span className="map-loading-spinner" aria-hidden="true" />
          )}
          {t(failed ? "mapError" : "mapLoading")}
        </div>
      )}
    </>
  );
}
