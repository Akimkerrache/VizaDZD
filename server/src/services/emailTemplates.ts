import type { ApplicationInput } from "../schemas/application.js";

const SITE_URL = "https://visadzd.com";
const LOGO_URL = `${SITE_URL}/logo.png`;
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const VISA_TYPE_LABELS_FR: Record<ApplicationInput["visaType"], string> = {
  tourist: "Touristique",
  business: "Affaires",
  student: "Études",
  work: "Contrat de travail",
  family: "Visite familiale",
  medical: "Soins médicaux",
  transit: "Transit",
  other: "Autre",
};

export interface EmailContent {
  subject: string;
  text: string;
  html: string;
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ] ?? character,
  );
}

function formatTravelDate(value?: string): string {
  if (!value) return "Non précisée";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export function formatReference(applicationId: string): string {
  return `VDZ-${applicationId.slice(-8).toUpperCase()}`;
}

function detailRows(
  input: ApplicationInput,
  applicationId: string,
): Array<[string, string]> {
  return [
    ["Référence", formatReference(applicationId)],
    ["Destination", input.countryName],
    ["Type de visa", VISA_TYPE_LABELS_FR[input.visaType]],
    ["Nom complet", input.fullName],
    ["E-mail", input.email],
    ["Téléphone", input.phone],
    ["Date de départ souhaitée", formatTravelDate(input.travelDate)],
    ["Message", input.message || "—"],
  ];
}

function layout(preheader: string, title: string, body: string): string {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background-color:#050708;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#050708;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#050708" style="background-color:#050708;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
<tr><td align="center" style="padding:8px 0 28px;"><a href="${SITE_URL}" style="text-decoration:none;"><img src="${LOGO_URL}" alt="VisaDZD" width="160" style="display:block;width:160px;max-width:60%;height:auto;border:0;"></a></td></tr>
<tr><td bgcolor="#0b1010" style="background-color:#0b1010;border:1px solid #1f2826;border-radius:10px;padding:0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="height:3px;background-color:#00fb04;border-radius:10px 10px 0 0;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:32px 32px 28px;font-family:${FONT};color:#f5f7f7;">${body}</td></tr>
</table></td></tr>
<tr><td align="center" style="padding:24px 8px 0;font-family:${FONT};font-size:12px;line-height:1.7;color:#8b9990;">
VISA<span style="color:#00fb04;">DZD</span> · Intelligence visa mondiale<br>
<a href="${SITE_URL}" style="color:#8b9990;text-decoration:underline;">visadzd.com</a><br>
Les informations de cet e-mail sont confidentielles et fournies à titre indicatif.
</td></tr>
</table></td></tr></table></body></html>`;
}

function detailsTable(rows: Array<[string, string]>): string {
  const body = rows
    .map(
      ([label, value], index) =>
        `<tr><td style="padding:12px 14px;width:38%;vertical-align:top;font-family:${FONT};font-size:12px;color:#8b9990;border-top:${index ? "1px solid #1f2826" : "0"};">${escapeHtml(label)}</td><td style="padding:12px 14px;vertical-align:top;font-family:${FONT};font-size:14px;color:#f5f7f7;border-top:${index ? "1px solid #1f2826" : "0"};word-break:break-word;">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#111818" style="background-color:#111818;border:1px solid #1f2826;border-radius:8px;">${body}</table>`;
}

function plainDetails(rows: Array<[string, string]>): string {
  return rows.map(([label, value]) => `${label} : ${value}`).join("\n");
}

export function buildApplicantEmail(
  input: ApplicationInput,
  applicationId: string,
): EmailContent {
  const rows = detailRows(input, applicationId);
  const firstName = input.fullName.split(/\s+/)[0] ?? input.fullName;
  const body = `
<p style="margin:0 0 6px;font-family:${FONT};font-size:11px;letter-spacing:2px;color:#00fb04;">DEMANDE REÇUE</p>
<h1 style="margin:0 0 16px;font-family:${FONT};font-size:26px;line-height:1.25;color:#f5f7f7;">Merci pour votre demande, ${escapeHtml(firstName)}.</h1>
<p style="margin:0 0 24px;font-family:${FONT};font-size:15px;line-height:1.7;color:#c5cfc8;">Nous avons bien reçu votre demande de visa pour <strong style="color:#f5f7f7;">${escapeHtml(input.countryName)}</strong>. Notre équipe l'étudie et <strong style="color:#f5f7f7;">vous contactera très prochainement</strong> afin de poursuivre votre démarche.</p>
<p style="margin:0 0 10px;font-family:${FONT};font-size:12px;letter-spacing:2px;color:#8b9990;">RÉCAPITULATIF</p>
${detailsTable(rows)}
<p style="margin:24px 0 28px;font-family:${FONT};font-size:14px;line-height:1.7;color:#c5cfc8;">Conservez votre numéro de référence : il vous sera demandé lors de nos échanges. Une information est incorrecte ? Répondez simplement à cet e-mail.</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#00fb04" style="background-color:#00fb04;border-radius:6px;"><a href="${SITE_URL}" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:14px;font-weight:700;color:#051006;text-decoration:none;">Visiter VisaDZD</a></td></tr></table>`;

  return {
    subject: `VisaDZD — Votre demande de visa pour ${input.countryName} est bien reçue`,
    text: `Bonjour ${input.fullName},\n\nMerci pour votre demande. Nous l'avons bien reçue et nous vous contacterons très prochainement afin de poursuivre votre démarche de visa.\n\nRÉCAPITULATIF\n${plainDetails(rows)}\n\nL'équipe VisaDZD\n${SITE_URL}`,
    html: layout(
      `Votre demande de visa pour ${input.countryName} a bien été reçue.`,
      "Demande reçue",
      body,
    ),
  };
}

export function buildAdminEmail(
  input: ApplicationInput,
  applicationId: string,
): EmailContent {
  const rows = detailRows(input, applicationId);
  const body = `
<p style="margin:0 0 6px;font-family:${FONT};font-size:11px;letter-spacing:2px;color:#00fb04;">NOUVELLE DEMANDE</p>
<h1 style="margin:0 0 20px;font-family:${FONT};font-size:22px;line-height:1.25;color:#f5f7f7;">${escapeHtml(input.fullName)} · ${escapeHtml(input.countryName)}</h1>
${detailsTable(rows)}`;

  return {
    subject: `Nouvelle demande visa — ${input.countryName} (${VISA_TYPE_LABELS_FR[input.visaType]})`,
    text: plainDetails(rows),
    html: layout(
      `Nouvelle demande de ${input.fullName}`,
      "Nouvelle demande",
      body,
    ),
  };
}
