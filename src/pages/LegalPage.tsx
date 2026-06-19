import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LEGAL_PAGES } from "../core/content/legalPages";
import { getLegalDocument, LEGAL_PACK_META } from "../core/content/legal";
import { LegalDocumentBody } from "../components/legal/LegalDocumentBody";

const LegalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = LEGAL_PAGES.find((p) => p.slug === slug);
  const document = slug ? getLegalDocument(slug) : undefined;

  if (!page || !document) {
    return <Navigate to="/contact" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${page.title} | XR Summits`}</title>
        <meta
          name="description"
          content={`${page.title} — Official legal document for XR Summits Sdn Bhd (2026 Edition).`}
        />
      </Helmet>

      <article className="relative w-full px-6 pt-32 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-mono text-[0.5rem] tracking-[0.35em] uppercase text-foreground-muted/50 hover:text-accent transition-colors mb-8"
          >
            ← Back to contact
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 pb-8 border-b border-white/10"
          >
            <p
              className="font-bold tracking-[0.45em] uppercase mb-3"
              style={{ fontSize: "0.52rem", color: "#ef783d" }}
            >
              {LEGAL_PACK_META.title} · {LEGAL_PACK_META.version}
            </p>
            <p className="text-foreground-muted/60 text-sm mb-2">
              {LEGAL_PACK_META.subtitle}
            </p>
            <h1
              className="font-heading font-black text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              {page.title}
            </h1>
            <p className="mt-3 text-foreground-muted/70 text-sm">
              XR Summits Sdn Bhd (Company Registration No. 1506516-A) · Malaysia
            </p>
            <p className="mt-2 text-foreground-muted/60 text-sm leading-relaxed">
              {LEGAL_PACK_META.appliesTo}
            </p>
            <p className="mt-2 text-foreground-muted/60 text-sm">
              Registered office: {LEGAL_PACK_META.registeredOffice}
            </p>
            <p className="mt-1 text-foreground-muted/60 text-sm">
              Prepared for: {LEGAL_PACK_META.preparedFor}
            </p>
            <p className="mt-1 text-foreground-muted/60 text-sm">
              Contact:{" "}
              <a
                href={`mailto:${LEGAL_PACK_META.contactEmail}`}
                className="text-accent hover:underline"
              >
                {LEGAL_PACK_META.contactEmail}
              </a>
              {" · "}
              <a
                href={`tel:${LEGAL_PACK_META.contactPhone.replace(/\s/g, "")}`}
                className="text-accent hover:underline"
              >
                {LEGAL_PACK_META.contactPhone}
              </a>
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-10 p-5 rounded-lg border border-white/10 bg-white/[0.02] text-foreground-muted text-sm leading-relaxed"
          >
            <p>{LEGAL_PACK_META.intro}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <LegalDocumentBody document={document} />
          </motion.div>

          <p className="mt-16 font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/40 text-center">
            Effective {LEGAL_PACK_META.effectiveDate} · {LEGAL_PACK_META.contactEmail}
          </p>
        </div>
      </article>
    </>
  );
};

export default LegalPage;
