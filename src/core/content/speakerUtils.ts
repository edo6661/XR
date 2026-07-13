import {
  XRAS_KL_SPEAKERS,
  type XrasSpeaker,
  type XrasSessionSpeaker,
  type SpeakerType,
} from "./xrasKl2026";
import { resolveCountryFlagUrl } from "./countryFlags";

export type SpeakerProfile = {
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  accentColor?: string;
  speakerType?: SpeakerType;
  country?: string;
  /** Resolved badge image: country flag (guest) or company logo (sponsor) */
  badgeImageUrl?: string;
  topic?: string;
  bio?: string;
};

const normalizeName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

export const findXrasSpeakerByName = (
  name: string,
): XrasSpeaker | undefined => {
  const normalized = normalizeName(name);
  return XRAS_KL_SPEAKERS.find((speaker) => {
    const speakerNormalized = normalizeName(speaker.name);
    return (
      speakerNormalized === normalized ||
      speakerNormalized.includes(normalized) ||
      normalized.includes(speakerNormalized)
    );
  });
};

const resolveBadgeImageUrl = (speaker: {
  speakerType?: SpeakerType;
  country?: string;
  countryFlagUrl?: string;
  companyLogoUrl?: string;
}): string | undefined => {
  const type = speaker.speakerType ?? "guest";
  if (type === "sponsor") {
    return speaker.companyLogoUrl?.trim() || undefined;
  }
  return resolveCountryFlagUrl(speaker.country, speaker.countryFlagUrl);
};

export const toSpeakerProfile = (
  source: XrasSpeaker | XrasSessionSpeaker,
): SpeakerProfile | null => {
  if (!source.name) return null;

  const known = findXrasSpeakerByName(source.name);

  if ("role" in source && "company" in source) {
    const speakerType = source.speakerType ?? known?.speakerType ?? "guest";
    const country = source.country ?? known?.country;
    const countryFlagUrl = source.countryFlagUrl ?? known?.countryFlagUrl;
    const companyLogoUrl = source.companyLogoUrl ?? known?.companyLogoUrl;

    return {
      name: source.name,
      role: source.role || undefined,
      company: source.company || undefined,
      photo: source.photo,
      accentColor: source.accentColor ?? known?.accentColor,
      speakerType,
      country,
      badgeImageUrl: resolveBadgeImageUrl({
        speakerType,
        country,
        countryFlagUrl,
        companyLogoUrl,
      }),
      topic: source.topic || known?.topic,
      bio: source.bio || known?.bio,
    };
  }

  const speakerType = known?.speakerType ?? "guest";
  const country = known?.country;
  const countryFlagUrl = known?.countryFlagUrl;
  const companyLogoUrl = known?.companyLogoUrl;

  return {
    name: source.name,
    role: source.jobTitle ?? known?.role,
    company: source.organization ?? known?.company,
    photo: source.photo ?? known?.photo,
    accentColor: known?.accentColor,
    speakerType,
    country,
    badgeImageUrl: resolveBadgeImageUrl({
      speakerType,
      country,
      countryFlagUrl,
      companyLogoUrl,
    }),
    topic: known?.topic,
    bio: known?.bio,
  };
};
