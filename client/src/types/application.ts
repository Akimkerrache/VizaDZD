import type { VisaType } from "../lib/visa-types";

export type SupportedLanguage = "fr" | "en" | "ar" | "kab";

export interface ApplicationRequest {
  countryCode: string;
  countryName: string;
  visaType: VisaType;
  fullName: string;
  email: string;
  phone: string;
  travelDate?: string;
  message?: string;
  language: SupportedLanguage;
}

export interface ApplicationResponse {
  id: string;
  status: string;
  createdAt: string;
}
