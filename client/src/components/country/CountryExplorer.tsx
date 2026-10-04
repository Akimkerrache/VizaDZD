import type { CSSProperties, RefObject } from "react";
import { Search, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Country } from "../../types/country";
import type { VisaFilter } from "../../types/visa";
import {
  VISA_COLORS,
  VISA_STATUS_LABEL_KEYS,
  normalizeVisaStatus,
} from "../../lib/visa-colors";

interface CountryExplorerProps {
  countries: Country[];
  search: string;
  filter: VisaFilter;
  selectedCountryCode: string | null;
  onSearchChange: (search: string) => void;
  onFilterChange: (filter: VisaFilter) => void;
  onSelectCountry: (country: Country) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

const filters: Array<{ value: VisaFilter; label: string }> = [
  { value: "all", label: "all" },
  { value: "visa-free", label: "visaFree" },
  { value: "e-visa", label: "eVisa" },
  { value: "visa-on-arrival", label: "visaOnArrival" },
  { value: "embassy-visa", label: "embassyVisa" },
  { value: "no-access", label: "noAccess" },
  { value: "visa-unknown", label: "visaUnknown" },
];

export default function CountryExplorer({
  countries,
  search,
  filter,
  selectedCountryCode,
  onSearchChange,
  onFilterChange,
  onSelectCountry,
  searchInputRef,
}: CountryExplorerProps) {
  const { t } = useTranslation();
  return (
    <section className="explorer-card" aria-label={t("discover")}>
      <div className="explorer-topline">
        <span className="section-kicker">
          <Sparkles size={12} aria-hidden="true" />
          {t("discover")}
        </span>
        <span className="result-count">
          {countries.length.toString().padStart(2, "0")} {t("destinations")}
        </span>
      </div>
      <label className="search-wrap">
        <Search size={15} aria-hidden="true" />
        <input
          ref={searchInputRef}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("search")}
          aria-label={t("search")}
        />
        <kbd aria-hidden="true">⌘ K</kbd>
      </label>
      <div
        className="filter-row"
        role="group"
        aria-label={t("filterDestinations")}
      >
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`filter-chip ${filter === value ? "selected" : ""}`}
            aria-pressed={filter === value}
            onClick={() => onFilterChange(value)}
          >
            {t(label)}
          </button>
        ))}
      </div>
      <div className="country-results" aria-live="polite">
        {countries.slice(0, 6).map((country) => (
          <button
            key={country.code}
            type="button"
            className={`country-result ${selectedCountryCode === country.code ? "current" : ""}`}
            onClick={() => onSelectCountry(country)}
          >
            <span className="result-flag" aria-hidden="true">
              <img src={country.flag} alt="" loading="lazy" />
            </span>
            <span className="result-name">
              {country.name}
              <small>{country.region}</small>
            </span>
            <span
              className="status-indicator"
              style={
                {
                  "--status-color":
                    VISA_COLORS[normalizeVisaStatus(country.status)],
                } as CSSProperties
              }
              aria-label={t(
                VISA_STATUS_LABEL_KEYS[normalizeVisaStatus(country.status)],
              )}
            />
          </button>
        ))}
        {countries.length === 0 && (
          <p className="empty-results">{t("noResults")}</p>
        )}
      </div>
    </section>
  );
}
