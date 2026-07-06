import {
  XRAS_KL_SPEAKERS,
  type XrasSpeaker,
  type XrasSessionSpeaker,
} from "./xrasKl2026";

export type SpeakerProfile = {
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  accentColor?: string;
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

export const toSpeakerProfile = (
  source: XrasSpeaker | XrasSessionSpeaker,
): SpeakerProfile | null => {
  if (!source.name) return null;

  const known = findXrasSpeakerByName(source.name);

  if ("role" in source && "company" in source) {
    return {
      name: source.name,
      role: source.role || undefined,
      company: source.company || undefined,
      photo: source.photo,
      accentColor: source.accentColor ?? known?.accentColor,
    };
  }

  return {
    name: source.name,
    role: source.jobTitle ?? known?.role,
    company: source.organization ?? known?.company,
    photo: source.photo ?? known?.photo,
    accentColor: known?.accentColor,
  };
};
