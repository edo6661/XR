export type NavLink = {
  label: string;
  to: string;
};

/** Primary navigation — single source of truth for Navbar & Footer */
export const PRIMARY_NAV_LINKS: readonly NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "XRAS KL 26'", to: "/xras-kl-2026" },
  { label: "AIXR 26' Sarawak", to: "/aixr-2026-sarawak" },
  { label: "Contact", to: "/contact" },
] as const;

export const COMPANY = {
  name: "XR Summits",
  tagline:
    "Asia\u2019s Premier Platform for AI \u2022 XR \u2022 Spatial Media \u2022 Virtual Production \u2022 Immersive Technology",
  supportingText:
    "Connecting industry leaders, creators, educators, broadcasters, governments and technology innovators through deployment-ready immersive experiences.",
  email: "register@xr-summits.com",
  address: {
    line1: "Sunway Innovation Hub,",
    line2: "Bandar Sunway, 47500",
    line3: "Petaling Jaya, Selangor, Malaysia",
  },
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X (Twitter)", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;
