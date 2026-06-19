export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "table";
      headers: [string, string];
      rows: [string, string][];
    };

export type LegalSection = {
  number: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  effectiveDate?: string;
  preamble?: string[];
  sections: LegalSection[];
};
