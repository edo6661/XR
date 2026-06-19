import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { LegalBlock, LegalDocument } from "../../core/content/legal/types";
import { LEGAL_PACK_META } from "../../core/content/legal/legalPackMeta";

const EMAILS = ["register@xr-summits.com", "register@xrsummits.com"] as const;

const SECTION_LINKS: Record<string, string> = {
  "Section 1": "/legal/terms",
  "Section 1.10": "/legal/terms",
  "Section 1.17": "/legal/terms",
  "Section 2": "/legal/privacy",
  "Section 2.4": "/legal/privacy",
  "Section 2.6": "/legal/privacy",
  "Section 2.8": "/legal/privacy",
  "Section 2.9": "/legal/privacy",
  "Section 3": "/legal/data-collection-notice",
  "Section 4": "/legal/payment-disclaimer",
  "Section 5": "/legal/event-disclaimer",
  "Section 6": "/legal/refund-policy",
  "Section 7": "/legal/website-disclaimer",
};

function renderInlineText(text: string) {
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let emailMatch: { email: string; index: number } | null = null;
    for (const email of EMAILS) {
      const idx = remaining.indexOf(email);
      if (idx !== -1 && (emailMatch === null || idx < emailMatch.index)) {
        emailMatch = { email, index: idx };
      }
    }

    let linkMatch: { label: string; path: string; index: number } | null = null;

    for (const [label, path] of Object.entries(SECTION_LINKS)) {
      const idx = remaining.indexOf(label);
      if (idx !== -1 && (linkMatch === null || idx < linkMatch.index)) {
        linkMatch = { label, path, index: idx };
      }
    }

    const nextEmail = emailMatch?.index ?? Infinity;
    const nextLink = linkMatch?.index ?? Infinity;

    if (nextEmail === Infinity && nextLink === Infinity) {
      parts.push(remaining);
      break;
    }

    if (nextEmail <= nextLink && emailMatch) {
      if (emailMatch.index > 0) parts.push(remaining.slice(0, emailMatch.index));
      parts.push(
        <a
          key={key++}
          href={`mailto:${emailMatch.email}`}
          className="text-accent hover:underline"
        >
          {emailMatch.email}
        </a>,
      );
      remaining = remaining.slice(emailMatch.index + emailMatch.email.length);
    } else if (linkMatch) {
      if (linkMatch.index > 0) parts.push(remaining.slice(0, linkMatch.index));
      parts.push(
        <Link
          key={key++}
          to={linkMatch.path}
          className="text-accent hover:underline"
        >
          {linkMatch.label}
        </Link>,
      );
      remaining = remaining.slice(linkMatch.index + linkMatch.label.length);
    }
  }

  return parts;
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "subheading":
      return (
        <h4 className="text-foreground font-semibold text-base mt-3">
          {block.text}
        </h4>
      );
    case "list":
      return (
        <ul className="list-disc pl-5 flex flex-col gap-2">
          {block.items.map((item) => (
            <li key={item}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-2 pr-4 font-semibold text-foreground">
                  {block.headers[0]}
                </th>
                <th className="py-2 font-semibold text-foreground">
                  {block.headers[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([left, right]) => (
                <tr
                  key={left}
                  className="border-b border-white/10 align-top"
                >
                  <td className="py-2 pr-4">{renderInlineText(left)}</td>
                  <td className="py-2">{renderInlineText(right)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "paragraph":
      return <p>{renderInlineText(block.text)}</p>;
  }
}

type LegalDocumentBodyProps = {
  document: LegalDocument;
};

export function LegalDocumentBody({ document }: LegalDocumentBodyProps) {
  return (
    <div
      className="flex flex-col gap-5 text-foreground-muted leading-relaxed"
      style={{ fontSize: "0.88rem", lineHeight: 1.8 }}
    >
      {document.effectiveDate && (
        <p>
          <strong>Effective date: {document.effectiveDate}</strong>
        </p>
      )}

      {document.preamble?.map((paragraph) => (
        <p key={paragraph}>{renderInlineText(paragraph)}</p>
      ))}

      {document.sections.map((section) => (
        <section key={section.number} className="mt-4">
          <h3 className="text-foreground font-bold text-lg">
            {section.number} {section.title}
          </h3>
          <div className="flex flex-col gap-3 mt-2">
            {section.blocks.map((block, index) => (
              <LegalBlockView key={`${section.number}-${index}`} block={block} />
            ))}
          </div>
        </section>
      ))}

      <nav
        className="mt-10 pt-8 border-t border-white/10"
        aria-label="Legal & Policy Pack contents"
      >
        <p className="font-mono text-[0.5rem] tracking-[0.35em] uppercase text-foreground-muted/50 mb-3">
          Contents — Legal & Policy Pack 2026
        </p>
        <ol className="flex flex-col gap-3">
          {LEGAL_PACK_META.contents.map((item) => (
            <li key={item.number} className="text-sm">
              <span className="text-foreground-muted/50 mr-2">
                {item.number}.
              </span>
              {item.slug ? (
                <Link
                  to={`/legal/${item.slug}`}
                  className={
                    item.slug === document.slug
                      ? "text-foreground font-semibold"
                      : "text-accent hover:underline"
                  }
                >
                  {item.title}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">
                  {item.title}
                </span>
              )}
              <span className="block mt-0.5 text-foreground-muted/70 pl-5">
                {item.description}
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
