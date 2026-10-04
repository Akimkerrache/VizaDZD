import type { VisaStatus } from "./visa";

export interface Country {
  code: string;
  name: string;
  flag: string;
  capital: string;
  region: string;
  status: VisaStatus;
  stayDays: number | null;
  processingDays: string;
  fee: number | null;
  latitude: number;
  longitude: number;
  summary: string;
  requirements: string[];
  importantNotes?: string[];
  markerPriority?: number;
}
