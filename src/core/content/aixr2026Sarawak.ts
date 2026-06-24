export const AIXR_SARAWAK_ACCENT = "#fb923c";

export const AIXR_SARAWAK_POSITIONING =
  "Reimagining Heritage Through Artificial Intelligence & Immersive Technology";

export const AIXR_SARAWAK_META = {
  title: "AI·XR Cultural Innovation Forum 2026 | XR Summits",
  description:
    "AI·XR Cultural Innovation Forum 2026 — a prelude to XR Asia Summits 2026. Where heritage meets future technology at BCCK, Kuching, Sarawak, 16–17 October 2026.",
  location: "16–17 October 2026 · BCCK, Kuching, Sarawak",
  edition: "A Prelude to XR Asia Summits 2026",
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
    category: "Day 1",
    title: "Cultural Innovation Forum & Industry Dialogue",
    description:
      "Opening keynote on Kuching as ASEAN's AI & immersive cultural innovation hub, hackathon mothership launch, and industry panels on digital heritage and tourism.",
    featured: true,
  },
  {
    id: "expo",
    category: "Day 2",
    title: "Cultural XR Innovation Showcase",
    description:
      "Interactive experience zones featuring XR exhibitions, AI innovation demos, and creative pitches from hackathon finalists.",
    featured: true,
  },
  {
    id: "workshop-1",
    category: "Training",
    title: "Youth Immersion Lab",
    description:
      "Hands-on training in AI tools, XR storytelling technologies, and spatial media production workflows for the next generation of creative technologists.",
  },
  {
    id: "masterclass-1",
    category: "Masterclass",
    title: "Cultural Documentation Masterclass",
    description:
      "3D scanning, Gaussian Splatting reconstruction, volumetric video capture, and real-time rendering engines for heritage preservation.",
  },
  {
    id: "masterclass-2",
    category: "Masterclass",
    title: "Digital Archiving for Heritage Organisations",
    description:
      "Specialist intensive for museums, tourism agencies, cultural institutions, and heritage bodies digitising Borneo's living heritage.",
  },
  {
    id: "heritage-xr",
    category: "Heritage XR",
    title: "Preserving Heritage Through Immersive Technologies",
    description:
      "VR, AR, mixed reality, spatial computing, and AI-powered reconstruction — from museum digitisation to digital twins of heritage sites.",
  },
  {
    id: "hackathon-semi",
    category: "Hackathon",
    title: "AI Filmmaking Hackathon · Mothership Challenge",
    description:
      "72-hour ASEAN creative sprint producing AI-assisted short films aligned with UN Sustainable Development Goals. Launched at CENTEXS, culminating at BCCK.",
    featured: true,
  },
  {
    id: "esports-semi",
    category: "Semi Finals",
    title: "Esports Semi Finals",
    description:
      "Regional Esports Tournament Semi Final on the road to the Grand Final at XR ASIA SUMMIT 2026 in Kuala Lumpur.",
    featured: true,
  },
] as const;

export const AIXR_SARAWAK_EVENT_NAME = "AI·XR Cultural Innovation Forum 2026";
