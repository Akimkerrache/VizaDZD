import type { CanonicalVisaStatus, VisaStatus } from "../types/visa";

/** One source of truth shared by the map renderer, legend, and detail cards. */
export const VISA_COLORS: Record<CanonicalVisaStatus, string> = {
  "visa-free": "#00fb04",
  "e-visa": "#00a8ff",
  "visa-on-arrival": "#d95f02",
  "embassy-visa": "#ff8a00",
  "no-access": "#ff2b2b",
  "visa-unknown": "#8b9990",
};

export const VISA_STATUS_LABEL_KEYS: Record<CanonicalVisaStatus, string> = {
  "visa-free": "visaFree",
  "e-visa": "eVisa",
  "visa-on-arrival": "visaOnArrival",
  "embassy-visa": "embassyVisa",
  "no-access": "noAccess",
  "visa-unknown": "visaUnknown",
};

/** Older country records used `visa-required`; treat those as embassy applications. */
export function normalizeVisaStatus(status: VisaStatus): CanonicalVisaStatus {
  return status === "visa-required" ? "embassy-visa" : status;
}
