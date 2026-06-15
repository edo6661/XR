import { COMPANY } from "../navigation/routes";

export const ENQUIRY_EMAIL_BODY = `Dear XR SUMMITS Team,
I am reaching out to express my interest would like to learn more about the available opportunities.
I look forward to hearing from you.`;

/** Uniform mailto link — only subject differs per CTA */
export function buildContactMailto(subjectLabel: string): string {
  const subject = encodeURIComponent(`Enquiry - ${subjectLabel}`);
  const body = encodeURIComponent(ENQUIRY_EMAIL_BODY);
  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
}

export const CONTACT_SUBJECTS = [
  "General Enquiries",
  "Partnerships",
  "Sponsors",
  "Exhibitors",
  "Government Agencies",
  "Universities",
  "Speaker Applications",
  "Media Enquiries",
  "Press Accreditation",
] as const;

/** Real WhatsApp number from cursorrules */
export const WHATSAPP_PLACEHOLDER = {
  phone: "60122020624",
  href: "https://wa.me/60122020624?text=Hello%20XR%20Summits",
  label: "Chat on WhatsApp",
  display: "+6012-2020624",
} as const;

export const BNI_BANK_DETAILS = {
  bank: "Bank Negara Malaysia (BNM)",
  accountName: "XR Summits Sdn. Bhd.",
  accountNumber: "Placeholder — TBC",
  swift: "Placeholder — TBC",
  branch: "Petaling Jaya Branch",
} as const;

export const PARTNERSHIP_CARDS = [
  {
    id: "sponsors",
    label: "Sponsors",
    body: "Put your brand at the centre of Asia's XR ecosystem. From naming rights to floor presence, our sponsorship packages are built around visibility, lead generation, and genuine industry credibility.",
    cta: {
      label: "Sponsorship Package Details",
      subject: "Sponsorship Package Details",
    },
  },
  {
    id: "exhibitors",
    label: "Exhibitors",
    body: "Showcase your product or solution to a curated audience of enterprise buyers, government agencies, and industry practitioners actively looking to adopt immersive technology.",
    cta: {
      label: "Exhibitor Package Details",
      subject: "Exhibitor Package Details",
    },
  },
  {
    id: "government",
    label: "Government",
    body: "We work with government agencies and ministries to align our events with national digital economy and creative industry agendas. Let's explore how XR SUMMITS can support your initiatives.",
    cta: {
      label: "Government Partnership Details",
      subject: "Government Partnership Details",
    },
  },
  {
    id: "universities",
    label: "Universities",
    body: "Connect your students and faculty with industry. XR SUMMITS offers universities dedicated showcase space, recruitment exposure, and direct access to the region's XR talent pipeline.",
    cta: {
      label: "University Partnership Details",
      subject: "University Partnership Details",
    },
  },
] as const;

export const SPEAKER_EVENTS = [
  {
    label: "Apply for XRAS KL '26",
    subject: "Speaker Application — XRAS KL '26",
    event: "XR Asia Summits 2026",
  },
  {
    label: "Apply for AIXR Sarawak '26",
    subject: "Speaker Application — AIXR Sarawak '26",
    event: "AI-XR Cultural Innovation Forum",
  },
] as const;

export const MEDIA_ACCREDITATION_CTA = {
  label: "Apply for Media Accreditation",
  subject: "Media Accreditation",
} as const;

export const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/xr-summits/posts/?feedView=all",
    icon: "linkedin",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "http://www.youtube.com/@XR-SUMMITS?sub_confirmation=1",
    icon: "youtube",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@xrsummits",
    icon: "tiktok",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/xrsummits/",
    icon: "instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61583955069948",
    icon: "facebook",
  },
] as const;

export const MEDIA_PERKS = [
  "Press passes",
  "Pre-event interviews",
  "Official media kit",
  "On-site access",
] as const;
