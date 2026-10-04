export type VisaStatus =
  | "visa-free"
  | "e-visa"
  | "visa-on-arrival"
  | "embassy-visa"
  | "no-access"
  | "visa-unknown"
  /** Compatibility with the existing API country catalogue. */
  | "visa-required";
export type CanonicalVisaStatus = Exclude<VisaStatus, "visa-required">;
export type VisaFilter = CanonicalVisaStatus | "all";
