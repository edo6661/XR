export const XRAS_KL_ACCENT = "#fb923c";

export type SpeakerType = "guest" | "sponsor";

export type XrasSpeaker = {
  name: string;
  role: string;
  company: string;
  photo: string;
  accentColor?: string;
  /** Guest = country flag; Sponsor = company logo in detail popup */
  speakerType?: SpeakerType;
  /** Guest speaker country label (e.g. Malaysia) — resolves flag via /country-flags/ */
  country?: string;
  countryFlagUrl?: string;
  companyLogoUrl?: string;
  /** Speaker session topic / syllabus (optional until provided) */
  topic?: string;
  bio?: string;
};

export const XRAS_KL_SPEAKERS: readonly XrasSpeaker[] = [
  {
    name: "Shamsul Izhan Abdul Majid",
    role: "Former CEO",
    company: "Malaysia National AI Office (NAIO)",
    photo: "/speaker-pics/Sam Majid.jpg",
    accentColor: "#ef783d",
    speakerType: "guest",
    country: "Malaysia",
  },
  {
    name: "Prof. Jeasy Sehgal",
    role: "Creative Director, Graphic Monk Limited",
    company: "Unreal Engine GOLD Authorised Instructor Partner",
    photo: "/speaker-pics/Jeasy Sehgal.png",
    accentColor: "#ef783d",
    speakerType: "guest",
    country: "Norway",
    bio: 'Prof. Jagmeet Singh (Jeasy Sehgal) is an internationally acclaimed filmmaker and emerging technology strategist with 30+ years of global experience. An Unreal Engine GOLD Authorized Instructor Partner and Professor of Practice (former) at Georgia State University, he bridges the gap between Hollywood-grade production and scientific research. Having delivered solutions for Fortune 500 giants like Ferrari, Pepsi, FOX DC, and the Weta Group, he is a pioneer in Virtual Production and Realistic Digital Humans. As the founder of Graphic Monk Production, Virtual Production Dojo and Vivience AI, his groundbreaking research in "Affective-Emotive Resonance" (AER) is architecting the next era of empathetic, relational AI and immersive storytelling.',
  },
  {
    name: "Rohit Kapoor",
    role: "Virtual Production Supervisor",
    company: "Annapurna Studios",
    photo: "/speaker-pics/ROHIT.jpg",
    accentColor: "#ef783d",
    speakerType: "guest",
    country: "India",
    bio: "Rohit Kapoor is Virtual Production Supervisor at Annapurna Studios, India, with over 10 years of Unreal Engine experience and a career spanning gaming and film. A pioneer in India's virtual production landscape, he led the setup of India's first and largest curved LED Volume and has delivered industry seminars on Unreal Engine and VP pipelines. His expertise spans ICVFX setups, nDisplay, camera tracking, real-time keying, UE Environments and LED wall systems. Alongside his technical work, he also leads the Virtual Art Department at Annapurna Studios, driving high-quality real-time production for India's biggest projects. Previously at Red Chillies Entertainment and game studios including Lemon Sky and Codemasters, Rohit brings a rare blend of technical depth and creative vision to immersive storytelling.",
  },
  {
    name: "Chaitanya Chinchlikar",
    role: "Vice President, Business Head & CTO (Emerging Media)",
    company: "Whistling Woods International",
    photo: "/speaker-pics/Chaitanya.jpeg",
    accentColor: "#0ea5e9",
    speakerType: "guest",
    country: "India",
  },
  {
    name: "Dr. Lukasz Mirocha",
    role: "Founder",
    company: "Opus Lab",
    photo: "/speaker-pics/Lukasz Mirocha.jpeg",
    accentColor: "#0ea5e9",
    speakerType: "guest",
    country: "Hong Kong",
  },
  {
    name: "Florin Ursu",
    role: "Vice President of Platform Quality and Stability",
    company: "Xsolla",
    photo: "/speaker-pics/Florin Ursu.jpg.jpeg",
    accentColor: "#0ea5e9",
    speakerType: "guest",
    country: "Malaysia",
  },
  {
    name: "Virgile Mangiavillano",
    role: "Co-Founder",
    company: "VR Future & Müzeverse",
    photo: "/speaker-pics/Virgile Mangiavillano.jpg",
    accentColor: "#ef783d",
    speakerType: "guest",
    country: "Turkey",
    bio: "Virgile Mangiavillano is the Co-Founder of VR Future and Müzeverse, the first Virtual Reality Museum in Türkiye and the MENA region. With a background in acting and technology, he has collaborated with Netflix, Ridley Scott, and the Avignon Festival. His work was selected at the Cannes Film Festival. As an XR expert, he advises institutions and speaks at leading global events including AWE, UnitedXR, Venice & Cannes Immersive, and Immersive Tech Week.",
  },
  {
    name: "Lakshmi Deshpande",
    role: "Head of Spatial AI & Immersive Experience Design",
    company: "",
    photo: "/speaker-pics/Lakshmi Deshpande.jpg",
    accentColor: "#ef783d",
    speakerType: "guest",
    country: "India",
    bio: "Lakshmi leads a multidisciplinary team designing intelligent spatial experiences that blend XR, AI, and immersive storytelling. She specialises in translating emerging technologies into intuitive, human-centered solutions that transform how people collaborate, train, and engage with immersive environments.\n\nAt the intersection of design, technology, and human behavior, Lakshmi explores how Spatial Computing is reshaping the way people interact with information, environments, and one another. As a spatial storyteller, she blends immersive technologies, intelligent systems, and design thinking to create experiences that are engaging, meaningful, and future-focused.\n\nLakshmi holds a Master's degree in Visual Communication from IDC School of Design, IIT Bombay. Beyond her professional work, she is passionate about visual thinking, AI-assisted creativity, behavioral design, and blogging about new forms of storytelling.",
  },
  {
    name: "Ryoichi Wada",
    role: "CEO",
    company: "Tokyo Epic Inc",
    photo: "/speaker-pics/Ryoichi Wada.jpeg",
    accentColor: "#fedb21",
    speakerType: "guest",
    country: "Japan",
  },
  {
    name: "Robert Majoch (Bobby)",
    role: "Visual Design and Marketing Specialist",
    company: "Monnver LLC",
    photo: "/speaker-pics/Robert Majoch.jpg.jpeg",
    accentColor: "#fedb21",
    speakerType: "guest",
    country: "US",
    bio: "Bobby Majoch is an international award-winning filmmaker and visual design and marketing specialist working at the intersection of real-time 3D, artificial intelligence, and immersive storytelling. His short film Requited earned more than fifty international festival awards, and his work spans virtual production and broadcast, with credits including collaborations connected to Fox Broadcasting and JPMorgan.\n\nHe leads creative and content direction for large-scale immersive experiences, translating emerging spatial technologies into work that reaches audiences at scale. He builds in Unreal Engine, develops generative AI pipelines for content creation, and consults on the visual language of XR, from previsualization through final delivery.\n\nBobby's work is grounded in both craft and inquiry. He holds an MFA in Digital Filmmaking and Virtual Production from Georgia State University's Creative Media Industries Institute, and has taught courses in level design, previsualization, writing, and entrepreneurship. He also holds an MA in Philosophy and has taught critical thinking, which anchors his ongoing interest in authenticity, subjectivity, and what creative technology can and cannot capture about human experience.\n\nHis graduate research, a real-time virtual reconstruction of Atlanta's Chattahoochee Brick Company developed with Pulitzer Prize-winning historian Douglas Blackmon, explores simulation as an instrument for memory, history, and ethics.\n\nHis broader mission is to bridge technical capability and human meaning, ensuring that as spatial media advances, the stories it tells stay genuinely human, and that the people experiencing them remain at the center of the work.",
  },
  {
    name: "Amirsoleiman Esfandiari",
    role: "Founder",
    company: "Techcopter & Techwedia+",
    photo: "/speaker-pics/Amirsoleiman E.jpg",
    accentColor: "#ef783d",
    speakerType: "guest",
    country: "UK",
  },
  {
    name: "Dimitri Josephine",
    role: "Virtual Art Director & Head of Virtual Production",
    company: "Unreal Engine Authorised Instructor",
    photo: "/speaker-pics/Dimitri Josephine.jpg.jpeg",
    accentColor: "#fedb21",
    speakerType: "guest",
    country: "Indonesia",
    bio: "Dimitri Josephine is a Virtual Art Director and Head of Virtual Production working at the intersection of immersive storytelling, real-time technology, and XR experiences. She is the first Unreal Engine Authorised Instructor in Indonesia and an early pioneer in Southeast Asia's virtual production industry. She has contributed to a range of large-scale virtual production projects and extends this practice into creative technology education through workshops and talks across industry and academic contexts. She is currently undertaking doctoral research on adaptive audience experiences, generative AI, and co-authorship in immersive and XR storytelling.",
  },
  {
    name: "Datin Noorlindah",
    role: "Deputy Director",
    company: "Multimedia University",
    photo: "/speaker-pics/Datin Noorlindah.jpg",
    accentColor: "#fedb21",
    speakerType: "guest",
    country: "Malaysia",
  },
  {
    name: "Prof. Yoki Chin",
    role: "President",
    company: "POINT College",
    photo: "/speaker-pics/Prof Yoki.jpg.jpeg",
    accentColor: "#fedb21",
    speakerType: "guest",
    country: "Malaysia",
  },
  {
    name: "Dr. Yahaya Abdullah",
    role: "Senior Lecturer/Industry Strategy Architect",
    company: "Management and Science University (MSU)",
    photo: "/speaker-pics/Dr Yahaya Abdullah.jpg",
    accentColor: "#0ea5e9",
    speakerType: "guest",
    country: "Malaysia",
  },
  {
    name: "Assoc. Prof. Ts. Dr. Safaa N.S. Al-Humairi",
    role: "Deputy Dean of Research, Internationalisation, and Industry / Robotics & Mechatronics Specialist",
    company: "Management and Science University (MSU)",
    photo: "/speaker-pics/Safaa Al-Humairi.webp",
    accentColor: "#0ea5e9",
    speakerType: "guest",
    country: "Malaysia",
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
  tagline: "Competitive gaming, produced like a broadcast.",
  body: "The Grand Final — produced using XR stage technology, volumetric graphics, and AI-driven broadcast systems. Where esports meets next-generation live production.",
  headline: "The Future of Interactive Media Live on Stage.",
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
    { name: "AI-XR ESPORTS CUP AWARDS (X 5 MEMBERS)", count: "5 AWARDS" },
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
