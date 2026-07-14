export const HACKATHON_ACCENT = "#fb923c";

export const HACKATHON_EVENT_NAME = "AI Filmmaking Hackathon";

export const HACKATHON_META = {
  title: "AI Filmmaking Hackathon | XR Summits",
  description:
    "XR ASIA SUMMIT 26' Mothership — A 3-day crash-production sprint where teams deliver a client-ready 180-second commercial short using AI and XR workflows.",
  edition: "Mothership · 2026",
  location: "Malaysia",
  dates: "1–3 May 2026",
  finalsDates: "1–3 December 2026",
  contactPhone: "012-2020264",
} as const;

export const HACKATHON_REGISTRATION_URL =
  "https://forms.office.com/r/uUExQZ4Q7E";

export const HACKATHON_HERO = {
  eyebrow: "XR ASIA SUMMIT 26' MOTHERSHIP",
  title: "AI Filmmaking Hackathon",
  subtitle:
    "3 days crash-production sprint where teams deliver a client-ready 180 second commercial short. Real-world production constraints meet cutting-edge AI and XR workflows in Southeast Asia's premier filmmaking challenge.",
} as const;

export const HACKATHON_EXPERIENCE_FRAMEWORK = {
  title: "Hackathon Experience Framework",
  intro:
    "Participants live and work together in a single location full duration of the hackathon, complete with a shared war room, and review screens.",
  pillars: [
    {
      title: "Cohort environment",
      description:
        "Participants stay together throughout the hackathon, creating a focused, high-energy environment that encourages collaboration.",
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
        "A dedicated on-site operations team providing technical assistance, production and demo support, and participant welfare and logistics.",
    },
  ],
} as const;

export const HACKATHON_CHALLENGE_BRIEF =
  "Teams respond to a real-world creative and innovation brief, aligned with enterprise, brand, or social-impact objectives.";

export const HACKATHON_DELIVERABLES = {
  title: "Core Challenge Deliverables",
  intro:
    "Each team is required to deliver the following by the end of the hackathon:",
  items: [
    {
      title: "Main Film",
      description:
        "180-second commercial or narrative piece addressing the provided brand or mission brief.",
    },
    {
      title: "Social Cutdown",
      description:
        "10-second version optimised for social and digital platforms.",
    },
    {
      title: "BTS — Behind The Scene Reel",
      description:
        "≤ 45 seconds showcasing the creative and technical process.",
    },
    {
      title: "Key Art",
      description: "4K poster (3840 × 2160)",
      bullets: ["Final PNG output", "Layered source files included"],
    },
    {
      title: "Documentation Pack",
      bullets: [
        "Mission Choice and Why",
        "Story board",
        "AI Prompts to generate the image",
        "Image Prompts",
        "Ethical sourcing and usage",
      ],
    },
  ],
} as const;

