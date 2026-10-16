export const VISA_TYPE_VALUES = [
  "tourist",
  "business",
  "student",
  "work",
  "family",
  "medical",
  "transit",
  "other",
] as const;

export type VisaType = (typeof VISA_TYPE_VALUES)[number];

export const VISA_TYPE_LABEL_KEYS: Record<VisaType, string> = {
  tourist: "visaTypeTourist",
  business: "visaTypeBusiness",
  student: "visaTypeStudent",
  work: "visaTypeWork",
  family: "visaTypeFamily",
  medical: "visaTypeMedical",
  transit: "visaTypeTransit",
  other: "visaTypeOther",
};
