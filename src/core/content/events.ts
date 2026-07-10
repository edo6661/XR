/** Props consumed by SpotlightCard on the Home events section */
export type EventCardItem = {
  title: string;
  date?: string;
  location?: string;
  description: string;
  accentColor: string;
  tag: string;
  to?: string;
  imageSrc?: string;
  imagePosition?: string;
  isFeatured?: boolean;
  isHero?: boolean;
};

export const FALLBACK_FLAGSHIP_EVENTS: EventCardItem[] = [
  {
    title: "XR ASIA SUMMIT 2026",
    date: "1 – 3 Dec 2026",
    location:
      "Malaysia International Trade and Exhibition Centre (MITEC), Kuala Lumpur",
    description:
      "One platform, 6 Experiences – Conference • Expo • Workshops • Masterclasses • Hackathon Grandfinals • Esports Tournament • Awards & Gala.",
    accentColor: "#fb923c",
    tag: "XRAS",
    to: "/xras-kl-2026",
    imageSrc: "/hero/new_hero_from_louis_2.png",
    isFeatured: true,
  },
];

export const FALLBACK_PROGRAMME_HIGHLIGHTS: EventCardItem[] = [
  {
    title: "AI Filmmaking Hackathon",
    description: "",
    accentColor: "#fb923c",
    tag: "Hackathon",
    to: "/ai-filmmaking-hackathon",
    imageSrc: "/programme-highlights/AI Filmmaking Hackathon.png",
    imagePosition: "18% center",
    isHero: true,
  },
  {
    title: "Esports Tournament",
    description: "",
    accentColor: "#34d399",
    tag: "Esports",
    to: "/xras-kl-2026",
    imageSrc: "/programme-highlights/Esports.png",
    imagePosition: "center",
    isFeatured: false,
  },
  {
    title: "Gala & Awards",
    description: "",
    accentColor: "#f472b6",
    tag: "Gala",
    to: "/xras-kl-2026",
    imageSrc: "/programme-highlights/Awards & Gala.png",
    imagePosition: "center",
    isFeatured: false,
  },
];

export function splitProgrammeHighlights(events: EventCardItem[]) {
  const hero = events.find((event) => event.isHero) ?? events[0];
  const others = events.filter((event) => event !== hero);
  return { hero, others };
}
