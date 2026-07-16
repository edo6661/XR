export type PartnerItem = {
  name: string;
  logo: string;
  category: string;
  filter?: string;
};

export type SliderPartner = {
  name: string;
  src: string;
  filter?: string;
};

export type PartnerCategory = {
  label: string;
  partners: PartnerItem[];
};

/** Preferred display order for XRAS event partner categories */
export const EVENT_PARTNER_CATEGORY_ORDER = [
  "Media Partner",
  "Venue Partner",
] as const;

/** Media + venue partners on XRAS event page */
export const FALLBACK_MEDIA_PARTNERS: PartnerItem[] = [
  {
    name: "Vanakkam Malaysia News",
    logo: "/partners-logo/vanakkam-malaysia.jpeg",
    category: "Media Partner",
  },
  {
    name: "ESG TV",
    logo: "/partners-logo/esg-tv.png",
    category: "Media Partner",
  },
  {
    name: "MITEC",
    logo: "/others/mitec-new-logo.png",
    category: "Venue Partner",
  },
];

/** Government + tech partners on Home page slider */
export const FALLBACK_SPONSOR_PARTNERS: PartnerItem[] = [
  {
    name: "FINAS",
    logo: "/all-partner-logos/FINAS.png",
    category: "Government Partner",
  },
  {
    name: "POSTAM",
    logo: "/all-partner-logos/postamsmall.png",
    category: "Government Partner",
  },
  {
    name: "AOTO",
    logo: "/all-partner-logos/AOTO LOGO2.png",
    category: "Tech Partner",
  },
  {
    name: "Artixium",
    logo: "/all-partner-logos/artixium.png",
    category: "Tech Partner",
  },
  {
    name: "Aximmetry",
    logo: "/all-partner-logos/aximmetry.png",
    category: "Tech Partner",
  },
  {
    name: "Blackcam Robotics",
    logo: "/all-partner-logos/blackcam robotics.png",
    category: "Tech Partner",
    filter: "contrast(2.8) brightness(1.35)",
  },
  {
    name: "Brompton Technology",
    logo: "/all-partner-logos/brompton_technology_logo.png",
    category: "Tech Partner",
  },
  {
    name: "Eztrack",
    logo: "/all-partner-logos/logo_eztrack-noir.png",
    category: "Tech Partner",
  },
  {
    name: "Korad",
    logo: "/all-partner-logos/korad.png",
    category: "Tech Partner",
  },
  {
    name: "OARO",
    logo: "/all-partner-logos/OARO.png",
    category: "Tech Partner",
  },
  {
    name: "Object Matrix",
    logo: "/all-partner-logos/Object-Matrix-Logo-e1610495539370.png",
    category: "Tech Partner",
  },
  {
    name: "Ortana",
    logo: "/all-partner-logos/ortana-omg-wide-logo-with-new-tagline-sml.png",
    category: "Tech Partner",
  },
  {
    name: "Smode",
    logo: "/all-partner-logos/logo_smode.png",
    category: "Tech Partner",
    filter: "contrast(2.5) brightness(1.4)",
  },
  {
    name: "STYPE",
    logo: "/all-partner-logos/STYPE-logo-black.png",
    category: "Tech Partner",
  },
  {
    name: "Unreal Engine",
    logo: "/all-partner-logos/unreal logo.png",
    category: "Tech Partner",
    filter: "contrast(2.8) brightness(1.35)",
  },
  {
    name: "Vivemars",
    logo: "/all-partner-logos/vivemars_logo.png",
    category: "Tech Partner",
  },
];

export function toSliderPartners(partners: PartnerItem[]): SliderPartner[] {
  return partners.map((partner) => ({
    name: partner.name,
    src: partner.logo,
    filter: partner.filter,
  }));
}

export function groupPartnersByCategory(
  partners: PartnerItem[],
  preferredOrder: readonly string[] = [],
): PartnerCategory[] {
  const order: string[] = [];
  const map = new Map<string, PartnerItem[]>();

  for (const partner of partners) {
    const category = partner.category || "Event Partner";
    if (!map.has(category)) {
      map.set(category, []);
      order.push(category);
    }
    map.get(category)!.push(partner);
  }

  const sortedLabels = [
    ...preferredOrder.filter((label) => map.has(label)),
    ...order.filter((label) => !preferredOrder.includes(label)),
  ];

  return sortedLabels.map((label) => ({
    label,
    partners: map.get(label) ?? [],
  }));
}
