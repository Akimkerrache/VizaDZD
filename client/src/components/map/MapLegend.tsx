import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import type { CanonicalVisaStatus } from "../../types/visa";
import { VISA_COLORS, VISA_STATUS_LABEL_KEYS } from "../../lib/visa-colors";

const legendItems: CanonicalVisaStatus[] = [
  "visa-free",
  "e-visa",
  "visa-on-arrival",
  "embassy-visa",
  "no-access",
  "visa-unknown",
];

export default function MapLegend() {
  const { t } = useTranslation();
  return (
    <aside className="map-legend" aria-label={t("legendTitle")}>
      <span className="legend-heading">{t("legendTitle")}</span>
      {legendItems.map((status) => (
        <span key={status}>
          <i
            className="legend-dot"
            style={{ "--legend-color": VISA_COLORS[status] } as CSSProperties}
            aria-hidden="true"
          />
          {t(VISA_STATUS_LABEL_KEYS[status])}
        </span>
      ))}
    </aside>
  );
}
