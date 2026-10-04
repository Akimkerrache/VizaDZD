import { ChevronDown, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { languageDirections } from "../../i18n";
import type { SupportedLanguage } from "../../types/application";

const languages: Array<{
  value: SupportedLanguage;
  label: string;
  nativeName: string;
}> = [
  { value: "fr", label: "FR", nativeName: "Français" },
  { value: "en", label: "EN", nativeName: "English" },
  { value: "ar", label: "ع", nativeName: "العربية" },
  { value: "kab", label: "KAB", nativeName: "Taqbaylit" },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const activeLanguage =
    languages.find((language) => language.value === i18n.language) ??
    languages[0];

  const handleChange = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = languageDirections[language];
  };

  return (
    <label className="language-switcher">
      <Globe2 size={15} aria-hidden="true" />
      <span aria-hidden="true">{activeLanguage.label}</span>
      <select
        aria-label={t("language")}
        value={activeLanguage.value}
        onChange={(event) =>
          handleChange(event.target.value as SupportedLanguage)
        }
      >
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.nativeName}
          </option>
        ))}
      </select>
      <ChevronDown size={13} aria-hidden="true" />
    </label>
  );
}
