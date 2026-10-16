import { useTranslation } from "react-i18next";

export default function Brand() {
  const { t } = useTranslation();
  return (
    <a className="brand" href="/" aria-label="VisaDZD — accueil">
      <img src="/logo-v.png" alt="VisaDZD Logo" className="h-8" />
      {/* <span className="brand-mark" aria-hidden="true">
        <span />
      </span> */}
      <span className="brand-name">
        VISA<span>DZD</span>
        <small>GLOBAL INTELLIGENCE</small>
      </span>
      <span className="sr-only">{t("intelligence")}</span>
    </a>
  );
}
