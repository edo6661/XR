export const ABOUT_ACCENT = "#fb923c";

export const COMPANY_OVERVIEW = {
  title: "Asia\u2019s gateway for deployment-ready immersive innovation",
  body: [
    "XR Summits is the definitive platform connecting industry leaders, creators, educators, broadcasters, governments, and technology innovators across AI, XR, spatial media, virtual production, and immersive technology.",
    "Since 2021, we have convened the region\u2019s most influential voices to move beyond hype \u2014 toward real-world adoption, partnerships, and talent development.",
  ],
} as const;

export const OUR_MISSION = {
  title: "Connecting ecosystems. Accelerating deployment.",
  body: "Our mission is to unite Asia\u2019s immersive technology ecosystem through flagship summits, regional gateways, and year-round programmes that turn innovation into measurable outcomes \u2014 for enterprise, culture, education, and future talent.",
} as const;

export const INDUSTRY_FOCUS_PILLARS = [
  {
    title: "AI \u00d7 XR Convergence",
    description:
      "Generative AI, neural rendering, and spatial computing pipelines for creators and enterprises shipping real products.",
    accentColor: "#fb923c",
    featured: true,
  },
  {
    title: "Spatial Media & VP",
    description:
      "Virtual production, volumetric storytelling, and broadcast-ready immersive content at scale.",
    accentColor: "#22d3ee",
    featured: false,
  },
  {
    title: "Enterprise Deployment",
    description:
      "Training, manufacturing, healthcare, and government use cases with measurable ROI from XR adoption.",
    accentColor: "#a78bfa",
    featured: false,
  },
  {
    title: "Culture & Talent",
    description:
      "Film, esports, hackathons, and masterclasses developing the next generation of immersive creators.",
    accentColor: "#4ade80",
    featured: false,
  },
] as const;

export const REGIONAL_NETWORK_PILLARS = [
  {
    title: "Kuala Lumpur Flagship",
    description:
      "XRAS KL hosts the conference, expo, grand finals, and AI/XR Awards Gala \u2014 the anchor of the regional calendar.",
    accentColor: "#fb923c",
    featured: true,
  },
  {
    title: "Sarawak Regional Gateway",
    description:
      "AIXR Sarawak extends the network with culture-forward programming, semi-finals, and Borneo talent development.",
    accentColor: "#22d3ee",
    featured: false,
  },
  {
    title: "Pan-Asia Network",
    description:
      "Partnerships with governments, universities, studios, and global technology leaders across ASEAN and beyond.",
    accentColor: "#d9b27a",
    featured: false,
  },
] as const;

export const TRACK_RECORD = [
  {
    year: "2021",
    title: "Inaugural XR Asia Summit",
    detail: "First edition establishes KL as a regional immersive hub.",
  },
  {
    year: "2022",
    title: "Expanded Expo & Workshops",
    detail: "Deeper hands-on tracks and enterprise showcase floor.",
  },
  {
    year: "2023",
    title: "AI \u00d7 XR Convergence",
    detail: "Programming reflects generative AI and spatial media maturity.",
  },
  {
    year: "2024",
    title: "4th Edition Growth",
    detail: "Record engagement across keynotes, hackathon, and esports.",
  },
  {
    year: "2025",
    title: "Regional Expansion",
    detail: "Strengthened government, university, and studio partnerships.",
  },
  {
    year: "2026",
    title: "Dual Gateway Model",
    detail: "XRAS KL flagship plus AIXR Sarawak regional summit.",
  },
] as const;

export const ABOUT_STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Industry Leaders",
    sublabel: "Connected across editions",
    accentColor: "#fb923c",
  },
  {
    value: 40,
    suffix: "+",
    label: "Expert Speakers",
    sublabel: "Global practitioners",
    accentColor: "#22d3ee",
  },
  {
    value: 6,
    suffix: "",
    label: "Years of Track Record",
    sublabel: "2021 \u2013 2026 timeline",
    accentColor: "#a78bfa",
  },
] as const;

export const AWARDS = [
  { title: "AI/XR Innovation Award", year: "Annual", category: "Excellence" },
  {
    title: "Spatial Media Studio of the Year",
    year: "Annual",
    category: "Industry",
  },
  { title: "Future Talent Recognition", year: "Annual", category: "Education" },
  {
    title: "Government & Deployment Award",
    year: "Annual",
    category: "Impact",
  },
] as const;

export const STRATEGIC_PARTNER_SLOTS = 8;

export const TEAM_MEMBERS = [
  { name: "Leadership", role: "Summit Director", department: "Executive" },
  { name: "Programme", role: "Head of Content", department: "Operations" },
  { name: "Partnerships", role: "Strategic Alliances", department: "Growth" },
  { name: "Experience", role: "Immersive Production", department: "Creative" },
  { name: "Regional", role: "Sarawak Gateway Lead", department: "AIXR" },
  { name: "Community", role: "Talent & Hackathon", department: "Engagement" },
] as const;

export const MEDIA_PRESS = [
  { outlet: "Press Release", type: "Announcement", date: "2026" },
  { outlet: "Industry Coverage", type: "Feature", date: "Placeholder" },
  { outlet: "Photo Gallery", type: "Media Kit", date: "Coming soon" },
  { outlet: "Accreditation", type: "Press Pass", date: "Apply via Contact" },
] as const;
