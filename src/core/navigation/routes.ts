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
  navbarBrand: "XR SUMMITS SDN BHD",
  legalName: "XR Summits Sdn. Bhd.",
  registrationNo: "1506516-A",
  tagline:
    "Asia\u2019s Premier Platform for AI \u2022 XR \u2022 Spatial Media \u2022 Virtual Production \u2022 Immersive Technology",
  supportingText:
    "Connecting industry leaders, creators, educators, broadcasters, governments and technology innovators through deployment-ready immersive experiences.",
  email: "register@xr-summits.com",
  phone: "+6012-2020624",
  address: {
    line1: "No. 8, Block K, 8th Floor,",
    line2: "Sunway PJ 51A, Jalan SS9A/19,",
    line3: "47300 Petaling Jaya, Selangor, Malaysia.",
  },
} as const;

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/xr-summits/posts/?feedView=all",
  },
  {
    label: "YouTube",
    href: "http://www.youtube.com/@XR-SUMMITS?sub_confirmation=1",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@xrsummits" },
  { label: "Instagram", href: "https://www.instagram.com/xrsummits" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61583955069948",
  },
] as const;