/** Mothership mission challenges — text & SDG ids taken from the brief slides. */
export const HACKATHON_MOTHERSHIP_MISSION = {
  eyebrow: "Mothership Mission",
  title: 'MOTHERSHIP MISSION: "PACKAGING FUTURES"',
  challenges: [
    {
      id: 1,
      title: "Environment, Biodiversity & Waste",
      sdgs: [12, 14, 15],
      image: "/aifilmmakinghackhaton/challenge/1.png",
      sections: [
        {
          body: "Your client is a global wellness brand that just faced an uncomfortable truth:",
          bullets: [
            "82% of its boxed tea packaging (by volume) is recyclable or biodegradable",
            "99% of its supplement bottles (by volume) are recyclable or biodegradable",
            "0% of its psyllium canisters (by volume) are recyclable or biodegradable",
          ],
        },
        {
          body: "They've decided this isn't good enough. Over the next 5 years, they've committed to:",
          bullets: [
            "Phase out all non-sustainable packaging, one component at a time, starting with plastic caps and lids",
            "Shift to plant-based and bio-based materials that come from renewable sources and support, not damage, the natural world",
            "Work with One Step Closer's Packaging Collaborative (40+ mission-driven companies) to test, adopt, and scale better packaging solutions",
          ],
        },
        {
          heading: "Mission Brief (for your film)",
          bullets: [
            "Show the before vs after of their packaging journey",
            "Visualise the move from plastic to plant-based / bio-based",
            "Highlight collaboration – the brand is not alone; it's part of a 40+ company “Mothership alliance” pushing sustainable packaging",
            "Make the audience feel: “If they can change their packaging, what can we change?”",
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Clean Energy . Smart City",
      sdgs: [3, 6, 7, 11],
      image: "/aifilmmakinghackhaton/challenge/2.png",
      sections: [
        {
          heading: "Intro",
          body: "Health isn't just hospitals. It's shaped by water (6), energy (7) and city design (11) long before anyone sees a doctor (3).",
        },
        {
          heading: "Mission",
          body: "Make good health automatic, not accidental.",
        },
        {
          heading: "Your Story Challenge",
          body: "Tell one Malaysian city story where a single family's day shows:",
          bullets: [
            "How water, energy and urban design help or harm their health.",
            "A clear before vs after: car-heavy, flood-prone city → people-first, clean, resilient city.",
            "That better health (SDG 3) is the direct result of smarter choices in SDG 6, 7 & 11.",
          ],
        },
        {
          heading: "Mission Brief",
          body: "Create a film / narrative that:",
          bullets: [
            "Follows one day in the city (home–school–work–clinic–market).",
            "Links each SDG to visible changes (safe water, clean power, walkable streets, cleaner air).",
            "Proposes a simple “Healthy City Scorecard” (e.g. safe water days, blackout hours, air quality, road injuries).",
            "Ends by asking: “If we redesign water, energy and streets, what kind of health can we create for everyone?”",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Peace, Justice & Strong Institutions",
      sdgs: [16],
      image: "/aifilmmakinghackhaton/challenge/3.png",
      sections: [
        {
          heading: "Intro",
          body: "Peace, justice, and strong institutions only exist when people trust them. Corruption, delays, and bias erode rights, safety, and services. Small fixes can restore faith and fairness.",
        },
        {
          heading: "Your Story Challenge",
          body: "Follow a person interacting with one institution—police, court, local council, school, or land office. Show:",
          bullets: [
            "How a rigged system harms them",
            "How a fair system restores trust and safety",
            "The contrast: “rigged vs fair”",
          ],
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Focus on one critical moment: permit, report, dispute, or public service",
            "Reveal decision-making inside the system",
            "Introduce 2–3 fixes: transparent tracking, whistleblower protection, open data",
            "Include a “Trust & Justice Scorecard”: case time, written reasons, bribery reports, access to help, public trust",
            "End with: “If we could redesign one institution we use every year, what would we change to make it truly just?”",
          ],
        },
        {
          heading: "Cinematic Hooks",
          bullets: [
            "Split-screen: corrupt vs fair process",
            "Animated decision paths and dashboards",
            "Show emotions: frustration → relief → empowerment",
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Climate Action & Resilience",
      sdgs: [13],
      image: "/aifilmmakinghackhaton/challenge/4.png",
      sections: [
        {
          heading: "Intro",
          body: "Climate change is already here. Heatwaves, floods, and storms aren't just weather events—they shape how Malaysians live, work, and play. Every policy, river levee, or tree planted is a choice for survival.",
        },
        {
          heading: "Mission",
          body: "Show how a single Malaysian community adapts to climate stress: a day in the life of a family navigating floods, blackouts, or heat, and how interventions (green roofs, early warning apps, resilient homes) change their experience.",
        },
        {
          heading: "Your Story Challenge",
          body: "Create a “before vs after” story: vulnerable → resilient. Link visible changes to SDG 13 and ripple effects on SDG 3 (health), SDG 6 (water), SDG 11 (cities).",
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Follow one family's day (home–school–work–market).",
            "Show interventions: flood barriers, renewable energy, disaster alerts.",
            "Propose a simple “Resilience Scorecard” (hours without flood, blackout days avoided, heat-stress incidents).",
            "End by asking: “If we build resilient communities, what lives can we protect?”",
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Marine & Coastal Ecosystems",
      sdgs: [14],
      image: "/aifilmmakinghackhaton/challenge/5.png",
      sections: [
        {
          heading: "Intro",
          body: "Malaysia's coasts are vibrant but vulnerable. Coral reefs, mangroves, and fisheries support millions of livelihoods but overfishing, pollution, and sea-level rise threaten them.",
        },
        {
          heading: "Mission",
          body: "Tell the story of a fisher family, diver, or coastal community whose daily life depends on the sea. Highlight how marine protection, mangrove restoration, or clean-up initiatives transform their world.",
        },
        {
          heading: "Your Story Challenge",
          body: "Show a “before vs after”: degraded waters → thriving blue economy. Make SDG 14 the hero, supported by SDG 12 (waste), SDG 13 (climate), SDG 8 (jobs).",
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Follow one day on land and sea.",
            "Visualize interventions: mangrove planting, marine patrols, community clean-ups.",
            "Include a simple “Ocean Health Scorecard” (fish stocks, water clarity, mangrove coverage).",
            "End with: “If we care for the sea, what kind of life can we restore?”",
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Forests & Biodiversity",
      sdgs: [15],
      image: "/aifilmmakinghackhaton/challenge/6.png",
      sections: [
        {
          heading: "Intro",
          body: "Forests aren't just trees—they're carbon sinks, wildlife homes, and water regulators. Every lost hectare affects climate, food, and lives.",
        },
        {
          heading: "Mission",
          body: "Tell the story of a ranger, farmer, or family living near forest land. Show the impact of deforestation, human-wildlife conflict, and sustainable practices.",
        },
        {
          heading: "Your Story Challenge",
          body: "“Before vs after”: degraded land → restored forest & connected wildlife corridors. Link SDG 15 with SDG 13 (climate), SDG 6 (water), and SDG 8 (livelihoods).",
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Follow one day in the forest village.",
            "Visualize solutions: reforestation, wildlife corridors, eco-certification (MSPO).",
            "Include a “Forest Health Scorecard” (tree cover, wildlife sightings, water quality).",
            "End by asking: “If we restore our forests, how can life on land thrive?”",
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Sustainable Agriculture & Palm Oil",
      sdgs: [12, 15],
      image: "/aifilmmakinghackhaton/challenge/7.png",
      sections: [
        {
          heading: "Intro",
          body: "What lands feed Malaysia matters. Unsustainable palm oil and agriculture can harm soil, forests, and communities. But sustainability can turn the tide.",
        },
        {
          heading: "Mission",
          body: "Follow a smallholder or plantation worker through a day showing how certified, sustainable practices transform livelihoods and ecosystems.",
        },
        {
          heading: "Your Story Challenge",
          body: "“Before vs after”: monoculture & chemical-heavy → certified sustainable farming. Highlight SDG 12 (responsible consumption) and SDG 8 (decent work).",
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Show daily tasks: planting, harvesting, community life.",
            "Include certification visuals (MSPO) and regenerative practices.",
            "Add a “Farm Sustainability Scorecard” (chemical use, biodiversity, yield efficiency).",
            "End with: “If we farm responsibly, how can we feed Malaysia without harming it?”",
          ],
        },
      ],
    },
    {
      id: 8,
      title: "Water & Urban Resilience",
      sdgs: [6, 11],
      image: "/aifilmmakinghackhaton/challenge/8.png",
      sections: [
        {
          heading: "Intro",
          body: "What water sustains Malaysia matters. Poor water management, pollution, and unplanned urban growth can threaten clean water, increase flooding, and weaken communities. But resilient water systems and sustainable cities can turn the tide.",
        },
        {
          heading: "Mission",
          body: "Follow a community member, urban worker, or water steward through a day showing how responsible water management and resilient urban practices transform livelihoods, public health, and ecosystems.",
        },
        {
          heading: "Your Story Challenge",
          body: "“Before vs after”: polluted waterways, flooding, water scarcity → clean water access, effective sanitation, and resilient urban infrastructure. Highlight SDG 6 (clean water and sanitation) and SDG 11 (sustainable cities and communities).",
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Show daily tasks: water collection, drainage maintenance, sanitation access, community life.",
            "Include infrastructure and certification visuals (water treatment, flood mitigation, rainwater harvesting, urban resilience measures).",
            "Add a “Water & Urban Resilience Scorecard” (water quality, flood risk, sanitation access, community preparedness).",
            "End with: “If we protect our water and build resilient cities, how can we secure Malaysia's future without harming communities?”",
          ],
        },
      ],
    },
    {
      id: 9,
      title: "Plastics & Waste",
      sdgs: [12],
      image: "/aifilmmakinghackhaton/challenge/9.png",
      sections: [
        {
          heading: "Intro",
          body: "Every piece of waste we create affects oceans, land, and communities. But collaboration can change the story.",
        },
        {
          heading: "Mission",
          body: "Follow one family, school, or business through their waste journey. Show the shift from single-use plastics to plant-based or recycled alternatives.",
        },
        {
          heading: "Your Story Challenge",
          body: "“Before vs after”: plastic chaos → sustainable, circular flow. Highlight SDG 12 (responsible consumption), SDG 14 (life below water), SDG 11 (cities).",
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Trace waste from home to disposal or recycling.",
            "Show collaboration across community, brands, and local councils.",
            "Include a “Waste Reduction Scorecard” (plastic days avoided, recycling rate, community participation).",
            "End with: “If we can change our packaging, what else can we transform?”",
          ],
        },
      ],
    },
    {
      id: 10,
      title: "Endangered Species & Habitat Conservation",
      sdgs: [15],
      image: "/aifilmmakinghackhaton/challenge/10.png",
      sections: [
        {
          heading: "Intro",
          body: "Wildlife isn't just “out there” – the survival of tigers, gibbons, and hornbills depends on forests, rivers, and local communities. Protecting them strengthens ecosystems, biodiversity, and human well-being.",
        },
        {
          heading: "Mission (SDG 15 – Life on Land)",
          body: "Make the struggle of endangered species visible and show how humans can help protect them.",
        },
        {
          heading: "Your Story Challenge",
          body: "Tell a Malaysian story where a single community's actions affect the lives of:",
          bullets: [
            "Tigers prowling the forest → safe corridors and anti-poaching patrols.",
            "Gibbons swinging through trees → forest restoration and protected reserves.",
            "Hornbills feeding in the canopy → awareness campaigns and habitat connection.",
          ],
        },
        {
          heading: "Mission Brief",
          bullets: [
            "Create a 3-minute film following one day in the life of these species alongside the humans who protect them.",
            "Show before vs after: fragmented, degraded habitats → restored, connected forests.",
            "Highlight community involvement: rangers, villagers, NGOs working together.",
            "End by asking: “If we can restore habitats for these species, what can we do for the balance of life on Earth?”",
            "Optional visual tools: species tracking, forest cover maps, “Wildlife Health Scorecards” (forest cover %, sightings, poaching incidents).",
          ],
        },
      ],
    },
  ],
} as const;

export const sdgIconPath = (sdg: number) =>
  `/aifilmmakinghackhaton/SDG%20Icons/${sdg}.png`;

export const HACKATHON_BENEFITS = {
  title: "Participant Benefits",
  items: [
    {
      title: "Prize Pool – Approx. RM25,000 @ THE FINALS",
      subtitle: "1–3 December 2026",
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
        "Complimentary XR / VR / AR Workshop Access to top 10 winners this round",
      subtitle: "1–3 December 2026",
      description: "Free tickets to selected workshops at XR ASIA SUMMITS.",
    },
    {
      title: "Industry Exposure & Showcasing at XR ASIA SUMMITS",
      subtitle: "1–3 December 2026",
      description:
        "Projects will be presented to industry leaders, sponsors, agencies, and potential employers and partners.",
    },
    {
      title: "Industry Certification & Recognition",
      description:
        "Official participation recognition under XR ASIA SUMMITS 2026, supported by sponsors and international industry partners.",
    },
  ],
} as const;

export const HACKATHON_PARTICIPATION_FEE = {
  amount: "RM 1,000.00",
  label: "Per Participant",
  intro:
    "The RM 1,000 participation fee is a subsidised, all-inclusive package designed to allow participants to focus entirely on creation and innovation.",
  inclusions: [
    {
      title: "Group Work",
      description: "Min 2pax · Max 5 pax.",
    },
    {
      title: "AI Tokens / Credits",
      description:
        "Access to AI tools and compute credits. Supports text, image, video, and 3D generation.",
    },
    {
      title: "Lunch & Refreshments",
      description:
        "Daily breakfast, lunch, and dinner. Late-night snacks during build sessions.",
    },
    {
      title: "Operational & Logistics Support",
      description:
        "On-site technical and operational assistance. Event materials, badges, and access passes. Shared production resources.",
    },
  ],
} as const;

export const HACKATHON_RULES = {
  title: "Hackathon Participant Requirements & Rules",
  sections: [
    {
      number: 1,
      title: "Eligibility",
      bullets: [
        "Open to students, professionals, startups, and independent creators",
        "Participants must be 18 years and above",
        "Teams must consist of 2–5 members",
      ],
    },
    {
      number: 2,
      title: "Hackathon Scope",
      intro:
        "Participants must develop an XR-based concept or prototype enhanced by AI, aligned with the event theme and selected SDG mission. Focus areas include:",
      bullets: [
        "Practical application",
        "Creativity and innovation",
        "Real-world relevance",
        "Clear and responsible use of XR and AI technologies",
      ],
    },
    {
      number: 3,
      title: "Intellectual Property (IP)",
      paragraphs: [
        "Teams retain full ownership of all intellectual property created. XR-SUMMITS is granted a non-exclusive, royalty-free right to showcase projects during the event and use project summaries, visuals, and videos for non-commercial promotional purposes. Participants, partners, and sponsors may use materials for internal promotion and portfolio use only. No IP transfer is required.",
      ],
    },
    {
      number: 4,
      title: "Use of AI & XR Tools (Will be provided)",
      paragraphs: [
        "Teams may use any legally accessible XR and AI tools or APIs. Generative AI usage must be ethical, transparent, and compliant with platform terms and conditions.",
      ],
    },
    {
      number: 5,
      title: "Code of Conduct",
      intro: "Participants must:",
      bullets: [
        "Respect fellow participants, mentors, judges, and organisers",
        "Avoid plagiarism, harassment, or disruptive behaviour",
        "Follow organiser instructions at all times",
        "XR-SUMMITS enforces zero tolerance for misconduct",
      ],
    },
    {
      number: 6,
      title: "Judging Criteria",
      intro: "Projects will be evaluated based on:",
      bullets: [
        "Innovation and creativity – Idea",
        "Story Line – Engaging Community",
        "Meaningful integration of AI Excellence",
        "Practical application Craft – i.e Edit, Color, Mix etc.",
        "Presentation quality and clarity – Delivery",
      ],
      footer: "Judges' decisions are final.",
    },
    {
      number: 7,
      title: "Safety & Compliance",
      bullets: [
        "All demos must be safe for public display",
        "XR hardware must be supervised",
        "Projects must not promote illegal, harmful, or unethical activities",
      ],
    },
    {
      number: 8,
      title: "Recording & Media",
      paragraphs: [
        "Participants consent to photography and video recording, live streaming and documentation, and post-event promotional use by XR-SUMMITS.",
      ],
    },
    {
      number: 9,
      title: "Disqualification",
      intro: "XR-SUMMITS reserves the right to disqualify teams for:",
      bullets: [
        "Rule violations",
        "Misrepresentation",
        "Plagiarism or IP infringement",
        "Failure to meet submission requirements",
      ],
    },
    {
      number: 10,
      title: "Acceptance",
      intro: "Participation constitutes full acceptance of:",
      bullets: [
        "These requirements",
        "Organiser decisions",
        "Event terms and conditions",
      ],
    },
  ],
} as const;

export const HACKATHON_FINALS_QUALIFICATION =
  "The top 10 participants from this round will qualify for the Finals. Four additional universities will each bring their top 10 participants, creating a pool of 50 finalists. From this group, 5 winners will be selected to receive the prizes below. The Best of the BEST!";

export const HACKATHON_CLOSING = {
  title: "The XR SUMMIT's MOTHERSHIP HACKATON",
  subtitle: "Isn't Just Another AI Filmmaking Competition",
  body: "It's a proving ground for the future of production. This is where craft meets velocity, where tradition meets innovation, and where the next generation of Southeast Asian creators establishes new standards for the global industry.",
  body2:
    "You'll walk away with portfolio pieces that open doors, workflows that save months of trial-and-error, and connections to brands actively hiring efficient production partners across MY / SG / ID / TH / PH / VN.",
  stats: [
    { label: "Dates", value: "1–3 May 2026" },
    { label: "Location", value: "Malaysia" },
    { label: "Prize Pool", value: "RM 25K" },
  ],
} as const;

export const HACKATHON_PRIZE_STRUCTURE = {
  title: "AI XR Awards Prize Structure",
  prizes: [
    {
      title: "Grand Prix",
      amount: "RM 10,000 + RM 1,000 AI Credits",
      description:
        "The top overall award for the most outstanding AI XR entry.",
    },
    {
      title: "Craft Awards",
      amount: "RM 8,000 + RM 1,000 AI Credits",
      description:
        "Celebrates excellence in direction, editing, design, and execution.",
    },
    {
      title: "Best AI Storytelling",
      amount: "RM 5,000 + RM 1,000 AI Credits",
      description:
        "Recognizes the strongest narrative, emotion, and audience impact.",
    },
    {
      title: "Sponsor's Pick",
      amount: "RM 3,000 + RM 1,000 AI Credits",
      description: "Chosen by sponsors for standout entries.",
    },
    {
      title: "People's Choice",
      amount: "RM 2,500 + RM 1,000 AI Credits",
      description: "Selected by the audience for the most loved entry.",
    },
    {
      title: "Participation",
      amount: "Certificate of Participation",
      description:
        "All finalists receive recognition for taking part in the awards.",
    },
  ],
  footer:
    "Industry exposure & visibility: Finalists and winners will be featured across event coverage, partner channels, and post-event highlights, creating long-tail visibility for creators and teams.",
} as const;

export const HACKATHON_CHECKIN = {
  title: "Ready to Build the Future of AI Filmmaking?",
  subheadline:
    "Form your team. Create in 72 hours. Compete for RM25K+. Present your work at XR Asia Summit 2026.",
  intro:
    "Applications are now open for teams ready to build and present client-ready AI filmmaking work.",
  closing:
    "Get ready to dive into the future of filmmaking! We look forward to welcoming you to this groundbreaking event.",
} as const;
