import { useCallback, type RefObject } from "react";
import type { MapRef } from "react-map-gl/maplibre";
import type { Country } from "../types/country";
import { getInitialMapView } from "../lib/constants";

export function useMapViewport(mapRef: RefObject<MapRef | null>) {
  const resetView = useCallback(() => {
    const initialView = getInitialMapView();
    mapRef.current?.flyTo({
      center: [initialView.longitude, initialView.latitude],
      zoom: initialView.zoom,
      duration: 750,
      essential: true,
    });
  }, [mapRef]);

  const zoomIn = useCallback(
    () => mapRef.current?.zoomIn({ duration: 300 }),
    [mapRef],
  );
  const zoomOut = useCallback(
    () => mapRef.current?.zoomOut({ duration: 300 }),
    [mapRef],
  );

  const focusCountry = useCallback(
    (country: Country) => {
      mapRef.current?.flyTo({
        center: [country.longitude, country.latitude],
        zoom: Math.min(Math.max(mapRef.current.getZoom(), 4.2), 5.6),
        duration: 850,
        essential: true,
      });
    },
    [mapRef],
  );

  return { resetView, zoomIn, zoomOut, focusCountry };
}
