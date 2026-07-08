export type EventPartner = {
  name: string;
  logo: string;
  category: string;
  filter?: string;
};

export type PartnerCategory = {
  label: string;
  partners: EventPartner[];
};

/** Static fallback used when Sanity has no partner documents yet */
export const FALLBACK_EVENT_PARTNERS: EventPartner[] = [
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
];

export function groupPartnersByCategory(
  partners: EventPartner[],
): PartnerCategory[] {
  const order: string[] = [];
  const map = new Map<string, EventPartner[]>();

  for (const partner of partners) {
    const category = partner.category || "Event Partner";
    if (!map.has(category)) {
      map.set(category, []);
      order.push(category);
    }
    map.get(category)!.push(partner);
  }

  return order.map((label) => ({
    label,
    partners: map.get(label) ?? [],
  }));
}
