import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient, urlForImage } from "./client";
import type {
  AboutHighlightPhotoItem,
  AboutPillarItem,
  AwardRecognitionItem,
  CompanyOverviewItem,
  IndustryFocusItem,
  IndustryFocusSectorItem,
  MissionItem,
} from "../../core/content/aboutPage";
import type { EventCardItem } from "../../core/content/events";
import type { PartnerItem } from "../../core/content/partners";
import type { EventPhoto } from "../../core/content/ecosystemInAction";
import type { XrasSpeaker } from "../../core/content/xrasKl2026";

export type SanitySpeaker = {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  photo?: SanityImageSource;
  photoUrl?: string;
  accentColor?: string;
  topic?: string;
  bio?: string;
  order?: number;
};

export type SanityPartner = {
  _id: string;
  name: string;
  category: string;
  logo?: SanityImageSource;
  logoUrl?: string;
  logoFilter?: string;
  order?: number;
};

export type SanityEventPhoto = {
  _id: string;
  title: string;
  image?: SanityImageSource;
  imageUrl?: string;
  alt: string;
  order?: number;
};

export type SanityEventCard = {
  _id: string;
  title: string;
  section: "flagship" | "programme";
  date?: string;
  location?: string;
  description?: string;
  accentColor?: string;
  tag: string;
  link?: string;
  image?: SanityImageSource;
  imageUrl?: string;
  imagePosition?: string;
  isFeatured?: boolean;
  isHero?: boolean;
  order?: number;
};

export type SanityAboutPillar = {
  _id: string;
  title: string;
  description: string;
  accentColor?: string;
  featured?: boolean;
  order?: number;
};

export type SanityAboutHighlightPhoto = {
  _id: string;
  title: string;
  image?: SanityImageSource;
  imageUrl?: string;
  alt: string;
  caption?: string;
  fit?: "contain" | "cover";
  order?: number;
};

export type SanityAwardRecognition = {
  _id: string;
  companyName: string;
  body: string;
  event: string;
  date?: string;
  category?: string;
  subcategory?: string;
  logo?: SanityImageSource;
  logoUrl?: string;
  ceremonyPhoto?: SanityImageSource;
  ceremonyPhotoUrl?: string;
  ceremonyPhotoAlt?: string;
};

export type SanityCompanyOverview = {
  _id: string;
  titleHighlight: string;
  titleRest: string;
  body: string[];
  founderLine?: string;
};

export type SanityMission = {
  _id: string;
  titleHighlight: string;
  titleRest: string;
  bodyHighlight: string;
  bodyRest: string;
};

export type SanityIndustryFocus = {
  _id: string;
  titlePrefix?: string;
  titleHighlight: string;
  titleRest: string;
  description: string;
};

export type SanityIndustryFocusSector = {
  _id: string;
  title: string;
  description: string;
  bullets?: string[];
  image?: SanityImageSource;
  imageUrl?: string;
  order?: number;
};

const speakersQuery = `*[_type == "speaker" && active != false] | order(order asc, name asc) {
  _id,
  name,
  role,
  company,
  photo,
  photoUrl,
  accentColor,
  topic,
  bio,
  order
}`;

function partnersQuery(categories: string[]) {
  const categoryFilter =
    categories.length > 0
      ? ` && category in ${JSON.stringify(categories)}`
      : "";

  return `*[_type == "partner" && active != false${categoryFilter}] | order(order asc, name asc) {
    _id,
    name,
    category,
    logo,
    logoUrl,
    logoFilter,
    order
  }`;
}

const eventPhotosQuery = `*[_type == "eventPhoto" && active != false] | order(order asc) {
  _id,
  title,
  image,
  imageUrl,
  alt,
  order
}`;

function eventCardsQuery(section: "flagship" | "programme") {
  return `*[_type == "eventCard" && active != false && section == "${section}"] | order(order asc) {
    _id,
    title,
    section,
    date,
    location,
    description,
    accentColor,
    tag,
    link,
    image,
    imageUrl,
    imagePosition,
    isFeatured,
    isHero,
    order
  }`;
}

const aboutPillarsQuery = `*[_type == "aboutPillar" && active != false] | order(order asc) {
  _id, title, description, accentColor, featured, order
}`;

const aboutHighlightPhotosQuery = `*[_type == "aboutHighlightPhoto" && active != false] | order(order asc) {
  _id, title, image, imageUrl, alt, caption, fit, order
}`;

const awardRecognitionQuery = `*[_type == "awardRecognition" && active != false][0] {
  _id, companyName, body, event, date, category, subcategory,
  logo, logoUrl, ceremonyPhoto, ceremonyPhotoUrl, ceremonyPhotoAlt
}`;

const companyOverviewQuery = `*[_type == "aboutCompanyOverview" && active != false][0] {
  _id, titleHighlight, titleRest, body, founderLine
}`;

const missionQuery = `*[_type == "aboutMission" && active != false][0] {
  _id, titleHighlight, titleRest, bodyHighlight, bodyRest
}`;

const industryFocusQuery = `*[_type == "aboutIndustryFocus" && active != false][0] {
  _id, titlePrefix, titleHighlight, titleRest, description
}`;

