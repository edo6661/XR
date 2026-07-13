/** Maps country labels from CMS / Excel to local flag filenames in /public/country-flags/ */
const COUNTRY_FLAG_SLUGS: Record<string, string> = {
  malaysia: "malaysia",
  norway: "norway",
  india: "india",
  "hong kong": "hong-kong",
  hongkong: "hong-kong",
  turkey: "turkey",
  türkiye: "turkey",
  turkiye: "turkey",
  japan: "japan",
  us: "united-states",
  usa: "united-states",
  "u.s.": "united-states",
  "u.s.a.": "united-states",
  "united states": "united-states",
  "united states of america": "united-states",
  uk: "united-kingdom",
  "u.k.": "united-kingdom",
  "united kingdom": "united-kingdom",
  "great britain": "united-kingdom",
  indonesia: "indonesia",
};

export function countryToFlagSlug(country?: string | null): string | undefined {
  if (!country?.trim()) return undefined;
  return COUNTRY_FLAG_SLUGS[country.trim().toLowerCase()];
}

/** Resolve flag URL: explicit CMS/path first, then convention /country-flags/{slug}.png */
export function resolveCountryFlagUrl(
  country?: string | null,
  explicitUrl?: string | null,
): string | undefined {
  const explicit = explicitUrl?.trim();
  if (explicit) return explicit;

  const slug = countryToFlagSlug(country);
  return slug === "indonesia"
    ? "/country-flags/indonesia.svg"
    : slug
      ? `/country-flags/${slug}.png`
      : undefined;
}
