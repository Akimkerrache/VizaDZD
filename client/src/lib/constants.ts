export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";
export const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
/** Public Carto vector basemap: free to use, no client key required. */
export function getInitialMapView(
  viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth,
) {
  return {
    longitude: 0,
    latitude: 20,
    zoom: Math.max(-1.2, Math.log2(Math.max(viewportWidth, 320) / 512) - 0.12),
  } as const;
}
export const SUPPORTED_LANGUAGES = ["fr", "en", "ar", "kab"] as const;