const industryFocusSectorsQuery = `*[_type == "industryFocusSector" && active != false] | order(order asc) {
  _id, title, description, bullets, image, imageUrl, order
}`;

function resolveImageUrl(
  image: SanityImageSource | null | undefined,
  fallbackUrl?: string | null,
  width = 800,
): string {
  if (image) {
    const built = urlForImage(image)?.width(width).quality(85).url();
    if (built) return built;
  }
  return fallbackUrl?.trim() || "";
}

export function mapSanitySpeaker(doc: SanitySpeaker): XrasSpeaker {
  return {
    name: doc.name,
    role: doc.role ?? "",
    company: doc.company ?? "",
    photo: resolveImageUrl(doc.photo, doc.photoUrl),
    accentColor: doc.accentColor,
    topic: doc.topic,
    bio: doc.bio,
  };
}

export function mapSanityPartner(doc: SanityPartner): PartnerItem {
  return {
    name: doc.name,
    logo: resolveImageUrl(doc.logo, doc.logoUrl),
    category: doc.category,
    filter: doc.logoFilter,
  };
}

export function mapSanityEventPhoto(doc: SanityEventPhoto): EventPhoto {
  return {
    src: resolveImageUrl(doc.image, doc.imageUrl),
    alt: doc.alt,
  };
}

export function mapSanityEventCard(doc: SanityEventCard): EventCardItem {
  const imageSrc = resolveImageUrl(doc.image, doc.imageUrl, 1200);
  return {
    title: doc.title,
    date: doc.date,
    location: doc.location,
    description: doc.description ?? "",
    accentColor: doc.accentColor ?? "#fb923c",
    tag: doc.tag,
    to: doc.link,
    imageSrc: imageSrc || undefined,
    imagePosition: doc.imagePosition,
    isFeatured: doc.isFeatured,
    isHero: doc.isHero,
  };
}

export function mapSanityAboutPillar(doc: SanityAboutPillar): AboutPillarItem {
  return {
    title: doc.title,
    description: doc.description,
    accentColor: doc.accentColor ?? "#ef783d",
    featured: doc.featured ?? false,
  };
}

export function mapSanityAboutHighlightPhoto(
  doc: SanityAboutHighlightPhoto,
): AboutHighlightPhotoItem {
  return {
    src: resolveImageUrl(doc.image, doc.imageUrl),
    alt: doc.alt,
    caption: doc.caption ?? "",
    fit: doc.fit === "contain" ? "contain" : "cover",
  };
}

export function mapSanityAwardRecognition(
  doc: SanityAwardRecognition,
): AwardRecognitionItem {
  return {
    companyName: doc.companyName,
    body: doc.body,
    event: doc.event,
    date: doc.date ?? "",
    category: doc.category ?? "",
    subcategory: doc.subcategory ?? "",
    logo: resolveImageUrl(doc.logo, doc.logoUrl),
    ceremonyPhoto: resolveImageUrl(doc.ceremonyPhoto, doc.ceremonyPhotoUrl),
    ceremonyPhotoAlt: doc.ceremonyPhotoAlt ?? "",
  };
}

export function mapSanityCompanyOverview(
  doc: SanityCompanyOverview,
): CompanyOverviewItem {
  return {
    titleHighlight: doc.titleHighlight,
    titleRest: doc.titleRest,
    body: doc.body ?? [],
    founderLine: doc.founderLine ?? "Founded by Louis Clovis",
  };
}

export function mapSanityMission(doc: SanityMission): MissionItem {
  return {
    titleHighlight: doc.titleHighlight,
    titleRest: doc.titleRest,
    bodyHighlight: doc.bodyHighlight,
    bodyRest: doc.bodyRest,
  };
}

export function mapSanityIndustryFocus(
  doc: SanityIndustryFocus,
): IndustryFocusItem {
  return {
    titlePrefix: doc.titlePrefix ?? "Where",
    titleHighlight: doc.titleHighlight,
    titleRest: doc.titleRest,
    description: doc.description,
  };
}

export function mapSanityIndustryFocusSector(
  doc: SanityIndustryFocusSector,
): IndustryFocusSectorItem {
  return {
    title: doc.title,
    desc: doc.description,
    bullets: doc.bullets ?? [],
    image: resolveImageUrl(doc.image, doc.imageUrl, 1200),
  };
}

async function fetchEventCardsBySection(
  section: "flagship" | "programme",
): Promise<EventCardItem[] | null> {
  if (!sanityClient) return null;
  try {
    const docs = await sanityClient.fetch<SanityEventCard[]>(
      eventCardsQuery(section),
    );
    if (!docs?.length) return null;
    return docs.map(mapSanityEventCard);
  } catch (error) {
    console.warn(`[sanity] Failed to fetch ${section} events:`, error);
    return null;
  }
}

async function fetchPartnersByCategory(
  categories: string[],
): Promise<PartnerItem[] | null> {
  if (!sanityClient) return null;
  try {
    const docs = await sanityClient.fetch<SanityPartner[]>(
      partnersQuery(categories),
    );
    if (!docs?.length) return null;
    return docs.map(mapSanityPartner);
  } catch (error) {
    console.warn("[sanity] Failed to fetch partners:", error);
    return null;
  }
}

