import "../loadEnv.js";
import nodemailer from "nodemailer";
import type { ApplicationInput } from "../schemas/application.js";
import type { Logger } from "pino";

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

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ] ?? character,
  );
}

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

  const safeName = escapeHtml(input.fullName);
  const safeCountry = escapeHtml(input.countryName);
  const safeDate = escapeHtml(input.travelDate || "Non précisée");
  const safeMessage = escapeHtml(input.message || "Aucun message").replace(
    /\n/g,
    "<br>",
  );
  const messages = [
    transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: input.email,
      subject: `VisaDZD — Votre demande pour ${input.countryName}`,
      text: `Bonjour ${input.fullName},\n\nNous avons reçu votre demande d’accompagnement pour ${input.countryName}. Notre équipe vous contactera prochainement.\n\nRéférence : ${applicationId}\n\nVisaDZD`,
      html: `<p>Bonjour ${safeName},</p><p>Nous avons reçu votre demande d’accompagnement pour <strong>${safeCountry}</strong>. Notre équipe vous contactera prochainement.</p><p>Référence : <strong>${applicationId}</strong></p><p>VisaDZD</p>`,
    }),
  ];

  if (process.env.ADMIN_EMAIL) {
    messages.push(
      transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        replyTo: input.email,
        subject: `Nouvelle demande visa — ${input.countryName}`,
        text: `Référence : ${applicationId}\nPays : ${input.countryName} (${input.countryCode})\nNom : ${input.fullName}\nE-mail : ${input.email}\nTéléphone : ${input.phone}\nDépart : ${input.travelDate || "Non précisée"}\nMessage : ${input.message || "Aucun message"}`,
        html: `<h2>Nouvelle demande de visa</h2><p><strong>Référence :</strong> ${applicationId}</p><p><strong>Pays :</strong> ${safeCountry} (${input.countryCode})</p><p><strong>Nom :</strong> ${safeName}</p><p><strong>E-mail :</strong> ${escapeHtml(input.email)}</p><p><strong>Téléphone :</strong> ${escapeHtml(input.phone)}</p><p><strong>Départ :</strong> ${safeDate}</p><p><strong>Message :</strong><br>${safeMessage}</p>`,
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
