import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr/common.json";
import en from "./locales/en/common.json";
import ar from "./locales/ar/common.json";
import kab from "./locales/kab/common.json";

export const languageDirections = {
  fr: "ltr",
  en: "ltr",
  ar: "rtl",
  kab: "ltr",
} as const;

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar },
    kab: { translation: kab },
  },
  lng: "fr",
  fallbackLng: "fr",
  supportedLngs: ["fr", "en", "ar", "kab"],
  interpolation: { escapeValue: false },
});

export default i18n;
