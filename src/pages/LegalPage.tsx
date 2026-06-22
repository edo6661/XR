import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LEGAL_PAGES } from "../core/content/legalPages";
import { getLegalDocument } from "../core/content/legal";
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
          content={`${page.title} — Official legal document for XR Summits Sdn Bhd.`}
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
            <h1
              className="font-heading font-black text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              {page.title}
            </h1>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <LegalDocumentBody document={document} />
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default LegalPage;
