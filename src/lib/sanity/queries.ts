import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient, urlForImage } from "./client";
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

const partnersQuery = `*[_type == "partner" && active != false] | order(order asc, name asc) {
  _id,
  name,
  category,
  logo,
  logoUrl,
  logoFilter,
  order
}`;

function resolveImageUrl(
  image: SanityImageSource | null | undefined,
  fallbackUrl?: string | null,
): string {
  if (image) {
    const built = urlForImage(image)?.width(800).quality(85).url();
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

export function mapSanityPartner(doc: SanityPartner) {
  return {
    name: doc.name,
    logo: resolveImageUrl(doc.logo, doc.logoUrl),
    category: doc.category,
    filter: doc.logoFilter,
  };
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

export async function fetchPartners(): Promise<
  ReturnType<typeof mapSanityPartner>[] | null
> {
  if (!sanityClient) return null;
  try {
    const docs = await sanityClient.fetch<SanityPartner[]>(partnersQuery);
    if (!docs?.length) return null;
    return docs.map(mapSanityPartner);
  } catch (error) {
    console.warn("[sanity] Failed to fetch partners:", error);
    return null;
  }
}
