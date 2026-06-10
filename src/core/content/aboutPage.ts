export const ABOUT_ACCENT = "#ef783d";

export const COMPANY_OVERVIEW = {
  title:
    "The Definitive Platform Connecting Innovators Across Asia's Immersive Future",
  body: [
    "XR Asia Summits, founded by Louis Clovis, is a premier AI-XR platform focused on the latest advancements in AI, Virtual, Augmented, and Extended Reality (XR). We connect global XR creators and industry leaders, showcasing innovative production techniques and immersive, story-driven content.",
    "The platform features live sessions from top global speakers, covering industries such as film, broadcast, virtual travel, gaming /esports and education. XR Summits also offers virtual networking and presentations, fostering discussions on how XR technology is transforming XR storytelling and shaping the future of immersive experiences.",
  ],
} as const;

export const OUR_MISSION = {
  title: "Double business with half the impact.",
  body: "Our mission is to advance XR production techniques, foster upskilling opportunities, and highlight case studies on immersive, story-driven content. By connecting top XR creators and industry leaders from around the globe, XR Summits serves as a catalyst for innovation in XR technology and storytelling via it’s signature event XR Asia Summits.",
  highlight:
    "Connecting industry leaders, creators, educators, broadcasters, governments and technology innovators through deployment-ready immersive experiences.",
} as const;

export const WHY_XR_PILLARS = [
  {
    title: "Premier Event Organiser",
    description:
      "XR Summits is the leading platform for immersive XR technology, bringing together visionaries in Virtual Production, XR technology, and Immersive tech.",
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
    "XR Summits focus on how immersive technologies like Virtual Reality (VR), Augmented Reality (AR), and Extended Reality (XR) are transforming various industries. Key sectors include:",
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
  ],

  footer:
    "XR Summits explore the latest trends and innovations across these sectors, showcasing how XR is reshaping industries.",
} as const;

export const AWARDS_RECOGNITION = {
  intro:
    "XR Summits Sdn Bhd received an accolade in the Initiative Award – Malaysia for AI-XR Production category at the Asia-Pacific Broadcasting+ Awards 2026 for its work in advancing Extended Reality (XR), virtual production, and AI-generated content across Southeast Asia.",
  image: "/awards/awards.png",
} as const;

export const TRACK_RECORD = [
  {
    year: "2021",
    title: "XR Asia Summit",
    detail:
      "The inaugural summit welcomed 100+ attendees and 25+ speakers to kick off Asia's immersive technology gathering.",
  },
  {
    year: "2022",
    title: "2nd XR Asia Summit",
    detail:
      "A dynamic gathering with 200+ attendees, hands-on workshops, and an XR solutions showcase connecting industry leaders across the region.",
  },
  {
    year: "2023",
    title: "3rd XR Asia Summit",
    detail:
      "500+ attendees at the Malaysia Digital Content Festival 2023, in collaboration with MDEC — cementing XRAS as a premier regional platform.",
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
  highlight: "XR Summits is Asia's stage — but the world shows up for it.",
  body: "Our speakers and participants have come from the UK, US, Canada, France, Germany, Spain, the Netherlands, Turkey, Japan, China, Vietnam, Indonesia, and beyond. Because when Asia's immersive tech industry moves, the world pays attention.",
} as const;

export const networkNodes = [
  { id: "ca", label: "Canada", x: 120, y: 120 },
  { id: "us", label: "US", x: 130, y: 180 },
  { id: "uk", label: "UK", x: 360, y: 110 },
  { id: "nl", label: "Netherlands", x: 390, y: 80 },
  { id: "de", label: "Germany", x: 440, y: 100 },
  { id: "fr", label: "France", x: 380, y: 150 },
  { id: "es", label: "Spain", x: 340, y: 190 },
  { id: "tr", label: "Turkey", x: 480, y: 170 },
  { id: "cn", label: "China", x: 630, y: 130 },
  { id: "jp", label: "Japan", x: 740, y: 110 },
  { id: "vn", label: "Vietnam", x: 570, y: 190 },
];

export const epicenterNodes = [
  { id: "my", label: "Malaysia", x: 620, y: 260 },
  { id: "id", label: "Indonesia", x: 660, y: 310 },
];

export const epicenterTarget = { x: 640, y: 285 };
