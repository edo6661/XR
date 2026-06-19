export const XRAS_KL_ACCENT = "#fb923c";

export type XrasSpeaker = {
  name: string;
  role: string;
  company: string;
  photo: string;
  accentColor?: string;
  focusAreas: string[];
};

export const XRAS_KL_SPEAKERS: readonly XrasSpeaker[] = [
  {
    name: "Ali Yaghoubi",
    role: "Founder & CEO",
    company: "Techsign Ltd",
    photo: "/speaker-pics/Ali Yaghoubi.jpg.jpeg",
    accentColor: "#3953a3",
    focusAreas: ["XR Solutions", "Enterprise Technology", "Innovation"],
  },
  {
    name: "Amirsoleiman Esfandiari",
    role: "Founder",
    company: "Techcopter & Techwedia+",
    photo: "/speaker-pics/Amirsoleiman E.jpg",
    accentColor: "#ef783d",
    focusAreas: ["Industrial VR", "Digital Twins", "Simulation & Training"],
  },
  {
    name: "Chaitanya Chinchlikar",
    role: "VP, Business Head & CTO (Emerging Media)",
    company: "Whistling Woods International",
    photo: "/speaker-pics/Chaitanya.jpeg",
    accentColor: "#3953a3",
    focusAreas: ["Media", "Animation", "VFX & XR"],
  },
  {
    name: "Datin Noorlindah",
    role: "Deputy Director",
    company: "Multimedia University",
    photo: "/speaker-pics/Datin Noorlindah.jpg",
    accentColor: "#fedb21",
    focusAreas: ["Higher Education", "Digital Learning", "Innovation"],
  },
  {
    name: "Dimitri Josephine",
    role: "Virtual Production & Unreal Engine Authorised Instructor",
    company: "",
    photo: "/speaker-pics/Dimitri Josephine.jpg.jpeg",
    accentColor: "#fedb21",
    focusAreas: ["Virtual Production", "Unreal Engine", "Real-Time Pipelines"],
  },
  {
    name: "Dr Yahaya Abdullah",
    role: "Academic Lead",
    company: "Management & Science University",
    photo: "/speaker-pics/Dr Yahaya Abdullah.jpg",
    accentColor: "#3953a3",
    focusAreas: [
      "Games Development",
      "Industry Collaboration",
      "Creative Tech",
    ],
  },
  {
    name: "Jeasy Sehgal",
    role: "Founder",
    company: "Graphic Monk Ltd",
    photo: "/speaker-pics/Jeasy Sehgal.png",
    accentColor: "#ef783d",
    focusAreas: ["Creative Tech", "Design", "Digital Media"],
  },
  {
    name: "Lakshmi Deshpande",
    role: "Head of XR Innovation & Design, Featured Speaker, and Programme Contributor",
    company: "",
    photo: "/speaker-pics/Lakshmi Deshpande.jpg",
    accentColor: "#ef783d",
    focusAreas: ["Spatial Design", "XR + AI", "Immersive Storytelling"],
  },
  {
    name: "Lukasz Mirocha",
    role: "Director",
    company: "Omni Lucenti Limited",
    photo: "/speaker-pics/Lukasz Mirocha.jpeg",
    accentColor: "#3953a3",
    focusAreas: ["XR Innovation", "Digital Creativity", "Emerging Media"],
  },
  {
    name: "Prof Ts Dr Safaa N.S. Al-Humari",
    role: "Robotics & Mechatronics Specialist",
    company: "",
    photo: "/speaker-pics/Safaa Al-Humairi.webp",
    accentColor: "#3953a3",
    focusAreas: [
      "Robotics Innovation",
      "Embedded Systems",
      "Smart Mechatronics",
      "Intelligent Automation",
    ],
  },
  {
    name: "Prof Yoki Chin",
    role: "President",
    company: "POINT College",
    photo: "/speaker-pics/Prof Yoki.jpg.jpeg",
    accentColor: "#fedb21",
    focusAreas: ["Higher Education", "Creative Industries", "Leadership"],
  },
  {
    name: "Robert Majoch",
    role: "Visual Design and Marketing Specialist",
    company: "Emory University",
    photo: "/speaker-pics/Robert Majoch.jpg.jpeg",
    accentColor: "#fedb21",
    focusAreas: ["Visual Design", "Marketing", "Creative Technology"],
  },
  {
    name: "Rohit Kapoor",
    role: "Virtual Production Supervisor",
    company: "Annapurna Studios",
    photo: "/speaker-pics/ROHIT.jpg",
    accentColor: "#ef783d",
    focusAreas: ["Virtual Production", "Film Production", "Studio Operations"],
  },
  {
    name: "Ryoichi Wada",
    role: "CEO",
    company: "TOKYO EPIC INC.",
    photo: "/speaker-pics/Ryoichi Wada.png",
    accentColor: "#fedb21",
    focusAreas: ["Immersive Entertainment", "XR Production", "Japan Market"],
  },
  {
    name: "Sam Majid",
    role: "Former Head",
    company: "National AI Office Malaysia",
    photo: "/speaker-pics/Sam Majid.jpg",
    accentColor: "#ef783d",
    focusAreas: [
      "Digital Transformation",
      "AI & Public Sector",
      "National AI Strategy",
    ],
  },
  {
    name: "Virgile Mangiavillano",
    role: "Co-Founder",
    company: "VR Future & Muzeverse",
    photo: "/speaker-pics/Virgile Mangiavillano.jpg",
    accentColor: "#ef783d",
    focusAreas: ["XR Museums", "Immersive Storytelling", "Digital Heritage"],
  },
] as const;

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
