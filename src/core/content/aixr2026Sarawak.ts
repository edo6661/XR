export const AIXR_SARAWAK_ACCENT = "#22d3ee";

export const AIXR_SARAWAK_POSITIONING =
  "Innovation • Culture • Technology • Future Talent";

export const AIXR_SARAWAK_META = {
  title: "AIXR 26' Sarawak | XR Summits",
  description:
    "AIXR 2026 Sarawak — Innovation • Culture • Technology • Future Talent. Regional conference, expo, workshops, masterclasses, and semi-finals.",
  location: "Sarawak, Malaysia",
  edition: "Regional · 2026",
} as const;

export type AixrProgram = {
  id: string;
  category: string;
  title: string;
  description: string;
  featured?: boolean;
};

/** Programme items required by Phase 1 contract for /aixr-2026-sarawak */
export const AIXR_SARAWAK_PROGRAMS: readonly AixrProgram[] = [
  {
    id: "conference",
    category: "Conference",
    title: "AIXR Conference",
    description:
      "Regional keynotes exploring AI Adoption, the Digital Economy, and collaborative partnerships across Universities and Government sectors.",
    featured: true,
  },
  {
    id: "expo",
    category: "Expo",
    title: "Technology & Culture Expo",
    description:
      "Showcase floor for creators, Startups, and industry partners building deployment-ready experiences in Creative Technology and Tourism XR.",
    featured: true,
  },
  {
    id: "workshop-1",
    category: "Workshop",
    title: "Workshop I",
    description:
      "Hands-on session exploring AI, XR, and spatial storytelling to empower Indigenous Creative Communities and drive Heritage Preservation.",
  },
  {
    id: "workshop-2",
    category: "Workshop",
    title: "Workshop II",
    description:
      "Follow-on workshop focused on production pipelines, talent development, and immersive deployment.",
  },
  {
    id: "masterclass-1",
    category: "Masterclass",
    title: "Masterclass I",
    description:
      "Expert-led intensive on Education Transformation, virtual production, cultural narrative, and enterprise immersive adoption.",
  },
  {
    id: "masterclass-2",
    category: "Masterclass",
    title: "Masterclass II",
    description:
      "Second masterclass track for broadcasters, universities, and technology innovators in Borneo.",
  },
  {
    id: "hackathon-semi",
    category: "Semi Finals",
    title: "AI Filmmaking Hackathon Semi Finals",
    description:
      "Semi-final showcase where AI filmmaking teams present projects before advancing to the Kuala Lumpur grand finals.",
    featured: true,
  },
  {
    id: "esports-semi",
    category: "Semi Finals",
    title: "Esports Semi Finals",
    description:
      "Regional immersive esports semi-finals — competitive spatial entertainment on the road to the championship finals.",
    featured: true,
  },
] as const;

export const AIXR_SARAWAK_EVENT_NAME = "AIXR 2026 Sarawak";
