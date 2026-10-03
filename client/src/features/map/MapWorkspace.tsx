import { useEffect, useMemo, useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  type MapRef,
} from "react-map-gl/maplibre";
import { Compass, Crosshair, Layers3, Search, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCountries } from "../countries/useCountries";
import type { Country, VisaStatus } from "../../types/country";
import Header from "../../components/Header";
import CountryPanel from "./CountryPanel";
import ApplicationDialog from "../applications/ApplicationDialog";

const mapStyle =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const mapStyleWithoutLabels =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export default function MapWorkspace() {
  const { t } = useTranslation();
  const { data: countries = [], isError } = useCountries();
  const [selected, setSelected] = useState<Country | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<VisaStatus | "all">("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const [minimalMap, setMinimalMap] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(
    () =>
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "all" || country.status === filter),
      ),
    [countries, search, filter],
  );

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <main className="map-shell">
      <Map
        ref={mapRef}
        initialViewState={{ longitude: 14, latitude: 27, zoom: 1.45 }}
        mapStyle={minimalMap ? mapStyleWithoutLabels : mapStyle}
        minZoom={1.1}
        maxZoom={8}
        cooperativeGestures
        onLoad={() => setMapLoaded(true)}
        onError={() => setMapFailed(true)}
        aria-label="Carte interactive des destinations et conditions de visa"
      >
        <NavigationControl
          position="bottom-right"
          showCompass
          visualizePitch={false}
        />
        {countries.map((country) => (
          <Marker
            key={country.code}
            longitude={country.longitude}
            latitude={country.latitude}
            anchor="center"
          >
            <button
              className={`map-marker ${country.status} ${selected?.code === country.code ? "active" : ""}`}
              onClick={() => setSelected(country)}
              aria-label={`${country.name} — ${country.status}`}
              title={country.name}
            >
              <span className="marker-pulse" />
              <span className="marker-dot">{country.flag}</span>
            </button>
          </Marker>
        ))}
      </Map>
      {!mapLoaded && (
        <div
          className={`map-loading ${mapFailed ? "is-error" : ""}`}
          role="status"
        >
          {!mapFailed && <span className="map-loading-spinner" />}
          {t(mapFailed ? "mapError" : "mapLoading")}
        </div>
      )}
      <div className="map-vignette" aria-hidden="true" />
      <Header />

      <section className="hero-copy" aria-labelledby="hero-title">
        <div className="eyebrow">
          <span className="live-dot" />
          {t("intelligence")}
        </div>
        <h1 id="hero-title">{t("headline")}</h1>
        <p>{t("subtitle")}</p>
      </section>

      <section className="explorer-card" aria-label={t("discover")}>
        <div className="explorer-topline">
          <span className="section-kicker">
            <Sparkles size={12} />
            {t("discover")}
          </span>
          <span className="result-count">
            {filtered.length.toString().padStart(2, "0")} {t("destinations")}
          </span>
        </div>
        <label className="search-wrap">
          <Search size={15} aria-hidden="true" />
          <input
            ref={searchRef}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("search")}
            aria-label={t("search")}
          />
          <kbd>⌘ K</kbd>
        </label>
        <div
          className="filter-row"
          role="group"
          aria-label={t("filterDestinations")}
        >
          {(
            [
              ["all", t("all")],
              ["visa-free", t("visaFree")],
              ["e-visa", t("eVisa")],
              ["visa-required", t("required")],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              className={`filter-chip ${filter === value ? "selected" : ""}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="country-results">
          {filtered.slice(0, 5).map((country) => (
            <button
              key={country.code}
              className={`country-result ${selected?.code === country.code ? "current" : ""}`}
              onClick={() => setSelected(country)}
            >
              <span className="result-flag">{country.flag}</span>
              <span className="result-name">
                {country.name}
                <small>{country.region}</small>
              </span>
              <span
                className={`status-indicator ${country.status}`}
                aria-label={country.status}
              />
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="empty-results">{t("noResults")}</p>
          )}
        </div>
      </section>

      <div className="map-hud hud-top-left">
        <span className="hud-pip" />
        {t("platform")}
        <span className="hud-divider" />
        {countries.length} DEST.
      </div>
      <div className="map-hud hud-bottom-left">
        <Compass size={13} />
        <span>36° 45′ N</span>
        <span className="hud-divider" />
        <span>03° 03′ E</span>
        <span className="hud-divider" />
        ALGER
      </div>
      <div className="map-actions" aria-label="Outils de carte">
        <button
          className="icon-control"
          aria-label={t("centerMap")}
          title={t("centerMap")}
          onClick={() =>
            mapRef.current?.flyTo({
              center: [14, 27],
              zoom: 1.45,
              duration: 800,
            })
          }
        >
          <Crosshair size={16} />
        </button>
        <button
          className="icon-control"
          aria-label={t("mapLayers")}
          title={t("mapLayers")}
          onClick={() => setMinimalMap((value) => !value)}
        >
          <Layers3 size={16} />
        </button>
      </div>

      <aside className="map-legend" aria-label={t("legendTitle")}>
        <span className="legend-heading">{t("legendTitle")}</span>
        <span>
          <i className="legend-dot visa-free" />
          {t("visaFree")}
        </span>
        <span>
          <i className="legend-dot e-visa" />
          {t("eVisa")}
        </span>
        <span>
          <i className="legend-dot visa-required" />
          {t("required")}
        </span>
      </aside>

      {selected && (
        <CountryPanel
          country={selected}
          onClose={() => setSelected(null)}
          onApply={() => setDialogOpen(true)}
        />
      )}
      {dialogOpen && selected && (
        <ApplicationDialog
          country={selected}
          onClose={() => setDialogOpen(false)}
        />
      )}
      {isError && (
        <div className="api-note" role="status">
          {t("offlineData")}
        </div>
      )}
    </main>
  );
}
