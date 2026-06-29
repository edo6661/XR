export type EnquiryEmailEvent =
  | "XR ASIA SUMMIT 2026"
  | "AI-XR Cultural Innovation Forum"
  | "Both"
  | "Not sure yet, need more details"
  | "";

export type EnquiryEmailFields = {
  name?: string;
  email?: string;
  phone?: string;
  title?: string;
  organisation?: string;
  country?: string;
  interest?: string;
  event?: EnquiryEmailEvent;
  message?: string;
};

const LEAD_EMAIL_OPENING = `Dear XR SUMMITS Team,
I am reaching out to express my interest would like to learn more about the available opportunities.
Please find my details below:`;

const LEAD_EMAIL_CLOSING = "I look forward to hearing from you.";

const EVENT_CHECKBOX_OPTIONS = [
  {
    key: "XR ASIA SUMMIT 2026",
    label: "XR ASIA SUMMIT 2026 (1–3 December 2026, Kuala Lumpur)",
  },
  {
    key: "AI-XR Cultural Innovation Forum",
    label:
      "AI-XR Cultural Innovation Forum (16–17 October 2026, Kuching, Sarawak)",
  },
] as const;

function formatEventCheckboxes(event: EnquiryEmailEvent): string {
  const selected = new Set<string>();

  if (event === "XR ASIA SUMMIT 2026") {
    selected.add("XR ASIA SUMMIT 2026");
  } else if (event === "AI-XR Cultural Innovation Forum") {
    selected.add("AI-XR Cultural Innovation Forum");
  } else if (event === "Both") {
    selected.add("XR ASIA SUMMIT 2026");
    selected.add("AI-XR Cultural Innovation Forum");
  }

  return EVENT_CHECKBOX_OPTIONS.map(({ key, label }) => {
    const mark = selected.has(key) ? "☑" : "☐";
    return `${mark} ${label}`;
  }).join("\n");
}

export function buildLeadEnquiryEmailBody(
  fields: EnquiryEmailFields = {},
): string {
  const lines = [
    LEAD_EMAIL_OPENING,
    `Full Name: ${fields.name ?? ""}`,
    `Job Title / Designation: ${fields.title ?? ""}`,
    `Organisation / Institution: ${fields.organisation ?? ""}`,
    `Email Address: ${fields.email ?? ""}`,
    `Mobile Number: ${fields.phone ?? ""}`,
    `Country: ${fields.country ?? ""}`,
  ];

  if (fields.message?.trim()) {
    lines.push("", fields.message.trim());
  }

  lines.push(
    "Event of interest:",
    formatEventCheckboxes(fields.event ?? ""),
    "",
    LEAD_EMAIL_CLOSING,
  );

  return lines.join("\n");
}
