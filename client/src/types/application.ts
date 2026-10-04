export type SupportedLanguage = "fr" | "en" | "ar" | "kab";

export interface ApplicationRequest {
  countryCode: string;
  countryName: string;
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
