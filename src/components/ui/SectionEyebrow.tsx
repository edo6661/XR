import { motion } from 'framer-motion';

interface SectionEyebrowProps {
  children: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** 'dark' = di atas background gelap (default), 'light' = di atas surface terang */
  tone?: 'dark' | 'light';
}

const EyebrowLine = ({
  tone,
  mirrored = false,
}: {
  tone: 'dark' | 'light';
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
}: SectionEyebrowProps) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? -16 : 0, y: align === 'center' ? -8 : 0 }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`flex items-center gap-3 mb-10 ${align === 'center' ? 'justify-center' : ''} ${className}`}
  >
    <EyebrowLine tone={tone} />
    <span
      className={tone === 'light' ? 'section-eyebrow-text section-eyebrow-text--light' : 'section-eyebrow-text'}
    >
      {children}
    </span>
    {align === 'center' && <EyebrowLine tone={tone} mirrored />}
  </motion.div>
);

export default SectionEyebrow;
