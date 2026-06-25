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
    role: "Chief Executive Officer",
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
    role: "VP, Business Head & CTO (Emerging Media)",
    company: "Whistling Woods International",
    photo: "/speaker-pics/Chaitanya.jpeg",
    accentColor: "#0ea5e9",
  },
  {
    name: "Dr. Lukasz Mirocha",
    role: "Director",
    company: "Opus Lab",
    photo: "/speaker-pics/Lukasz Mirocha.jpeg",
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
    name: "Ryoichi Wada",
    role: "CEO",
    company: "TOKYO EPIC INC.",
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
    company: "POINT College/Future Studios",
    photo: "/speaker-pics/Prof Yoki.jpg.jpeg",
    accentColor: "#fedb21",
  },
  {
    name: "Dr Yahaya Abdullah",
    role: "",
    company: "Management & Science University",
    photo: "/speaker-pics/Dr Yahaya Abdullah.jpg",
    accentColor: "#0ea5e9",
  },
  {
    name: "Assoc. Prof. Ts. Dr. Safaa N.S. Al-Humairi",
    role: "Robotics & Mechatronics Specialist",
    company: "Management & Science University",
    photo: "/speaker-pics/Safaa Al-Humairi.webp",
    accentColor: "#0ea5e9",
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
