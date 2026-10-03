import { ChevronDown, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "ع", name: "العربية" },
  { code: "tz", label: "TZ", name: "Tamaziɣt" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const active =
    languages.find((language) => language.code === i18n.language) ??
    languages[0];
  const setLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    document.documentElement.lang = code === "tz" ? "fr" : code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
  };

  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="VisaDZD — accueil">
        <span className="brand-mark">
          <span />
        </span>
        <span className="brand-name">
          VISA<span>DZD</span>
          <small>GLOBAL INTELLIGENCE</small>
        </span>
      </a>
      <div className="topbar-right">
        <div className="origin-pill">
          <span className="origin-icon">✳</span>
          <span className="origin-label">{t("origin")}</span>
          <span className="origin-country">🇩🇿 {t("algeria")}</span>
          <ChevronDown size={13} />
        </div>
        <label className="language-trigger">
          <Globe2 size={15} />
          <span aria-hidden="true">{active.label}</span>
          <select
            className="language-select"
            value={i18n.language}
            aria-label={t("language")}
            onChange={(event) => setLanguage(event.target.value)}
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
          <ChevronDown size={13} />
        </label>
      </div>
    </header>
  );
}
