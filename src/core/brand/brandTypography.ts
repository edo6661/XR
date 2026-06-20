/** Backsteal is reserved for the two primary event brand headers only. */
export const BRAND_FONT_CLASS = "font-brand";

export const BRAND_HEADERS = {
  xras: "XR ASIA SUMMIT",
  aixr: "AI-XR Cultural Innovation Forum",
} as const;

/** Primary section/card titles that should render in Backsteal. */
export function usesBrandFont(title: string): boolean {
  const normalized = title.trim();

  if (normalized === BRAND_HEADERS.xras || normalized === BRAND_HEADERS.aixr) {
    return true;
  }

  if (/^XR ASIA SUMMITS?(?:\s+\d{4})?$/i.test(normalized)) {
    return true;
  }

  if (
    /^(?:\d+(?:st|nd|rd|th)\s+)?XR ASIA SUMMITS?(?:\s+\d{4})?$/i.test(
      normalized,
    )
  ) {
    return true;
  }

  return false;
}

export function brandFontClass(title?: string, extra = ""): string {
  const classes = [extra, title && usesBrandFont(title) ? BRAND_FONT_CLASS : ""]
    .filter(Boolean)
    .join(" ");
  return classes;
}
