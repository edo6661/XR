export type LegalPageMeta = {
  slug: string;
  title: string;
  path: string;
};

export const LEGAL_PAGES: readonly LegalPageMeta[] = [
  { slug: "terms", title: "Terms and Conditions", path: "/legal/terms" },
  { slug: "privacy", title: "Privacy Policy", path: "/legal/privacy" },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    path: "/legal/refund-policy",
  },
] as const;
