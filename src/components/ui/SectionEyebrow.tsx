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
 * Stronger orange prominence per design direction.
 */
const SectionEyebrow = ({
  children,
  align = 'left',
  className = '',
  tone = 'dark',
}: SectionEyebrowProps) => {
  const lineColor = tone === 'light' ? 'rgba(194,87,14,0.8)' : 'rgba(239,120,61,0.75)';
  const textColor = tone === 'light' ? 'rgba(194,87,14,1)' : '#ef783d';

  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -16 : 0, y: align === 'center' ? -8 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 mb-10 ${align === 'center' ? 'justify-center' : ''} ${className}`}
    >
      <span
        className="h-[2px] flex-shrink-0 rounded-full"
        style={{
          width: '24px',
          background: lineColor,
          boxShadow: `0 0 8px ${lineColor}`,
        }}
        aria-hidden="true"
      />
      <span
        className="font-bold tracking-[0.48em] uppercase whitespace-nowrap"
        style={{
          fontSize: '0.65rem',
          color: textColor,
          textShadow: `0 0 20px ${textColor}60`,
        }}
      >
        {children}
      </span>
      {align === 'center' && (
        <span
          className="h-[2px] flex-shrink-0 rounded-full"
          style={{
            width: '24px',
            background: lineColor,
            boxShadow: `0 0 8px ${lineColor}`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

export default SectionEyebrow;