export async function fetchSpeakers(): Promise<XrasSpeaker[] | null> {
  if (!sanityClient) return null;
  try {
    const docs = await sanityClient.fetch<SanitySpeaker[]>(speakersQuery);
    if (!docs?.length) return null;
    return docs.map(mapSanitySpeaker);
  } catch (error) {
    console.warn("[sanity] Failed to fetch speakers:", error);
    return null;
  }
}

/** Media partners on XRAS event page */
export function fetchEventPartners() {
  return fetchPartnersByCategory(["Media Partner"]);
}

/** Government + tech partners on Home page slider */
export function fetchSponsorPartners() {
  return fetchPartnersByCategory(["Government Partner", "Tech Partner"]);
}

/** Past event photos on Home → Ecosystem in Action */
export async function fetchEventPhotos(): Promise<EventPhoto[] | null> {
  if (!sanityClient) return null;
  try {
    const docs = await sanityClient.fetch<SanityEventPhoto[]>(eventPhotosQuery);
    if (!docs?.length) return null;
    return docs.map(mapSanityEventPhoto);
  } catch (error) {
    console.warn("[sanity] Failed to fetch event photos:", error);
    return null;
  }
}

/** Flagship upcoming events on Home */
export function fetchFlagshipEvents() {
  return fetchEventCardsBySection("flagship");
}

/** Programme highlight cards on Home */
export function fetchProgrammeHighlights() {
  return fetchEventCardsBySection("programme");
}

/** About page — Why XR pillars */
export async function fetchAboutPillars(): Promise<AboutPillarItem[] | null> {
  if (!sanityClient) return null;
  try {
    const docs =
      await sanityClient.fetch<SanityAboutPillar[]>(aboutPillarsQuery);
    if (!docs?.length) return null;
    return docs.map(mapSanityAboutPillar);
  } catch (error) {
    console.warn("[sanity] Failed to fetch about pillars:", error);
    return null;
  }
}

/** About page — highlight photos in awards block */
export async function fetchAboutHighlightPhotos(): Promise<
  AboutHighlightPhotoItem[] | null
> {
  if (!sanityClient) return null;
  try {
    const docs = await sanityClient.fetch<SanityAboutHighlightPhoto[]>(
      aboutHighlightPhotosQuery,
    );
    if (!docs?.length) return null;
    return docs.map(mapSanityAboutHighlightPhoto);
  } catch (error) {
    console.warn("[sanity] Failed to fetch about highlight photos:", error);
    return null;
  }
}

/** About page — awards recognition (single document) */
export async function fetchAwardRecognition(): Promise<AwardRecognitionItem | null> {
  if (!sanityClient) return null;
  try {
    const doc = await sanityClient.fetch<SanityAwardRecognition | null>(
      awardRecognitionQuery,
    );
    if (!doc) return null;
    return mapSanityAwardRecognition(doc);
  } catch (error) {
    console.warn("[sanity] Failed to fetch award recognition:", error);
    return null;
  }
}

/** About page — company overview (single document) */
export async function fetchCompanyOverview(): Promise<CompanyOverviewItem | null> {
  if (!sanityClient) return null;
  try {
    const doc = await sanityClient.fetch<SanityCompanyOverview | null>(
      companyOverviewQuery,
    );
    if (!doc) return null;
    return mapSanityCompanyOverview(doc);
  } catch (error) {
    console.warn("[sanity] Failed to fetch company overview:", error);
    return null;
  }
}

/** About page — our mission (single document) */
export async function fetchMission(): Promise<MissionItem | null> {
  if (!sanityClient) return null;
  try {
    const doc = await sanityClient.fetch<SanityMission | null>(missionQuery);
    if (!doc) return null;
    return mapSanityMission(doc);
  } catch (error) {
    console.warn("[sanity] Failed to fetch mission:", error);
    return null;
  }
}

/** About page — industry focus intro (single document) */
export async function fetchIndustryFocus(): Promise<IndustryFocusItem | null> {
  if (!sanityClient) return null;
  try {
    const doc = await sanityClient.fetch<SanityIndustryFocus | null>(
      industryFocusQuery,
    );
    if (!doc) return null;
    return mapSanityIndustryFocus(doc);
  } catch (error) {
    console.warn("[sanity] Failed to fetch industry focus:", error);
    return null;
  }
}

/** About page — industry focus sector cards */
export async function fetchIndustryFocusSectors(): Promise<
  IndustryFocusSectorItem[] | null
> {
  if (!sanityClient) return null;
  try {
    const docs = await sanityClient.fetch<SanityIndustryFocusSector[]>(
      industryFocusSectorsQuery,
    );
    if (!docs?.length) return null;
    return docs.map(mapSanityIndustryFocusSector);
  } catch (error) {
    console.warn("[sanity] Failed to fetch industry focus sectors:", error);
    return null;
  }
}

/** @deprecated Use fetchEventPartners or fetchSponsorPartners */
export function fetchPartners() {
  return fetchEventPartners();
}
