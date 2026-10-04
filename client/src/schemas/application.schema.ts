import { z } from "zod";

const travelDateSchema = z.string().refine((value) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}, "invalidDate");

export const applicationSchema = z.object({
  countryCode: z
    .string()
    .trim()
    .regex(/^[A-Z]{2}(?:-[A-Z]{3})?$/i),
  countryName: z.string().trim().min(1).max(100),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(30)
    .regex(/^(?=.*\d)[+()\d.\-\s]+$/),
  travelDate: travelDateSchema.optional(),
  message: z.string().trim().max(1500).optional(),
  language: z.enum(["fr", "en", "ar", "kab"]),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
