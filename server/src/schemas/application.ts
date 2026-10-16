import { z } from "zod";

export const VISA_TYPES = [
  "tourist",
  "business",
  "student",
  "work",
  "family",
  "medical",
  "transit",
  "other",
] as const;

const travelDateSchema = z
  .string()
  .trim()
  .max(30)
  .refine((value) => {
    if (!value) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00.000Z`);
    return (
      !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
    );
  }, "Travel date must be a valid YYYY-MM-DD date");

export const applicationSchema = z
  .object({
    countryCode: z
      .string()
      .trim()
      .regex(/^[A-Z]{2}(?:-[A-Z]{3})?$/i)
      .transform((value) => value.toUpperCase()),
    countryName: z.string().trim().min(1).max(100),
    visaType: z.enum(VISA_TYPES),
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    phone: z
      .string()
      .trim()
      .min(6)
      .max(30)
      .regex(/^(?=.*\d)[+()\d.\-\s]+$/, "Enter a valid phone number"),
    travelDate: travelDateSchema.optional().or(z.literal("")),
    message: z.string().trim().max(1500).optional(),
    language: z.enum(["fr", "en", "ar", "tz", "kab"]).default("fr"),
  })
  .strict();

export type ApplicationInput = z.infer<typeof applicationSchema>;
