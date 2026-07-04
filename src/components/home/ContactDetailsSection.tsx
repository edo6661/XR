import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const ACCENT = '#fb923c';

const ContactDetailsSection = () => (
  <section
    id="contact-details"
    className="relative w-full min-h-dvh overflow-hidden flex flex-col justify-center isolate"
    style={{
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',
      /* Solid stops only — semi-transparent gradient let pinned SponsorsSection logos show through */
      backgroundColor: '#ffffff',
      background: `
      linear-gradient(
        to bottom,
        #ffffff 0%,
        #fbfcff 42%,
        #f6f8fc 76%,
        #fafbfd 100%
      )
    `,
    }}
  >

    {/* Ambient blobs — tone disesuaikan agar blend ke silver */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Glow oranye utama — lebih lembut */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(680px,90vw)] h-[380px]"
        style={{
          background: `radial-gradient(ellipse, ${ACCENT} 0%, transparent 68%)`,
          filter: 'blur(80px)',
          opacity: 0.09,
        }}
      />
      {/* Silver-blue blob bawah — bridging ke footer putih */}
      <div
        className="absolute bottom-0 inset-x-0 h-[40%]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 110%, rgba(205,218,240,0.72) 0%, transparent 65%)',
          filter: 'blur(32px)',
        }}
      />
      {/* Cyan subtle */}
      <div
        className="absolute top-1/4 -left-16 w-56 h-56 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #22d3ee 0%, transparent 68%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Purple subtle */}
      <div
        className="absolute top-1/3 -right-12 w-48 h-48 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 68%)',
          filter: 'blur(36px)',
        }}
      />
    </div>

    {/* Silver pearl micro-orbs — sama seperti di PastEventsSection */}
    <div className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none overflow-hidden" aria-hidden="true">
      {[
        { bottom: '28%', left: '12%', size: 18 },
        { bottom: '44%', left: '34%', size: 12 },
        { bottom: '18%', left: '58%', size: 22 },
        { bottom: '52%', left: '76%', size: 14 },
        { bottom: '32%', left: '88%', size: 10 },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            bottom: orb.bottom,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background:
              'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9) 0%, rgba(200,218,240,0.5) 45%, transparent 72%)',
            boxShadow: '0 3px 14px rgba(140,162,200,0.18), inset 0 1px 0 rgba(255,255,255,0.85)',
            opacity: 0.55,
          }}
        />
      ))}
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6">
      <SectionEyebrow align="center" tone="light">Contact</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="group relative rounded-2xl overflow-hidden"
        style={{
          // Light glassmorphism — sama persis gaya neomorphic di PastEventsSection summary card
          background:
            'linear-gradient(145deg, rgba(218,226,240,0.82) 0%, rgba(240,244,252,0.78) 100%)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: `
            inset 5px 5px 18px rgba(158,174,202,0.38),
            inset -5px -5px 16px rgba(255,255,255,0.95),
            0 20px 60px rgba(30,58,138,0.10),
            0 4px 20px rgba(0,0,0,0.06),
            0 1px 0 rgba(255,255,255,1)
          `,
        }}
      >
        {/* Top shine — bright crisp line */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 8%, rgba(255,255,255,1) 38%, rgba(255,255,255,1) 62%, transparent 92%)',
          }}
          aria-hidden="true"
        />

        {/* Top accent line — oranye tipis di bawah shine */}
        <div
          className="absolute top-[2px] inset-x-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 12%, ${ACCENT}55 38%, ${ACCENT}55 62%, transparent 88%)`,
          }}
          aria-hidden="true"
        />

        {/* Glass sheen — upper half */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.08))',
          }}
          aria-hidden="true"
        />

        {/* Left accent bar */}
        <div
          className="absolute top-8 bottom-8 left-0 w-[3px] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${ACCENT}dd, ${ACCENT}30)`,
            boxShadow: `3px 0 16px ${ACCENT}28`,
            borderRadius: '0 3px 3px 0',
          }}
          aria-hidden="true"
        />

        {/* Corner brackets — lebih gelap agar keliatan di light glass */}
        <div
          className="absolute top-4 left-4 w-4 h-4 border-t border-l pointer-events-none transition-colors duration-500 group-hover:border-[rgba(251,146,60,0.7)]"
          style={{ borderColor: 'rgba(239,120,61,0.45)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-4 right-4 w-4 h-4 border-b border-r pointer-events-none transition-colors duration-500 group-hover:border-[rgba(251,146,60,0.7)]"
          style={{ borderColor: 'rgba(239,120,61,0.45)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center gap-6">
          <h2
            id="contact-details-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: 'var(--theme-on-light-heading)',
            }}
          >
            Join the Next Phase Where Asia Builds Its{' '}
            <span className="text-accent">Spatial Future</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              color: 'var(--theme-on-light-muted)',
              lineHeight: 1.8,
              maxWidth: '480px',
            }}
          >
            Whether you're attending, exhibiting, sponsoring, or speaking — XR ASIA SUMMIT connects
            you to the conversations and partnerships that matter.
          </p>

          {/* CTA button — disesuaikan agar kontras di light glass */}
          <Link
            to="/contact"
            className="group/btn inline-flex items-center gap-2 font-bold uppercase tracking-[0.18em] rounded-sm transition-all duration-300"
            style={{
              fontSize: '0.72rem',
              padding: '0.875rem 1.75rem',
              background: 'linear-gradient(135deg, #ef783d 0%, #fb923c 100%)',
              color: '#050505',
              border: '1px solid rgba(239,120,61,0.5)',
              boxShadow: '0 0 28px rgba(239,120,61,0.22), 0 4px 12px rgba(239,120,61,0.15)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow =
                '0 0 44px rgba(239,120,61,0.38), 0 6px 18px rgba(239,120,61,0.2)';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow =
                '0 0 28px rgba(239,120,61,0.22), 0 4px 12px rgba(239,120,61,0.15)';
              el.style.transform = 'translateY(0)';
            }}
          >
            Start the Conversation
            <span
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactDetailsSection;