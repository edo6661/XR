import { motion } from 'framer-motion';

interface SectionEyebrowProps {
  children: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** 'dark' = di atas background gelap (default), 'light' = di atas surface terang */
  tone?: 'dark' | 'light';
}

/**
 * Shared eyebrow label used across all sections.
 * Eliminates the copy-paste pattern in About, Events, Speakers, etc.
 */
const SectionEyebrow = ({
  children,
  align = 'left',
  className = '',
  tone = 'dark',
}: SectionEyebrowProps) => {
  const lineColor = tone === 'light' ? 'rgba(194,87,14,0.6)' : 'rgba(251,146,60,0.55)';
  const textColor = tone === 'light' ? 'rgba(194,87,14,0.95)' : 'rgba(251,146,60,0.72)';

  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -16 : 0, y: align === 'center' ? -8 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 mb-10 ${align === 'center' ? 'justify-center' : ''} ${className}`}
    >
      <span
        className="h-px flex-shrink-0"
        style={{ width: '20px', background: lineColor }}
        aria-hidden="true"
      />
      <span
        className="font-bold tracking-[0.52em] uppercase whitespace-nowrap"
        style={{ fontSize: '0.57rem', color: textColor }}
      >
        {children}
      </span>
      {align === 'center' && (
        <span
          className="h-px flex-shrink-0"
          style={{ width: '20px', background: lineColor }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

export default SectionEyebrow;