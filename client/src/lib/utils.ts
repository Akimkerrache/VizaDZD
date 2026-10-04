import type { VisaStatus } from "../types/visa";
import { normalizeVisaStatus, VISA_STATUS_LABEL_KEYS } from "./visa-colors";

export function getVisaStatusTranslationKey(status: VisaStatus): string {
  return VISA_STATUS_LABEL_KEYS[normalizeVisaStatus(status)];
}

export function formatFee(
  fee: number | null,
  freeLabel: string,
  unknownLabel: string,
): string {
  if (fee === null) return unknownLabel;
  if (fee === 0) return freeLabel;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(fee);
}
