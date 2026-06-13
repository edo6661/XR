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
    name: "Sam Majid",
    role: "AI Policy Leader & CEO",
    company: "National AI Office (Malaysia)",
    photo: "/speaker-pics/Sam Majid.jpg",
    accentColor: "#ef783d",
    focusAreas: [
      "Digital Transformation",
      "AI & Public Sector",
      "National AI Strategy",
    ],
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
    name: "Rohit Kapoor",
    role: "Studio Executive",
    company: "Annapurna Studios",
    photo: "/speaker-pics/ROHIT.jpg",
    accentColor: "#fedb21",
    focusAreas: ["Film Production", "Studio Operations", "Content Development"],
  },

  {
    name: "Lukasz Mirocha",
    role: "International XR Industry Expert",
    company: "International",
    photo: "/speaker-pics/Lukasz Mirocha.jpeg",
    accentColor: "#3953a3",
    focusAreas: ["XR Innovation", "Digital Creativity", "Emerging Media"],
  },
  {
    name: "Virgile Mangiavillano",
    role: "Co-founder, VR Future",
    company: "Müzeverse (Türkiye)",
    photo: "/speaker-pics/Virgile Mangiavillano.jpg",
    accentColor: "#fedb21",
    focusAreas: ["XR Museums", "Immersive Storytelling", "Digital Heritage"],
  },
  {
    name: "Amirsoleiman Esfandiari",
    role: "Founder",
    company: "Techcopter",
    photo: "/speaker-pics/Amirsoleiman E.jpg",
    accentColor: "#ef783d",
    focusAreas: ["Industrial VR", "Digital Twins", "Simulation & Training"],
  },
  {
    name: "Lakshmi Deshpande",
    role: "Head of XR Innovation & Design",
    company: "",
    photo: "/speaker-pics/Lakshmi Deshpande.jpg",
    accentColor: "#3953a3",
    focusAreas: ["Spatial Design", "XR + AI", "Immersive Storytelling"],
  },

  {
    name: "Datin Noorlindah Hassan",
    role: "Deputy Director",
    company: "Multimedia University",
    photo: "/speaker-pics/Datin Noorlindah.jpg",
    accentColor: "#ef783d",
    focusAreas: ["Higher Education", "Digital Learning", "Innovation"],
  },
  {
    name: "Dr. Yahaya Abdullah",
    role: "Academic Lead",
    company: "Management and Science University, Malaysia",
    photo: "/speaker-pics/Dr Yahaya Abdullah.jpg",
    accentColor: "#3953a3",
    focusAreas: [
      "Games Development",
      "Industry Collaboration",
      "Creative Tech",
    ],
  },
  {
    name: "Assoc. Prod. Ts. Dr. Safaa N. S. Al-Humairi",
    role: "Robotics & Mechatronics Specialist",
    company: "Management and Science University, Malaysia",
    photo: "/speaker-pics/Safaa Al-Humairi.webp",
    accentColor: "#fedb21",
    focusAreas: [
      "Robotics Innovation",
      "Embedded Systems",
      "Smart Mechatronics",
      "Intelligent Automation",
    ],
  },
] as const;

export const XRAS_KL_META = {
  title: "XRAS KL 26' | XR Summits",
  description:
    "XR Asia Summit Kuala Lumpur 2026 — flagship conference, expo, workshops, coaching, masterclasses, grand finals, and AI/XR Awards Gala.",
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
