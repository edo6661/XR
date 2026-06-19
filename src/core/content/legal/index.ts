import { termsAndConditions } from "./termsAndConditions";
import { privacyPolicy } from "./privacyPolicy";
import { dataCollectionNotice } from "./dataCollectionNotice";
import { paymentDisclaimer } from "./paymentDisclaimer";
import { eventDisclaimer } from "./eventDisclaimer";
import { refundPolicy } from "./refundPolicy";
import { websiteDisclaimer, COPYRIGHT_NOTICE } from "./websiteDisclaimer";

export type { LegalBlock, LegalDocument, LegalSection } from "./types";

export { LEGAL_PACK_META } from "./legalPackMeta";

export const LEGAL_DOCUMENTS = [
  termsAndConditions,
  privacyPolicy,
  dataCollectionNotice,
  paymentDisclaimer,
  eventDisclaimer,
  refundPolicy,
  websiteDisclaimer,
] as const;

export { COPYRIGHT_NOTICE };

export function getLegalDocument(slug: string) {
  return LEGAL_DOCUMENTS.find((doc) => doc.slug === slug);
}
