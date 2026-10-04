import { ChevronDown, LocateFixed } from "lucide-react";
import { useTranslation } from "react-i18next";
import Brand from "./Brand";
import LanguageSwitcher from "../language/LanguageSwitcher";

export default function SiteHeader() {
  const { t } = useTranslation();
  return (
    <header className="topbar">
      <Brand />
      <div className="topbar-right">
        <div
          className="origin-pill"
          aria-label={`${t("travelOrigin")}: ${t("algeria")}`}
        >
          <LocateFixed size={14} aria-hidden="true" />
          <span className="origin-label">{t("origin")}</span>
          <span className="origin-country">🇩🇿 {t("algeria")}</span>
          <ChevronDown size={13} aria-hidden="true" />
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
