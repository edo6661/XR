import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BecomePartnerCta = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 pt-10"
    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
  >
    <p
      className="text-center sm:text-left max-w-xl"
      style={{ fontSize: '0.9rem', color: 'rgba(180,195,220,0.88)', lineHeight: 1.65 }}
    >
      Looking to showcase your solutions, connect with decision-makers, and grow your presence in
      the AI-XR ecosystem?
    </p>
    <Link
      to="/contact"
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 shrink-0"
      style={{
        fontSize: '1rem',
        border: '1px solid rgba(239,120,61,0.4)',
        color: '#ef783d',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = 'rgba(239,120,61,0.08)';
        el.style.borderColor = 'rgba(239,120,61,0.65)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = 'transparent';
        el.style.borderColor = 'rgba(239,120,61,0.4)';
      }}
    >
      Become a Partner
      <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
        →
      </span>
    </Link>
  </motion.div>
);

export default BecomePartnerCta;
