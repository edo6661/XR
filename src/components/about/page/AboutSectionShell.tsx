import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionEyebrow from '../../ui/SectionEyebrow';

type AboutSectionShellProps = {
  id?: string;
  eyebrow: string;
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
  showTopBorder?: boolean;
  /** 'dark' = white text on dark bg (default), 'light' = dark text on silver surfaces */
  tone?: 'dark' | 'light';
};

const AboutSectionShell = ({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  showTopBorder = true,
  tone = 'dark',
}: AboutSectionShellProps) => {
  const isLight = tone === 'light';

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        borderTop: showTopBorder
          ? isLight
            ? '1px solid rgba(26,46,80,0.08)'
            : '1px solid rgba(255,255,255,0.05)'
          : undefined,
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow>

        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-2xl"
          >
            {title && (
              <h2
                className={`font-heading font-bold mb-3 ${isLight ? 'text-on-light-heading' : 'text-foreground'}`}
                style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)', lineHeight: 1.2 }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`leading-relaxed ${isLight ? 'text-on-light-muted' : 'text-foreground-muted'}`}
                style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}
              >
                {description}
              </p>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
};

export default AboutSectionShell;
