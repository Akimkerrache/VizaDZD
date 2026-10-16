import "../loadEnv.js";
import nodemailer from "nodemailer";
import type { ApplicationInput } from "../schemas/application.js";
import type { Logger } from "pino";
import { buildAdminEmail, buildApplicantEmail } from "./emailTemplates.js";

const configured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD,
);
const transporter = configured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
    })
  : null;

export async function notifyApplication(
  input: ApplicationInput,
  applicationId: string,
  logger: Logger,
): Promise<void> {
  if (!transporter) {
    logger.warn(
      { applicationId },
      "SMTP is not configured; application email notifications were skipped",
    );
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const applicant = buildApplicantEmail(input, applicationId);
  const messages = [
    transporter.sendMail({ from, to: input.email, ...applicant }),
  ];

  if (process.env.ADMIN_EMAIL) {
    messages.push(
      transporter.sendMail({
        from,
        to: process.env.ADMIN_EMAIL,
        replyTo: input.email,
        ...buildAdminEmail(input, applicationId),
      }),
    );
  } else {
    logger.warn(
      { applicationId },
      "ADMIN_EMAIL is not configured; administrator notification was skipped",
    );
  }

  const results = await Promise.allSettled(messages);
  results.forEach((result, index) => {
    if (result.status === "rejected")
      logger.error(
        {
          err: result.reason,
          applicationId,
          notification: index === 0 ? "applicant" : "administrator",
        },
        "Application email delivery failed",
      );
  });
}
