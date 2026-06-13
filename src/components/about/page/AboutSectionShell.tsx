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
};

const AboutSectionShell = ({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  showTopBorder = true,
}: AboutSectionShellProps) => (
  <section
    id={id}
    className={`relative w-full overflow-hidden ${className}`}
    style={{
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',
      borderTop: showTopBorder ? '1px solid rgba(255,255,255,0.05)' : undefined,
    }}
  >
    <div className="max-w-6xl mx-auto px-6">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>

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
              className="font-heading font-bold text-foreground mb-3"
              style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)', lineHeight: 1.2 }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="text-foreground-muted leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
              {description}
            </p>
          )}
        </motion.div>
      )}

      {children}
    </div>
  </section>
);

export default AboutSectionShell;
