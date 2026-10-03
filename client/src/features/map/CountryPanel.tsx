import { useTranslation } from "react-i18next";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  FileCheck2,
  Plane,
  X,
} from "lucide-react";
import type { Country } from "../../types/country";

interface CountryPanelProps {
  country: Country;
  onClose: () => void;
  onApply: () => void;
}

export default function CountryPanel({
  country,
  onClose,
  onApply,
}: CountryPanelProps) {
  const { t } = useTranslation();
  const status =
    country.status === "visa-free"
      ? t("visaFree")
      : country.status === "e-visa"
        ? t("eVisa")
        : t("required");
  return (
    <aside
      className="country-panel"
      aria-label={`${country.name} visa information`}
    >
      <div className="panel-topline">
        <span className="section-kicker">
          <span className={`status-indicator ${country.status}`} />
          {t("selected")}
        </span>
        <button
          className="panel-close"
          onClick={onClose}
          aria-label={t("close")}
        >
          <X size={16} />
        </button>
      </div>
      <div className="country-heading">
        <span className="country-flag-large">{country.flag}</span>
        <div>
          <h2>{country.name}</h2>
          <p>
            {country.capital} <span>·</span> {country.region}
          </p>
        </div>
      </div>
      <div className={`visa-status ${country.status}`}>
        <span className="status-symbol">
          {country.status === "visa-free"
            ? "✓"
            : country.status === "e-visa"
              ? "↗"
              : "!"}
        </span>
        <span>{status}</span>
        <span className="status-context">{t("statusFor")}</span>
      </div>
      <p className="country-summary">{country.summary}</p>
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-icon">
            <Plane size={14} />
          </span>
          <span className="stat-label">{t("stay")}</span>
          <strong>
            {country.stayDays} <small>{t("days")}</small>
          </strong>
        </div>
        <div className="stat-item">
          <span className="stat-icon">
            <Clock3 size={14} />
          </span>
          <span className="stat-label">{t("processing")}</span>
          <strong>{country.processingDays}</strong>
        </div>
        <div className="stat-item">
          <span className="stat-icon">
            <FileCheck2 size={14} />
          </span>
          <span className="stat-label">{t("consularFee")}</span>
          <strong>
            {country.fee === null
              ? t("check")
              : country.fee === 0
                ? t("free")
                : `${country.fee} €`}
          </strong>
        </div>
      </div>
      <div className="panel-requirements">
        <div className="requirements-title">
          {t("requirements")}
          <span>{country.requirements.length.toString().padStart(2, "0")}</span>
        </div>
        <ul>
          {country.requirements.slice(0, 3).map((requirement, index) => (
            <li key={requirement}>
              <span className="requirement-index">0{index + 1}</span>
              {requirement}
            </li>
          ))}
        </ul>
      </div>
      <button className="primary-cta" onClick={onApply}>
        {t("apply")}
        <ArrowUpRight size={16} />
      </button>
      <p className="panel-footnote">
        <span>ⓘ</span>
        {t("verified")}
      </p>
      <ArrowDownRight className="panel-ornament" aria-hidden="true" />
    </aside>
  );
}
