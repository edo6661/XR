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
    heading: "Put Your Brand at the Centre of Asia's XR Ecosystem",
    body: "From naming rights to floor presence, our sponsorship packages are built around visibility, lead generation, and genuine industry credibility.",
    ctas: [
      {
        label: "Download Sponsorship Package",
        href: "#",
        variant: "orange" as const,
      },
      { label: "Talk to Our Team", href: "#", variant: "ghost" as const },
    ],
  },
  {
    id: "exhibitors",
    label: "Exhibitors",
    heading: "Showcase to Enterprise Buyers & Government Agencies",
    body: "Present your product or solution to a curated audience of enterprise buyers, government agencies, and industry practitioners actively looking to adopt immersive technology.",
    ctas: [
      { label: "Apply to Exhibit", href: "#", variant: "orange" as const },
      { label: "View Booth Options", href: "#", variant: "ghost" as const },
    ],
  },
  {
    id: "government",
    label: "Government",
    heading: "Align With National Digital Economy Agendas",
    body: "We work with government agencies and ministries to align our events with national digital economy and creative industry initiatives. Let's explore how XR Summits can support your work.",
    ctas: [{ label: "Get in Touch", href: "#", variant: "orange" as const }],
  },
  {
    id: "universities",
    label: "Universities",
    heading: "Connect Students & Faculty With Industry",
    body: "XR Summits offers universities dedicated showcase space, recruitment exposure, and direct access to the region's XR talent pipeline.",
    ctas: [{ label: "Partner With Us", href: "#", variant: "orange" as const }],
  },
] as const;

export const SPEAKER_EVENTS = [
  {
    label: "Apply for XRAS KL '26",
    href: "#",
    event: "XR Asia Summits 2026",
  },
  {
    label: "Apply for AIXR Sarawak '26",
    href: "#",
    event: "AI-XR Cultural Innovation Forum",
  },
] as const;

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
