export const ABOUT_ACCENT = "#fb923c";

export const COMPANY_OVERVIEW = {
  title:
    "The Definitive Platform Connecting Innovators Across Asia's Immersive Future",
  body: [
    "XR Summits Sdn Bhd is the definitive platform connecting innovators across Extended Reality (XR), Spatial Media, AVXR, immersive technologies, and the evolving future of esports. It serves as the region's central hub for showcasing production-ready solutions and forging high-value commercial partnerships.",
    "XR Summits represents a decisive shift in the immersive industry — Deployment Ready. Innovation in Action. Reality Redefined.",
  ],
} as const;

export const OUR_MISSION = {
  title: "Connecting ecosystems. Accelerating deployment.",
  body: "Our mission is to unite Asia\u2019s immersive technology ecosystem through flagship summits, regional gateways, and year-round programmes that turn innovation into measurable outcomes \u2014 for enterprise, culture, education, and future talent. We advance XR production, connect leaders, and support real-world adoption across ASEAN and beyond.",
} as const;

export const INDUSTRY_FOCUS_PILLARS = [
  {
    title: "Premier Event Organiser",
    description:
      "Delivering world-class Virtual Production, XR, and Immersive Technology events that connect Asia\u2019s leading innovators with global industry.",
    accentColor: "#fb923c",
    featured: true,
  },
  {
    title: "World-Class Masterclass",
    description:
      "Expert-led intensives on XR & AI, virtual production techniques, and spatial storytelling for creators and enterprise teams.",
    accentColor: "#22d3ee",
    featured: false,
  },
  {
    title: "Global XR Community",
    description:
      "Connect with brilliant minds and receive expert advice through our growing pan-Asia network of industry leaders and innovators.",
    accentColor: "#a78bfa",
    featured: false,
  },
  {
    title: "Talent & Future Development",
    description:
      "Film, esports, hackathons, and masterclasses developing the next generation of immersive creators and spatial computing professionals.",
    accentColor: "#4ade80",
    featured: false,
  },
] as const;

export const REGIONAL_NETWORK_PILLARS = [
  {
    title: "Kuala Lumpur Flagship",
    description:
      "XRAS KL hosts the conference, expo, grand finals, and AI/XR Awards Gala \u2014 the anchor of the regional calendar. 1\u20133 Dec 2026, MITEC.",
    accentColor: "#fb923c",
    featured: true,
  },
  {
    title: "Sarawak Regional Gateway",
    description:
      "AIXR Sarawak extends the network with culture-forward programming, semi-finals, and Borneo talent development. 16\u201317 Oct 2026, BCCK.",
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
    detail:
      "25\u201327 Nov. First edition establishes KL as a regional immersive hub with 100+ attendees.",
  },
  {
    year: "2022",
    title: "XR Asia Summit + Broadcast Digital Awards",
    detail:
      "11\u201313 Nov. 200+ attendees. Dynamic gathering featuring XR solutions showcase, hands-on workshops, and inaugural awards ceremony.",
  },
  {
    year: "2023",
    title: "AI \u00d7 XR Convergence — Malaysia Digital Content Festival",
    detail:
      "27\u201329 Sep. 500+ attendees. Held as part of MDCF, a landmark collaboration between Broadcast Elements and MDEC.",
  },
  {
    year: "2024",
    title: "4th Edition Growth",
    detail:
      "Record engagement across keynotes, hackathon, and esports. 40+ workshops across all editions, 75+ partners.",
  },
  {
    year: "2025",
    title: "Regional Expansion",
    detail:
      "Strengthened government, university, and studio partnerships. Total 1,430+ attendees across all editions.",
  },
  {
    year: "2026",
    title: "Dual Gateway Model",
    detail:
      "XRAS KL flagship (MITEC, 1\u20133 Dec) plus AIXR Sarawak regional summit (BCCK, 16\u201317 Oct).",
  },
] as const;

export const ABOUT_STATS = [
  {
    value: 1430,
    suffix: "+",
    label: "Total Attendees",
    sublabel: "Across all editions 2021\u20132024",
    accentColor: "#fb923c",
  },
  {
    value: 40,
    suffix: "+",
    label: "Total Workshops",
    sublabel: "Expert-led sessions delivered",
    accentColor: "#22d3ee",
  },
  {
    value: 75,
    suffix: "+",
    label: "Partners",
    sublabel: "Government, industry & studios",
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
  {
    name: "Louis Clovis",
    role: "Founder & Summit Director",
    department: "Executive",
  },
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

/** Industry sectors XR Summits covers */
export const INDUSTRY_SECTORS = [
  "Film & Broadcast",
  "Education",
  "Virtual Travel & Tourism",
  "Events & Entertainment",
  "Gaming & Esports",
] as const;
