import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_ACCENT, COMPANY_OVERVIEW } from '../../../core/content/aboutPage';

const HIGHLIGHTS = [
  'AI & XR Innovation',
  'Global Speakers',
  'Live Sessions',
  'Virtual Networking',
] as const;

const MOSAIC_IMAGES = [
  { src: '/past-event-pics/Conference3.jpg', alt: 'XR Asia Summit conference', className: 'col-span-2 row-span-2' },
  { src: '/past-event-pics/masterclass students.jpg', alt: 'Masterclass session', className: 'col-span-1 row-span-1' },
  { src: '/past-event-pics/panelist.jpg', alt: 'Industry panel discussion', className: 'col-span-1 row-span-1' },
] as const;

const CompanyOverviewBlock = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* Section ambient glow */}
      <div className="absolute -inset-x-8 -top-12 -bottom-8 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-[520px] h-[520px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(57,83,163,0.12) 0%, transparent 68%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(239,120,61,0.1) 0%, transparent 68%)' }}
        />
        <div
          className="absolute top-1/2 left-0 w-[320px] h-[320px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(148deg, rgba(28,45,78,0.82) 0%, rgba(18,32,58,0.78) 45%, rgba(22,38,62,0.85) 100%)',
          boxShadow: '0 28px 64px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Background image layer — lighter visibility */}
        <img
          src="/hero/hologram-projector.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none mix-blend-screen"
        />
        <img
          src="/hero/background-3.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none"
        />

        {/* Soft gradient wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(125deg, rgba(57,83,163,0.22) 0%, rgba(34,211,238,0.06) 35%, rgba(239,120,61,0.05) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Grid + scanline texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.5), rgba(239,120,61,0.45), transparent)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-0">
          {/* Copy column */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col gap-7">
            <div className="flex flex-wrap gap-2">
              {HIGHLIGHTS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.45 }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono uppercase tracking-[0.14em]"
                  style={{
                    fontSize: '0.64rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(240,244,255,0.9)',
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: i % 2 === 0 ? ABOUT_ACCENT : '#22d3ee' }}
                    aria-hidden="true"
                  />
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              {COMPANY_OVERVIEW.body.map((paragraph, i) => (
                <motion.p
                  key={paragraph.slice(0, 24)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                  className="leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.08rem)',
                    lineHeight: 1.9,
                    color: 'rgba(220,230,248,0.88)',
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Founder callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="flex items-center gap-3 pt-2"
            >
              <div
                className="w-10 h-px shrink-0"
                style={{ background: `linear-gradient(90deg, ${ABOUT_ACCENT}, transparent)` }}
                aria-hidden="true"
              />
              <p
                className="font-mono uppercase tracking-[0.2em]"
                style={{ fontSize: '0.68rem', color: 'rgba(180,195,220,0.88)' }}
              >
                Founded by Louis Clovis
              </p>
            </motion.div>
          </div>

          {/* Visual mosaic column */}
          <div
            className="relative min-h-[280px] lg:min-h-0 p-6 md:p-8 lg:p-10 flex items-center justify-center"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderLeft: 'none',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(34,211,238,0.08) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            <div
              className="relative grid grid-cols-2 grid-rows-2 gap-2.5 w-full max-w-sm"
              style={{ gridTemplateRows: '1fr 1fr' }}
            >
              {MOSAIC_IMAGES.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative overflow-hidden rounded-xl ${img.className}`}
                  style={{
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.28)',
                    minHeight: img.className.includes('row-span-2') ? '220px' : '100px',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(145deg, rgba(57,83,163,0.15) 0%, transparent 50%, rgba(5,5,5,0.25) 100%)',
                    }}
                    aria-hidden="true"
                  />
                </motion.div>
              ))}

              {/* Floating accent orb */}
              {!reduce && (
                <motion.div
                  className="absolute -top-3 -right-3 w-16 h-16 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(239,120,61,0.35) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyOverviewBlock;
