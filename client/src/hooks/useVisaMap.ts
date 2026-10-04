import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Feature, FeatureCollection, Point } from "geojson";
import type { MapLayerMouseEvent, MapRef } from "react-map-gl/maplibre";
import type { Country } from "../types/country";
import type { VisaStatus } from "../types/visa";
import { normalizeVisaStatus } from "../lib/visa-colors";
import { useMapViewport } from "./useMapViewport";

export interface CountryMarkerProperties {
  code: string;
  iconImage: string;
  name: string;
  status: Exclude<VisaStatus, "visa-required">;
  tier: number;
}

export type CountryMarkerCollection = FeatureCollection<
  Point,
  CountryMarkerProperties
>;

function createCircularFlagImage(
  source: HTMLImageElement | ImageBitmap,
): ImageData | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.beginPath();
  context.arc(32, 32, 29, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = "#0b1010";
  context.fill();
  const scale = Math.max(64 / source.width, 64 / source.height);
  const width = source.width * scale;
  const height = source.height * scale;
  context.drawImage(source, (64 - width) / 2, (64 - height) / 2, width, height);
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

function markerTier(country: Country): number {
  if (country.markerPriority !== undefined)
    return Math.max(1, Math.min(4, country.markerPriority));
  if (["FR", "TR", "TN", "AE", "CA"].includes(country.code)) return 1;
  if (["GB", "EG", "IT", "DE", "MA", "PT", "ES"].includes(country.code))
    return 2;
  if (["JP", "MY", "US"].includes(country.code)) return 3;
  return 4;
}

export function useVisaMap(
  countries: Country[],
  onSelectCountry: (country: Country) => void,
  selectedCountryCode: string | null,
) {
  const mapRef = useRef<MapRef>(null);
  const hoveredCountryCode = useRef<string | null>(null);
  const featuredCountryCode = useRef<string | null>(null);
  const flagRequests = useRef(new Set<string>());
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const countriesByCode = useMemo(
    () => new Map(countries.map((country) => [country.code, country])),
    [countries],
  );
  const markerData = useMemo<CountryMarkerCollection>(
    () => ({
      type: "FeatureCollection",
      features: countries
        .filter(
          (country) =>
            Number.isFinite(country.latitude) &&
            Number.isFinite(country.longitude),
        )
        .map(
          (country) =>
            ({
              type: "Feature",
              id: country.code,
              geometry: {
                type: "Point",
                coordinates: [country.longitude, country.latitude],
              },
              properties: {
                code: country.code,
                iconImage: `visa-flag-${country.code}`,
                name: country.name,
                status: normalizeVisaStatus(country.status),
                tier: markerTier(country),
              },
            }) satisfies Feature<Point, CountryMarkerProperties>,
        ),
    }),
    [countries],
  );

  const registerFlagIcons = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map?.isStyleLoaded()) return;
    const zoom = map.getZoom();
    const maxTier = zoom >= 3.15 ? 4 : zoom >= 2.45 ? 3 : zoom >= 1.65 ? 2 : 1;
    for (const country of countries) {
      if (markerTier(country) > maxTier) continue;
      const imageId = `visa-flag-${country.code}`;
      if (map.hasImage(imageId) || flagRequests.current.has(imageId)) continue;
      flagRequests.current.add(imageId);
      void map
        .loadImage(country.flag)
        .then(({ data }) => {
          if (!map.hasImage(imageId)) {
            const circularImage = createCircularFlagImage(data);
            if (circularImage)
              map.addImage(imageId, circularImage, { pixelRatio: 2 });
          }
        })
        .catch((error) => {
          console.warn(`Unable to load flag for ${country.code}`, error);
        })
        .finally(() => flagRequests.current.delete(imageId));
    }
  }, [countries]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!loaded || !map) return;
    registerFlagIcons();
    map.on("zoomend", registerFlagIcons);
    return () => {
      map.off("zoomend", registerFlagIcons);
    };
  }, [loaded, registerFlagIcons]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!loaded || !map?.getSource("visa-countries")) return;
    if (
      featuredCountryCode.current &&
      featuredCountryCode.current !== selectedCountryCode
    ) {
      map.setFeatureState(
        { source: "visa-countries", id: featuredCountryCode.current },
        { selected: false },
      );
    }
    if (selectedCountryCode && countriesByCode.has(selectedCountryCode)) {
      map.setFeatureState(
        { source: "visa-countries", id: selectedCountryCode },
        { selected: true },
      );
    }
    featuredCountryCode.current = selectedCountryCode;
  }, [countries, countriesByCode, loaded, selectedCountryCode]);

  const { resetView, zoomIn, zoomOut, focusCountry } = useMapViewport(mapRef);
  const onMapLoad = useCallback(() => {
    setLoaded(true);
    setFailed(false);
  }, []);
  const onMapError = useCallback(() => {
    if (!loaded) {
      // MapLibre may emit worker/style errors while a child Layer is mounting.
      // Defer React updates until that render stack has completed.
      queueMicrotask(() => setFailed(true));
    }
  }, [loaded]);
  const onMapClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const properties = event.features?.[0]?.properties as
        | CountryMarkerProperties
        | undefined;
      const country = properties
        ? countriesByCode.get(properties.code)
        : undefined;
      if (country) {
        onSelectCountry(country);
        focusCountry(country);
      }
    },
    [countriesByCode, focusCountry, onSelectCountry],
  );
  const onMapMouseMove = useCallback((event: MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const properties = event.features?.[0]?.properties as
      | CountryMarkerProperties
      | undefined;
    const nextCode = properties?.code ?? null;
    if (hoveredCountryCode.current === nextCode) return;
    if (hoveredCountryCode.current) {
      map.setFeatureState(
        { source: "visa-countries", id: hoveredCountryCode.current },
        { hovered: false },
      );
    }
    hoveredCountryCode.current = nextCode;
    if (nextCode) {
      map.setFeatureState(
        { source: "visa-countries", id: nextCode },
        { hovered: true },
      );
    }
    event.target.getCanvas().style.cursor = nextCode ? "pointer" : "";
  }, []);

  const onMapMouseLeave = useCallback((event: MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const previousCode = hoveredCountryCode.current;
    if (map && previousCode) {
      map.setFeatureState(
        { source: "visa-countries", id: previousCode },
        { hovered: false },
      );
    }
    hoveredCountryCode.current = null;
    event.target.getCanvas().style.cursor = "";
  }, []);
  const selectCountry = useCallback(
    (country: Country) => {
      onSelectCountry(country);
      focusCountry(country);
    },
    [focusCountry, onSelectCountry],
  );

  return {
    mapRef,
    markerData,
    loaded,
    failed,
    onMapLoad,
    onMapError,
    onMapClick,
    onMapMouseMove,
    onMapMouseLeave,
    selectCountry,
    resetView,
    zoomIn,
    zoomOut,
    focusCountry,
  };
}
