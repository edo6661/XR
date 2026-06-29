export const XRAS_KL_ACCENT = "#fb923c";

export type XrasSpeaker = {
  name: string;
  role: string;
  company: string;
  photo: string;
  accentColor?: string;
};

export const XRAS_KL_SPEAKERS: readonly XrasSpeaker[] = [
  {
    name: "Shamsul Izhan Abdul Majid",
    role: "Former CEO",
    company: "Malaysia National AI Office (NAIO)",
    photo: "/speaker-pics/Sam Majid.jpg",
    accentColor: "#ef783d",
  },
  {
    name: "Prof. Jeasy Sehgal",
    role: "Creative Director, Graphic Monk Limited",
    company: "Unreal Engine GOLD Authorised Instructor Partner",
    photo: "/speaker-pics/Jeasy Sehgal.png",
    accentColor: "#ef783d",
  },
  {
    name: "Rohit Kapoor",
    role: "Virtual Production Supervisor",
    company: "Annapurna Studios",
    photo: "/speaker-pics/ROHIT.jpg",
    accentColor: "#ef783d",
  },
  {
    name: "Chaitanya Chinchlikar",
    role: "Vice President, Business Head & CTO (Emerging Media)",
    company: "Whistling Woods International",
    photo: "/speaker-pics/Chaitanya.jpeg",
    accentColor: "#0ea5e9",
  },
  {
    name: "Dr. Lukasz Mirocha",
    role: "Founder",
    company: "Opus Lab",
    photo: "/speaker-pics/Lukasz Mirocha.jpeg",
    accentColor: "#0ea5e9",
  },
  {
    name: "Florin Ursu",
    role: "Vice President of Platform Quality and Stability",
    company: "Xsolla",
    photo: "/speaker-pics/Florin Ursu.jpg.jpeg",
    accentColor: "#0ea5e9",
  },
  {
    name: "Virgile Mangiavillano",
    role: "Co-Founder",
    company: "VR Future & Muzeverse",
    photo: "/speaker-pics/Virgile Mangiavillano.jpg",
    accentColor: "#ef783d",
  },
  {
    name: "Lakshmi Deshpande",
    role: "Head of Spatial AI & Immersive Experience Design",
    company: "",
    photo: "/speaker-pics/Lakshmi Deshpande.jpg",
    accentColor: "#ef783d",
  },
  {
    name: "Ryoichi Wada",
    role: "CEO",
    company: "Tokyo Epic Inc",
    photo: "/speaker-pics/Ryoichi Wada.jpeg",
    accentColor: "#fedb21",
  },
  {
    name: "Robert Majoch (Bobby)",
    role: "Visual Design and Marketing Specialist",
    company: "Monnver LLC",
    photo: "/speaker-pics/Robert Majoch.jpg.jpeg",
    accentColor: "#fedb21",
  },
  {
    name: "Amirsoleiman Esfandiari",
    role: "Founder",
    company: "Techcopter & Techwedia+",
    photo: "/speaker-pics/Amirsoleiman E.jpg",
    accentColor: "#ef783d",
  },
  {
    name: "Dimitri Josephine",
    role: "Virtual Art Director & Head of Virtual Production",
    company: "Unreal Engine Authorised Instructor",
    photo: "/speaker-pics/Dimitri Josephine.jpg.jpeg",
    accentColor: "#fedb21",
  },
  {
    name: "Datin Noorlindah",
    role: "Deputy Director",
    company: "Multimedia University",
    photo: "/speaker-pics/Datin Noorlindah.jpg",
    accentColor: "#fedb21",
  },
  {
    name: "Prof. Yoki Chin",
    role: "President",
    company: "POINT College",
    photo: "/speaker-pics/Prof Yoki.jpg.jpeg",
    accentColor: "#fedb21",
  },
  {
    name: "Dr. Yahaya Abdullah",
    role: "Senior Lecturer/Industry Strategy Architect",
    company: "Management and Science University (MSU)",
    photo: "/speaker-pics/Dr Yahaya Abdullah.jpg",
    accentColor: "#0ea5e9",
  },
  {
    name: "Assoc. Prof. Ts. Dr. Safaa N.S. Al-Humairi",
    role: "Deputy Dean of Research, Internationalisation, and Industry / Robotics & Mechatronics Specialist",
    company: "Management and Science University (MSU)",
    photo: "/speaker-pics/Safaa Al-Humairi.webp",
    accentColor: "#0ea5e9",
  },
] as const;

