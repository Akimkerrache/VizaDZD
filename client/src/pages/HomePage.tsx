import { useCallback, useEffect, useRef, useState } from "react";
import { Compass } from "lucide-react";
import { useTranslation } from "react-i18next";
import CountryExplorer from "../components/country/CountryExplorer";
import CountryPopup from "../components/country/CountryPopup";
import ApplicationModal from "../components/application/ApplicationModal";
import MapContainer from "../components/map/MapContainer";
import MapControls from "../components/map/MapControls";
import MapLegend from "../components/map/MapLegend";
import SiteHeader from "../components/layout/SiteHeader";
import { useCountries } from "../hooks/useCountries";
import { useCountryFilters } from "../hooks/useCountryFilters";
import { useCountrySelection } from "../hooks/useCountrySelection";
import { useVisaMap } from "../hooks/useVisaMap";
import type { Country } from "../types/country";

export default function HomePage() {
  const { t } = useTranslation();
  const { data: countryResult, isFetching } = useCountries();
  const countries = countryResult?.countries ?? [];
  const { search, setSearch, filter, setFilter, visibleCountries } =
    useCountryFilters(countries);
  const {
    selectedCountry,
    selectedCountryCode,
    selectCountry: setSelectedCountry,
    closeCountry,
  } = useCountrySelection(countries);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const selectCountry = useCallback(
    (country: Country) => setSelectedCountry(country),
    [setSelectedCountry],
  );
  const visaMap = useVisaMap(countries, selectCountry, selectedCountryCode);
  const searchRef = useRef<HTMLInputElement>(null);
  const closeApplication = useCallback(() => setApplicationOpen(false), []);
  const closeCountryPanel = useCallback(() => {
    closeCountry();
    window.requestAnimationFrame(() => {
      visaMap.mapRef.current
        ?.getMap()
        .getCanvas()
        .focus({ preventScroll: true });
    });
  }, [closeCountry, visaMap.mapRef]);

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
      <MapContainer
        markerData={visaMap.markerData}
        mapRef={visaMap.mapRef}
        loaded={visaMap.loaded}
        failed={visaMap.failed}
        onMapLoad={visaMap.onMapLoad}
        onMapError={visaMap.onMapError}
        onMapClick={visaMap.onMapClick}
        onMapMouseMove={visaMap.onMapMouseMove}
        onMapMouseLeave={visaMap.onMapMouseLeave}
      />
      <div className="map-vignette" aria-hidden="true" />
      <SiteHeader />

      <section className="hero-copy" aria-labelledby="hero-title">
        <div className="eyebrow">
          <span className="live-dot" aria-hidden="true" />
          {t("intelligence")}
        </div>
        <h1 id="hero-title">{t("headline")}</h1>
        <p>{t("subtitle")}</p>
      </section>

      <CountryExplorer
        countries={visibleCountries}
        search={search}
        filter={filter}
        selectedCountryCode={selectedCountryCode}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
        onSelectCountry={visaMap.selectCountry}
        searchInputRef={searchRef}
      />

      <div className="map-hud hud-top-left">
        <span className="hud-pip" aria-hidden="true" />
        {t("platform")}
        <span className="hud-divider" />
        {visibleCountries.length} {t("destinations")}
      </div>
      <div className="map-hud hud-bottom-left">
        <Compass size={13} aria-hidden="true" />
        <span>36° 45′ N</span>
        <span className="hud-divider" />
        <span>03° 03′ E</span>
        <span className="hud-divider" />
        ALGER
      </div>
      <MapControls
        onZoomIn={visaMap.zoomIn}
        onZoomOut={visaMap.zoomOut}
        onResetView={visaMap.resetView}
      />
      <MapLegend />

      {isFetching && (
        <span className="data-loading" role="status">
          {t("loadingCountries")}
        </span>
      )}
      {countryResult?.isFallback && (
        <div className="api-note" role="status">
          {t("offlineData")}
        </div>
      )}
      {selectedCountry && (
        <CountryPopup
          country={selectedCountry}
          onClose={closeCountryPanel}
          onApply={() => setApplicationOpen(true)}
        />
      )}
      {applicationOpen && selectedCountry && (
        <ApplicationModal
          country={selectedCountry}
          onClose={closeApplication}
        />
      )}
    </main>
  );
}
