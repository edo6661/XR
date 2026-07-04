import { motion } from 'framer-motion';

interface SectionEyebrowProps {
  children: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** 'dark' = di atas background gelap (default), 'light' = di atas surface terang */
  tone?: 'dark' | 'light';
  accent?: 'orange' | 'indigo';
}

const EyebrowLine = ({
  tone,
  accent,
  mirrored = false,
}: {
  tone: 'dark' | 'light';
  accent: 'orange' | 'indigo';
  mirrored?: boolean;
}) => (
  <span
    className={[
      'eyebrow-line',
      tone === 'light' ? 'eyebrow-line--light' : '',
      mirrored ? 'eyebrow-line--center-right' : '',
    ]
      .filter(Boolean)
      .join(' ')}
    style={
      accent === 'indigo'
        ? {
          background: mirrored
            ? 'linear-gradient(90deg, rgba(30,64,175,0.22) 0%, #3730a3 42%, #1e3a8a 100%)'
            : 'linear-gradient(90deg, #1e3a8a 0%, #3730a3 72%, rgba(30,64,175,0.22) 100%)',
          boxShadow: '0 0 10px rgba(55,48,163,0.32)',
        }
        : undefined
    }
    aria-hidden="true"
  />
);

/**
 * Shared eyebrow label — accent gradient line + text.
 */
const SectionEyebrow = ({
  children,
  align = 'left',
  className = '',
  tone = 'dark',
  accent = 'orange',
}: SectionEyebrowProps) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? -16 : 0, y: align === 'center' ? -8 : 0 }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`flex items-center gap-3 mb-10 ${align === 'center' ? 'justify-center' : ''} ${className}`}
  >
    <EyebrowLine tone={tone} accent={accent} />
    <span
      className={tone === 'light' ? 'section-eyebrow-text section-eyebrow-text--light' : 'section-eyebrow-text'}
      style={
        accent === 'indigo'
          ? {
            background: 'linear-gradient(90deg, #1e3a8a 0%, #3730a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'none',
          }
          : undefined
      }
    >
      {children}
    </span>
    {align === 'center' && <EyebrowLine tone={tone} accent={accent} mirrored />}
  </motion.div>
);

export default SectionEyebrow;
