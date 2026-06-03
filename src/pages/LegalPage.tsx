import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LEGAL_PAGES, LOREM_SECTIONS } from '../core/content/legalPages';

const LegalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = LEGAL_PAGES.find((p) => p.slug === slug);

  if (!page) {
    return <Navigate to="/contact" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{page.title} | XR Summits</title>
        <meta name="description" content={`${page.title} — placeholder document for XR Summits Phase 1.`} />
      </Helmet>

      <article className="relative w-full px-6 pt-32 pb-20">
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
            className="mb-10 pb-8 border-b border-white/5"
          >
            <p className="font-bold tracking-[0.45em] uppercase mb-3" style={{ fontSize: '0.52rem', color: 'rgba(251,146,60,0.65)' }}>
              Legal placeholder
            </p>
            <h1 className="font-heading font-black text-foreground" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              {page.title}
            </h1>
            <p className="text-foreground-muted mt-4 text-sm leading-relaxed">
              This document contains placeholder text only. The final version will be provided by the client and
              does not constitute binding terms during Phase 1.
            </p>
          </motion.header>

          <div className="flex flex-col gap-6">
            {LOREM_SECTIONS.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="text-foreground-muted leading-relaxed"
                style={{ fontSize: '0.88rem', lineHeight: 1.9 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <p className="mt-12 font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/40 text-center">
            Last updated · Placeholder · Phase 1
          </p>
        </div>
      </article>
    </>
  );
};

export default LegalPage;
