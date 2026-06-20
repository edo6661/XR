import { COMPANY } from "../navigation/routes";
import { WHATSAPP_PLACEHOLDER } from "./contactPage";

export const LEAD_INTEREST_OPTIONS = [
  "General registration interest",
  "Brochure download",
  "Sponsorship package",
  "Exhibitor package",
  "Speaker application",
  "Media / press",
  "Partnership",
  "Government partnership",
  "University partnership",
] as const;

export type LeadInterest = (typeof LEAD_INTEREST_OPTIONS)[number];

export type LeadCaptureIntent =
  | "brochure"
  | "sponsor-docs"
  | "exhibitor-docs"
  | "register"
  | "enquiry";

export type LeadCaptureDocument = {
  label: string;
  href: string;
  /** Set true once the PDF is uploaded to /public */
  available: boolean;
};

export type LeadCaptureConfig = {
  title: string;
  description?: string;
  eventName?: string;
  defaultInterest?: LeadInterest;
  intent?: LeadCaptureIntent;
  accentColor?: string;
};

export type LeadCaptureFields = {
  name: string;
  email: string;
  phone: string;
  title: string;
  interest: LeadInterest;
};

/** Brochure & package PDFs — flip `available` to true when assets are in /public/docs */
export const LEAD_CAPTURE_DOCUMENTS = {
  brochures: {
    "XRAS KL 2026": {
      label: "XRAS KL 2026 Brochure",
      href: "/docs/xras-kl-2026-brochure.pdf",
      available: false,
    },
    "AI·XR Cultural Innovation Forum 2026": {
      label: "AI·XR Cultural Innovation Forum 2026 Brochure",
      href: "/docs/aixr-sarawak-2026-brochure.pdf",
      available: false,
    },
    "AI Filmmaking Hackathon": {
      label: "AI Filmmaking Hackathon Brochure",
      href: "/docs/ai-filmmaking-hackathon-brochure.pdf",
      available: false,
    },
  },
  sponsorPackage: {
    label: "Sponsorship Package",
    href: "/docs/sponsorship-package.pdf",
    available: false,
  },
  exhibitorPackage: {
    label: "Exhibitor Package",
    href: "/docs/exhibitor-package.pdf",
    available: false,
  },
} as const;

export function getDocumentsForLead(
  intent: LeadCaptureIntent | undefined,
  interest: LeadInterest,
  eventName?: string,
): LeadCaptureDocument[] {
  const docs: LeadCaptureDocument[] = [];

  const wantsBrochure =
    intent === "brochure" ||
    interest === "Brochure download" ||
    interest === "General registration interest";

  const wantsSponsor =
    intent === "sponsor-docs" || interest === "Sponsorship package";

  const wantsExhibitor =
    intent === "exhibitor-docs" || interest === "Exhibitor package";

  if (wantsBrochure && eventName) {
    const brochure =
      LEAD_CAPTURE_DOCUMENTS.brochures[
        eventName as keyof typeof LEAD_CAPTURE_DOCUMENTS.brochures
      ];
    if (brochure) docs.push(brochure);
  }

  if (wantsSponsor) docs.push(LEAD_CAPTURE_DOCUMENTS.sponsorPackage);
  if (wantsExhibitor) docs.push(LEAD_CAPTURE_DOCUMENTS.exhibitorPackage);

  return docs;
}

export function buildLeadCaptureMailto(
  fields: LeadCaptureFields,
  context: { title: string; eventName?: string },
): string {
  const subject = encodeURIComponent(
    context.eventName
      ? `${context.eventName} — ${fields.interest}`
      : `XR Summits — ${fields.interest}`,
  );

  const lines = [
    `Lead capture: ${context.title}`,
    context.eventName ? `Event: ${context.eventName}` : "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Title: ${fields.title}`,
    `Interest: ${fields.interest}`,
    "",
    "Please follow up and share any requested documents.",
  ].filter(Boolean);

  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
}

export function buildLeadCaptureWhatsAppHref(
  fields: LeadCaptureFields,
  context: { title: string; eventName?: string },
): string {
  const lines = [
    "Hello XR Summits! I would like to learn more.",
    "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Title: ${fields.title}`,
    `Interest: ${fields.interest}`,
  ];

  if (context.eventName) lines.push(`Event: ${context.eventName}`);
  lines.push("", `Enquiry: ${context.title}`);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_PLACEHOLDER.phone}?text=${text}`;
}