export type XrasSessionSpeaker = {
  photo?: string;
  name?: string;
  jobTitle?: string;
  organization?: string;
};

export type XrasSessionSlot = {
  title?: string;
  topic?: string;
  speaker?: XrasSessionSpeaker;
  speakers?: XrasSessionSpeaker[];
};

export const XRAS_KL_MASTERCLASS_SLOTS: readonly XrasSessionSlot[] = [
  {
    title: "Masterclass 1",
    topic: "3D Gaussian Splatting (3DGS)",
    speaker: {
      name: "Dr. Lukasz Mirocha",
      jobTitle: "Director",
      organization: "Opus Lab",
      photo: "/speaker-pics/Lukasz Mirocha.jpeg",
    },
  },
  {
    title: "Masterclass 2",
    topic: "Virtual Production, Digital Humans, AI & Future Storytelling",
    speakers: [
      {
        name: "Prof. Jeasy Sehgal",
        jobTitle: "Creative Director",
        organization:
          "Graphic Monk Limited\nUnreal Engine GOLD Authorised Instructor Partner",
        photo: "/speaker-pics/Jeasy Sehgal.png",
      },
      {
        name: "Robert Majoch (Bobby)",
        jobTitle: "Visual Design and Marketing Specialist",
        organization: "Monnver LLC",
        photo: "/speaker-pics/Robert Majoch.jpg.jpeg",
      },
    ],
  },
  {
    title: "Masterclass 3",
    topic: "XR Masterclass (Beginner – Advanced)",
    speaker: {
      name: "Ryoichi Wada",
      jobTitle: "CEO",
      organization: "TOKYO EPIC INC.",
      photo: "/speaker-pics/Ryoichi Wada.jpeg",
    },
  },
  {
    title: "Masterclass 4",
    topic: "AR Wall ICVFX Masterclass",
    speaker: {
      name: "Rene Amador",
      jobTitle: "Co-Founder, Chief Executive Officer",
      photo: "/speaker-pics/Rene Amador.png",
    },
  },
] as const;

export const XRAS_KL_COACHING_SLOTS: readonly XrasSessionSlot[] = [
  {
    topic: "Women Empowerment",
    speakers: [
      {
        name: "Dimitri Josephine",
        jobTitle: "Virtual Art Director &\nHead of Virtual Production",
        organization: "Unreal Engine\nAuthorised Instructor",
        photo: "/speaker-pics/Dimitri Josephine.jpg.jpeg",
      },
      {
        name: "Lakshmi Deshpande",
        jobTitle: "Head of Spatial AI &\nImmersive Experience Design",
        photo: "/speaker-pics/Lakshmi Deshpande.jpg",
      },
    ],
  },
] as const;

