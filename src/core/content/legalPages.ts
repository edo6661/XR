export type LegalPageMeta = {
  slug: string;
  title: string;
  path: string;
};

export const LEGAL_PAGES: readonly LegalPageMeta[] = [
  { slug: "terms", title: "Terms and Conditions", path: "/legal/terms" },
  { slug: "privacy", title: "Privacy Policy", path: "/legal/privacy" },
  {
    slug: "data-collection-notice",
    title: "Data Collection Notice",
    path: "/legal/data-collection-notice",
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
