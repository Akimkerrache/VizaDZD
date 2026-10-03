import "dotenv/config";
import { z } from "zod";

const booleanFromEnv = z
  .string()
  .default("true")
  .transform((value) => value === "true");
const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().int().positive().default(4000),
    CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
    MONGODB_URI: z.string().min(1).default("mongodb://127.0.0.1:27017/visadzd"),
    SMTP_HOST: z.string().default("smtp.gmail.com"),
    SMTP_PORT: z.coerce.number().int().positive().default(465),
    SMTP_SECURE: booleanFromEnv,
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM: z.string().default("VisaDZD <noreply@visadzd.com>"),
    ADMIN_EMAIL: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().email().optional(),
    ),
  })
  .superRefine((configuration, context) => {
    if (configuration.NODE_ENV !== "production") return;
    const requiredProductionSettings = [
      ["MONGODB_URI", Boolean(process.env.MONGODB_URI)],
      ["CLIENT_ORIGIN", Boolean(process.env.CLIENT_ORIGIN)],
      ["SMTP_USER", Boolean(configuration.SMTP_USER)],
      ["SMTP_PASSWORD", Boolean(configuration.SMTP_PASSWORD)],
      ["ADMIN_EMAIL", Boolean(configuration.ADMIN_EMAIL)],
    ] as const;
    for (const [field, isConfigured] of requiredProductionSettings) {
      if (!isConfigured) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} must be configured in production`,
        });
      }
    }
  });

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error(
    "Invalid environment configuration:",
    result.error.flatten().fieldErrors,
  );
  process.exit(1);
}

export const env = {
  ...result.data,
  allowedOrigins: result.data.CLIENT_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