export const XRAS_KL_AI_FILMMAKING = {
  highlights: [
    "Hands-on learning  |  No boring presentation  |  Build a real AI-powered film",
    "Build skills. Gain recognition. Launch your future.",
    "Free (Invite) - 3-Days access",
    "Bridging Innovation Across 5 Universities",
    "Top 10 finalists from each campus compete - Prizes at Awards & Gala",
  ],
  framework: {
    title: "Hackathon Experience Framework",
    intro:
      "Participants live and work together in a single location full duration of the hackathon, complete with a shared war room, and review screens.",
    pillars: [
      {
        title: "Cohort environment",
        description:
          "Participants stay together throughout the hackathon, creating a focused, high-energy environment that encourages collaboration, rapid iteration, and peer learning.",
      },
      {
        title: "Daily Cadence",
        description:
          "A structured day–night workflow combining morning briefings and mentor check-ins, build sprints and technical reviews, and evening critiques, refinements, and finalisation.",
      },
      {
        title: "Industry Endorsements",
        description:
          "Supported and recognised by industry partners, agencies, and ecosystem players across XR, AI, media, and enterprise innovation.",
      },
      {
        title: "Operational Support",
        description:
          "A dedicated on-site operations team providing technical assistance, production and demo support, and participant welfare and logistics",
      },
    ],
    challengeBrief:
      "Challenge Brief: Teams respond to a real-world creative and innovation brief, aligned with enterprise, brand, or social-impact objectives.",
  },
  benefits: {
    title: "Participant Benefits",
    items: [
      {
        title: "Prize Pool – Approx. RM25,000",
        description:
          "Cash prizes, technology credits, and partner-sponsored awards.",
      },
      {
        title: "Immediate Access to an All-in-One AI Platform by Wavespeed AI",
        description:
          "Includes ready-to-use AI credits for hackathon development and continued post-event use.",
      },
      {
        title:
          "Complimentary XR/VR/AR Workshop Access to the top 10 winners this round.",
        description:
          "Free tickets to selected workshops at XR ASIA SUMMITS 2026.",
      },
      {
        title: "Industry Exposure & Showcasing at XR ASIA SUMMITS 2026",
        description:
          "Projects will be presented to industry leaders, sponsors, agencies, and potential employers and partners.",
      },
      {
        title: "Industry Certification & Recognition",
        description:
          "Official participation recognition under XR ASIA SUMMITS 2026, supported by sponsors and international industry partners.",
      },
    ],
    closing:
      "You'll walk away with portfolio pieces that open doors, workflows that save months of trial-and-error, and connections to brands actively hiring efficient production partners across",
    countries: [
      { code: "MY", flag: "🇲🇾", label: "Malaysia" },
      { code: "SG", flag: "🇸🇬", label: "Singapore" },
      { code: "ID", flag: "🇮🇩", label: "Indonesia" },
      { code: "TH", flag: "🇹🇭", label: "Thailand" },
      { code: "PH", flag: "🇵🇭", label: "Philippines" },
      { code: "VN", flag: "🇻🇳", label: "Vietnam" },
    ],
    sdgBanner: {
      src: "/booth/17@2x.png",
      alt: "United Nations Sustainable Development Goals 1–17",
      width: 3840,
      height: 226,
    },
  },
} as const;

export const XRAS_KL_ESPORTS = {
  tagline: "The Future of Interactive Media Live on Stage.",
  items: [
    {
      title: "AI-XR Production",
      image: "/others/a.png",
      description:
        "Real-time rendering, virtual environments and intelligent broadcast systems powering the live experience.",
    },
    {
      title: "Interactive Media Showcase",
      image: "/others/b.jpeg",
      description:
        "Demonstrating how gaming, entertainment and immersive technologies converge in front of a live audience.",
    },
  ],
} as const;

export const XRAS_KL_AWARDS_GALA = {
  tagline: "Celebrating Excellence Across AI, XR and Emerging Media.",
  body: "Recognising the organisations, creators and innovators driving the next generation of immersive technologies, digital media and intelligent experiences.",
  headline:
    "RECOGNITION CREATES MOMENTUM. THE INDUSTRY'S BEST DESERVE A STAGE.",
  categories: [
    { name: "AI-XR ESPORTS MLBB CUP AWARDS (X 5 MEMBERS)", count: "5 AWARDS" },
    { name: "AI FILMMAKING AWARDS (TOP 5)", count: "5 AWARDS" },
    { name: "BEST IMMERSIVE EXPERIENCE BOOTH AWARDS", count: "1 AWARD" },
    { name: "BEST USE OF XR IN EDUCATION AND TRAINING", count: "1 AWARD" },
    { name: "BEST USE OF XR IN FILM PRODUCTION", count: "1 AWARD" },
    { name: "BEST USE OF XR IN BROADCAST", count: "1 AWARD" },
  ],
  howToParticipate: {
    title: "HOW TO PARTICIPATE:",
    steps: ["SUBMIT ENTRIES", "ATTEND THE AWARD DINNER", "BE A SPONSOR"],
  },
} as const;

