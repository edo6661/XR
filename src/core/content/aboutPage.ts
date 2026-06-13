export const ABOUT_ACCENT = "#ef783d";

export const COMPANY_OVERVIEW = {
  title: "Connecting Innovators Across Asia's Immersive Future",
  body: [
    "XR Asia Summit, founded by Louis Clovis, is a premier AI-XR platform focused on the latest advancements in AI, Virtual, Augmented, and Extended Reality (XR). We connect global XR creators and industry leaders, showcasing innovative production techniques and immersive, story-driven content.",
    "The platform features live sessions from top global speakers, covering industries such as film, broadcast, virtual travel, gaming /esports and education. XR Asia Summit also offers virtual networking and presentations, fostering discussions on how XR technology is transforming XR storytelling and shaping the future of immersive experiences.",
  ],
} as const;

export const OUR_MISSION = {
  title: "Maximum reach. Minimum friction.",
  body: "XR Asia Summit exists to accelerate what the XR industry can achieve together. By connecting creators, industry leaders, educators, broadcasters, governments, and technology innovators through deployment-ready immersive experiences, we eliminate the silos that slow growth — so every stakeholder gets more value from every conversation, every session, and every collaboration.",
} as const;

export const WHY_XR_PILLARS = [
  {
    title: "Premier Event Organiser",
    description:
      "XR Summit is the leading platform for immersive XR technology, bringing together visionaries in Virtual Production, XR technology, and Immersive tech.",
    accentColor: "#ef783d",
    featured: true,
  },
  {
    title: "World-Class Masterclass",
    description:
      "Learn from industry experts through our comprehensive masterclass programs covering XR & AI, and cutting-edge virtual production techniques.",
    accentColor: "#3953a3",
    featured: false,
  },
  {
    title: "Global XR Community",
    description:
      "Connect with brilliant minds and exceptional leaders who share first-hand experiences, invaluable insights, and expert advice on implementing immersive XR programs.",
    accentColor: "#fedb21",
    featured: false,
  },
] as const;
export const INDUSTRY_FOCUS = {
  description:
    "XR Asia Summit focus on how immersive technologies like Virtual Reality (VR), Augmented Reality (AR), and Extended Reality (XR) are transforming various industries. XR Asia Summit explore the latest trends and innovations across these sectors, showcasing how XR is reshaping industries. Key sectors include:",
  sectors: [
    {
      title: "Film & Broadcast",
      desc: "Virtual sets and real-time effects are revolutionising production.",
      image: "/industry-focus/XR-in-Film-Broadcast.png",
    },
    {
      title: "Education",
      desc: "XR creates engaging, experiential learning environments.",
      image: "/industry-focus/XR-in-Edu.png",
    },
    {
      title: "Virtual Travel & Tourism",
      desc: "Immersive tools allow virtual exploration of destinations.",
      image: "/industry-focus/XR-in-Travel-Tourism.png",
    },
    {
      title: "Events & Entertainment",
      desc: "XR enhances live performances and audience interaction.",
      image: "/industry-focus/XR-in-Entertainments.png",
    },
    {
      title: "Gaming & Esports",
      desc: "XR innovations drive immersive gameplay and competitions.",
      image: "/industry-focus/XR-in-Gaming-Esports.png",
    },
    {
      title: "Government",
      desc: "Enabling Smarter Nations for better workforce development and public service delivery.",
      image: "/industry-focus/XR-in-Gov.png",
    },
  ],
} as const;

export const AWARDS_RECOGNITION = {
  companyName: "XR Summits Sdn Bhd",
  introRest:
    " received an accolade in the Initiative Award – Malaysia for AI-XR Production category at the Asia-Pacific Broadcasting+ Awards 2026 for its work in advancing Extended Reality (XR), virtual production, and AI-generated content across Southeast Asia.",
  image: "/awards/awards.png",
} as const;

export const TRACK_RECORD = [
  {
    year: "2021",
    title: "XR Asia Summit 2021",
    detail:
      "25 – 27 November 2021 · 100+ attendees. The inaugural webinar-led conference established knowledge sharing, industry dialogue, and community building as the Summit's core pillars.",
  },
  {
    year: "2022",
    title: "XR Asia Summit 2022",
    detail:
      "11 – 13 November 2022 · 200+ attendees. A full in-person experience with an XR solutions showcase, hands-on workshops, and curated sessions across three days.",
  },
  {
    year: "2023",
    title: "XR Asia Summit 2023",
    detail:
      "27 – 29 September 2023 · 500+ attendees at the Malaysia Digital Content Festival 2023, in collaboration with Broadcast Elements Sdn Bhd and MDEC.",
  },
] as const;

export const ABOUT_STATS = [
  {
    value: 1430,
    suffix: "+",
    label: "Total Attendees",
    sublabel: "Across all editions 2021–2024",
    accentColor: "#ef783d",
  },
  {
    value: 40,
    suffix: "+",
    label: "Total Workshops",
    sublabel: "Expert-led sessions delivered",
    accentColor: "#3953a3",
  },
  {
    value: 75,
    suffix: "+",
    label: "Partners",
    sublabel: "Government, industry & studios",
    accentColor: "#fedb21",
  },
] as const;

export const STRATEGIC_PARTNER_SLOTS = 8;

export const MEDIA_PRESS = [
  { outlet: "Press Release", type: "Announcement", date: "2026" },
  { outlet: "Industry Coverage", type: "Feature", date: "Placeholder" },
  { outlet: "Photo Gallery", type: "Media Kit", date: "Coming soon" },
  { outlet: "Accreditation", type: "Press Pass", date: "Apply via Contact" },
] as const;

export const REGIONAL_NETWORK = {
  title: "Regional Network",
  highlight: "Asia sets the stage — the world shows up.",
  body: "Our speakers and participants have come from the UK, US, Canada, France, Germany, Spain, the Netherlands, Turkey, Japan, China, Vietnam, Indonesia, and beyond. Malaysia is the most preeminent hub in this network — when Asia's immersive tech industry moves, the world pays attention.",
} as const;

/** Coordinates aligned to stylized map viewBox (1000 × 520) */
export const networkNodes = [
  { id: "ca", label: "Canada", x: 115, y: 165 },
  { id: "us", label: "US", x: 140, y: 215 },
  { id: "uk", label: "UK", x: 364, y: 166 },
  { id: "nl", label: "Netherlands", x: 404, y: 170 },
  { id: "de", label: "Germany", x: 418, y: 178 },
  { id: "fr", label: "France", x: 392, y: 184 },
  { id: "es", label: "Spain", x: 348, y: 204 },
  { id: "tr", label: "Turkey", x: 482, y: 184 },
  { id: "cn", label: "China", x: 648, y: 184 },
  { id: "jp", label: "Japan", x: 720, y: 158 },
  { id: "vn", label: "Vietnam", x: 616, y: 248 },
];

/** Primary hub — all international lines converge here */
export const MALAYSIA_HUB = { id: "my", label: "Malaysia", x: 588, y: 298 };

/** Secondary regional nodes — connect to Malaysia, not treated as epicenter */
export const regionalNodes = [{ id: "id", label: "Indonesia", x: 634, y: 356 }];

/** @deprecated use MALAYSIA_HUB — kept for any legacy imports */
export const epicenterTarget = { x: MALAYSIA_HUB.x, y: MALAYSIA_HUB.y };

/** @deprecated use MALAYSIA_HUB + regionalNodes */
export const epicenterNodes = [MALAYSIA_HUB, ...regionalNodes];
