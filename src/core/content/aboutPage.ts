export const ABOUT_ACCENT = "#ef783d";

export const COMPANY_OVERVIEW = {
  title: "Connecting Innovators Across Asia's Immersive Future",
  body: [
    "XR Asia Summit, founded by Louis Clovis, is a premier AI-XR platform dedicated to advancing the future of Artificial Intelligence, Virtual Reality, Augmented Reality, Extended Reality and Spatial Computing.",
    "The summit brings together global XR creators, technology innovators, industry leaders, researchers, policymakers and decision-makers to explore the latest advancements in AI, XR and immersive technologies. Through cutting-edge production techniques, immersive experiences and transformative applications, the platform showcases innovation across a wide range of sectors, including film, broadcast, virtual production, gaming, esports, healthcare, defence, aviation, automotive, manufacturing, education, tourism and enterprise transformation.",
    "Through world-class speaker sessions, industry showcases, networking opportunities, masterclasses and strategic presentations, XR Asia Summit drives meaningful conversations on how AI and XR are transforming storytelling, business, learning, industry and the future of human experience.",
  ],
} as const;

export const OUR_MISSION = {
  title: "Maximum reach. Minimum friction.",
  body: "XR ASIA SUMMIT exists to accelerate what the XR industry can achieve together. By connecting creators, industry leaders, educators, broadcasters, governments, and technology innovators through deployment-ready immersive experiences, we eliminate the silos that slow growth — so every stakeholder gets more value from every conversation, every session, and every collaboration.",
} as const;

export const WHY_XR_PILLARS = [
  {
    title: "Premier Event Organiser",
    description:
      "Leading platform for immersive XR technology, bringing together visionaries in Virtual Production, XR technology, and Immersive tech.",
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
    "XR ASIA SUMMIT focus on how immersive technologies like Virtual Reality (VR), Augmented Reality (AR), and Extended Reality (XR) are transforming various industries. XR ASIA SUMMIT explore the latest trends and innovations across these sectors, showcasing how XR is reshaping industries. Key sectors include:",
  sectors: [
    {
      title: "Medical XR",
      desc: "Transforming healthcare through immersive training, patient care, and advanced visualisation.",
      bullets: [
        "Surgical training & simulation",
        "Anatomy & medical education",
        "Remote consultation & collaboration",
      ],
      image: "/industry-focus/doctor.jpeg",
    },
    {
      title: "Military XR",
      desc: "Enhancing readiness, mission success, and decision-making across the defense ecosystem.",
      bullets: [
        "Simulation & mission rehearsal",
        "Tactical training & wargaming",
        "Situational awareness & battlefield visualisation",
      ],
      image: "/industry-focus/military-vr.jpeg",
    },
    {
      title: "Aviation XR",
      desc: "Elevating flight operations, training, maintenance, and passenger experiences.",
      bullets: [
        "Pilot training & flight simulation",
        "Maintenance, repair & overhaul (MRO) guidance",
        "Safety & emergency response drills",
      ],
      image: "/industry-focus/people-with-gun.png",
    },
    {
      title: "Broadcast & Sports XR",
      desc: "Redefining how sports are produced, experienced, and consumed through immersive technologies.",
      bullets: [
        "Real-time XR broadcasting & virtual production",
        "Interactive fan engagement & immersive storytelling",
        "Performance training, simulation & sports analytics",
      ],
      image: "/industry-focus/Broadcast_&_Sports_XR.png",
    },
  ],
} as const;

export const AWARDS_RECOGNITION = {
  companyName: "XR Summits Sdn Bhd",
  body: "received an accolade in the Initiative Award – Malaysia for AI-XR Production category at the Asia-Pacific Broadcasting+ Awards 2026 for its work in advancing Extended Reality (XR), virtual production, and AI-generated content across Southeast Asia.",
  event: "Asia-Pacific Broadcasting+ Awards 2026",
  date: "21 May 2026",
  category: "Initiative Award – Malaysia",
  subcategory: "AI-XR Production",
  logo: "/awards/awards_new.jpeg",
  ceremonyPhoto: "/awards/XR_Summits_Sdn_Bhd_APB_Awards.jpg",
  ceremonyPhotoAlt:
    "XR Summits Sdn Bhd receiving the Initiative Award at the Asia-Pacific Broadcasting+ Awards 2026",
} as const;

export const TRACK_RECORD = [
  {
    year: "2021",
    title: "XR ASIA SUMMIT 2021",
    detail:
      "25 – 27 November 2021 · 100+ attendees. The inaugural webinar-led conference established knowledge sharing, industry dialogue, and community building as the Summit's core pillars.",
  },
  {
    year: "2022",
    title: "XR ASIA SUMMIT 2022",
    detail:
      "11 – 13 November 2022 · 200+ attendees. A full in-person experience with an XR solutions showcase, hands-on workshops, and curated sessions across three days.",
  },
  {
    year: "2023",
    title: "XR ASIA SUMMIT 2023",
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

export const SUSTAINABILITY_COMMITMENT = {
  eyebrow: "Sustainability Commitment",
  title: "Advancing Technology Responsibly.",
  intro:
    "We recognise that the immersive technology industry — and the activities that support it — carry an environmental responsibility. We are committed to conducting our activities with awareness, accountability, and continuous improvement.",
  practiceLead: "In practice, this means:",
  practices: [
    "Complying with all applicable environmental regulations and legislation governing our event operations",
    "Prioritising recyclable and sustainably sourced materials across our event production and collateral",
    "Reviewing the environmental impact of our activities on an ongoing basis and identifying areas for improvement",
    "Aligning our programmes and initiatives with the United Nations Sustainable Development Goals (SDGs), recognising the role of AI and XR technology in shaping a more equitable and sustainable future",
    "Engaging our partners, sponsors, and vendors in shared responsibility toward greener event practices",
  ],
  closing:
    "We are committed to raising the bar — not just for our industry, but for how industry events in Asia are run.",
  images: {
    /** Hand + holographic globe — hero atmosphere, ties XR tech to sustainability */
    hero: "/sustainability (3).jpg.jpeg",
    /** Leaf footprint — inset visual, echoes client carbon-footprint reference */
    footprint: "/sustainability (2).jpg.jpeg",
    /** Green earth — decorative accent with transparent background */
    earth: "/sustainability/sustainability.png",
  },
} as const;

export {
  networkNodes,
  MALAYSIA_HUB,
  regionalNodes,
  SPEAKER_COUNTRY_ISO,
} from "./regionalNetworkMap";