export const XRAS_KL_META = {
  title: "XRAS 26 KL' | XR Summits",
  description:
    "XR ASIA SUMMIT Kuala Lumpur 2026 — flagship conference, expo, workshops, coaching, masterclasses, grand finals, and AI/XR Awards Gala.",
  location: "Kuala Lumpur, Malaysia",
  edition: "4th Edition · 2026",
} as const;

export type XrasProgram = {
  id: string;
  category: string;
  title: string;
  description: string;
  featured?: boolean;
};

/** All program items required by Phase 1 contract for /xras-kl-2026 */
export const XRAS_KL_PROGRAMS: readonly XrasProgram[] = [
  {
    id: "conference",
    category: "Conference",
    title: "XRAS Conference",
    description:
      "Keynotes, panels, and industry tracks spanning AI & Generative Content, Virtual Production, XR & Spatial Media, Digital Twins, and Broadcast Innovation.",
    featured: true,
  },
  {
    id: "expo",
    category: "Expo",
    title: "Immersive Technology Expo",
    description:
      "Hands-on showcases from studios and solution providers featuring deployment-ready products for Enterprise XR, Medical, Aviation, Military XR, and Education Technology.",
    featured: true,
  },
  {
    id: "workshop-1",
    category: "Workshop",
    title: "Workshop I",
    description:
      "Practical deep-dive for creators and technologists building spatial experiences, AI-powered tools, and Immersive Storytelling.",
  },
  {
    id: "workshop-2",
    category: "Workshop",
    title: "Workshop II",
    description:
      "Advanced session focused on pipelines, tools, and production workflows for immersive teams.",
  },
  {
    id: "coaching-1",
    category: "Coaching",
    title: "AI Industry Startup Coaching I",
    description:
      "Mentorship and strategy for founders navigating AI × XR markets, investment readiness, and facilitating Startup and industry networking.",
  },
  {
    id: "coaching-2",
    category: "Coaching",
    title: "AI Industry Startup Coaching II",
    description:
      "Follow-on coaching on partnerships, enterprise pilots, and scaling deployment-ready immersive ventures.",
  },
  {
    id: "masterclass-1",
    category: "Masterclass",
    title: "Masterclass I",
    description:
      "Expert-led intensive on virtual production, spatial storytelling, or real-time immersive pipelines.",
  },
  {
    id: "masterclass-2",
    category: "Masterclass",
    title: "Masterclass II",
    description:
      "Second masterclass track for broadcast, government, education, or enterprise immersive adoption.",
  },
  {
    id: "hackathon-finals",
    category: "Grand Finals",
    title: "AI Filmmaking Hackathon Grand Finals",
    description:
      "The culminating hackathon showcase — teams present AI filmmaking projects before judges and live audiences.",
    featured: true,
  },
  {
    id: "esports-finals",
    category: "Grand Finals",
    title: "Esports Grand Finals",
    description:
      "Championship immersive esports finals defining the Future of Esports, where spatial computing meets competitive entertainment at scale.",
    featured: true,
  },
  {
    id: "awards-gala",
    category: "Gala",
    title: "AI/XR Awards Gala Dinner",
    description:
      "Black-tie awards evening honouring breakthrough studios, innovators, and leaders defining immersive technology in Asia.",
    featured: true,
  },
] as const;
