import type { CSSProperties } from "react";
import { ArrowUpRight, Clock3, FileCheck2, Plane, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Country } from "../../types/country";
import { formatFee, getVisaStatusTranslationKey } from "../../lib/utils";
import { VISA_COLORS, normalizeVisaStatus } from "../../lib/visa-colors";

interface CountryPopupProps {
  country: Country;
  onClose: () => void;
  onApply: () => void;
}

export default function CountryPopup({
  country,
  onClose,
  onApply,
}: CountryPopupProps) {
  const { t } = useTranslation();
  const statusKey = getVisaStatusTranslationKey(country.status);
  const statusColor = VISA_COLORS[normalizeVisaStatus(country.status)];
  const statusStyle = { "--status-color": statusColor } as CSSProperties;

  return (
    <aside
      className="country-panel"
      aria-label={t("countryInformation", { country: country.name })}
    >
      <div className="panel-topline">
        <span className="section-kicker">
          <span
            className="status-indicator"
            style={statusStyle}
            aria-hidden="true"
          />
          {t("selected")}
        </span>
        <button
          className="panel-close"
          type="button"
          onClick={onClose}
          aria-label={t("close")}
        >
          <X size={16} />
        </button>
      </div>
      <div className="country-heading">
        <span className="country-flag-large" aria-hidden="true">
          <img src={country.flag} alt="" />
        </span>
        <div>
          <h2>{country.name}</h2>
          <p>
            {country.capital} <span aria-hidden="true">·</span> {country.region}
          </p>
        </div>
      </div>
      <div className="visa-status" style={statusStyle}>
        <span className="status-symbol" aria-hidden="true">
          {country.status === "visa-free"
            ? "✓"
            : country.status === "e-visa"
              ? "↗"
              : "!"}
        </span>
        <span>{t(statusKey)}</span>
        <span className="status-context">{t("statusFor")}</span>
      </div>
      <p className="country-summary">{country.summary}</p>
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-icon">
            <Plane size={14} aria-hidden="true" />
          </span>
          <span className="stat-label">{t("stay")}</span>
          <strong>
            {country.stayDays === null ? (
              t("check")
            ) : (
              <>
                {country.stayDays} <small>{t("days")}</small>
              </>
            )}
          </strong>
        </div>
        <div className="stat-item">
          <span className="stat-icon">
            <Clock3 size={14} aria-hidden="true" />
          </span>
          <span className="stat-label">{t("processing")}</span>
          <strong>{country.processingDays}</strong>
        </div>
        <div className="stat-item">
          <span className="stat-icon">
            <FileCheck2 size={14} aria-hidden="true" />
          </span>
          <span className="stat-label">{t("consularFee")}</span>
          <strong>{formatFee(country.fee, t("free"), t("check"))}</strong>
        </div>
      </div>
      <section
        className="panel-requirements"
        aria-labelledby="requirements-heading"
      >
        <h3 id="requirements-heading" className="requirements-title">
          {t("requirements")}
          <span>{country.requirements.length.toString().padStart(2, "0")}</span>
        </h3>
        <ul>
          {country.requirements.slice(0, 4).map((requirement, index) => (
            <li key={requirement}>
              <span className="requirement-index">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              {requirement}
            </li>
          ))}
        </ul>
      </section>
      <section
        className="country-notes"
        aria-labelledby="country-notes-heading"
      >
        <h3 id="country-notes-heading" className="requirements-title">
          {t("importantNotes")}
        </h3>
        <ul>
          {(country.importantNotes?.length
            ? country.importantNotes
            : [t("notesFallback")]
          ).map((note, index) => (
            <li key={`${index}-${note}`}>{note}</li>
          ))}
        </ul>
      </section>
      <button className="button-primary" type="button" onClick={onApply}>
        {t("apply")}
        <ArrowUpRight size={16} aria-hidden="true" />
      </button>
      <p className="panel-footnote">
        <span aria-hidden="true">ⓘ</span>
        {t("verified")}
      </p>
    </aside>
  );
}
