export type VisaStatus = "visa-free" | "e-visa" | "visa-required";

export interface Country {
  code: string;
  name: string;
  flag: string;
  capital: string;
  region: string;
  status: VisaStatus;
  stayDays: number;
  processingDays: string;
  fee: number | null;
  latitude: number;
  longitude: number;
  summary: string;
  requirements: string[];
}
