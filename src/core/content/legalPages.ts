export type LegalPageMeta = {
  slug: string;
  title: string;
  path: string;
};

export const LEGAL_PAGES: readonly LegalPageMeta[] = [
  { slug: "terms", title: "Terms and Conditions", path: "/legal/terms" },
  { slug: "privacy", title: "Privacy Policy", path: "/legal/privacy" },
  {
    slug: "data-collection",
    title: "Data Collection Notice",
    path: "/legal/data-collection",
  },
  {
    slug: "payment-disclaimer",
    title: "Payment Disclaimer",
    path: "/legal/payment-disclaimer",
  },
  {
    slug: "event-disclaimer",
    title: "Event Disclaimer",
    path: "/legal/event-disclaimer",
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    path: "/legal/refund-policy",
  },
  {
    slug: "website-disclaimer",
    title: "General Website Disclaimer",
    path: "/legal/website-disclaimer",
  },
] as const;

export const LOREM_SECTIONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla facilisi. Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus fermentum posuere.",
] as const;
