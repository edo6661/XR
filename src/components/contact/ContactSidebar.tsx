import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bot, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY } from '../../core/navigation/routes';
import { WHATSAPP_PLACEHOLDER, SOCIAL_LINKS } from '../../core/content/contactPage';
import GatewayModal from '../gateway/GatewayModal';

/* ── Social icon SVGs (inline, no extra dep) ────────────────────── */
const SocialIcon = ({ id }: { id: string }) => {
  if (id === 'linkedin') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  if (id === 'youtube') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
  if (id === 'tiktok') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
  if (id === 'instagram') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
  if (id === 'facebook') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
  return null;
};

const ContactSidebar = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">

        {/* Phone */}
        <motion.a
          href={`tel:${COMPANY.phone}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="flex items-start gap-4 p-5 rounded-xl transition-colors duration-300 hover:border-white/15"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10, 14, 22, 0.55)' }}
        >
          <Phone size={17} className="text-accent mt-0.5 shrink-0" />
          <div>
            <p className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/55 mb-1">Phone</p>
            <p className="font-heading font-bold text-accent" style={{ fontSize: '0.9rem' }}>{COMPANY.phone}</p>
          </div>
        </motion.a>

        {/* Email */}
        <motion.a
          href={`mailto:${COMPANY.email}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.13, duration: 0.5 }}
          className="flex items-start gap-4 p-5 rounded-xl transition-colors duration-300 hover:border-white/15"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10, 14, 22, 0.55)' }}
        >
          <Mail size={17} className="text-accent mt-0.5 shrink-0" />
          <div>
            <p className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/55 mb-1">Email</p>
            <p className="font-heading font-bold text-accent" style={{ fontSize: '0.85rem' }}>{COMPANY.email}</p>
          </div>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href={WHATSAPP_PLACEHOLDER.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
          className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.15)]"
          style={{ border: '1px solid rgba(74,222,128,0.25)', background: 'rgba(74,222,128,0.05)' }}
        >
          <MessageCircle size={17} className="text-[#4ade80] shrink-0" />
          <div>
            <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.85rem' }}>{WHATSAPP_PLACEHOLDER.label}</p>
            <p className="font-mono text-[0.48rem] tracking-[0.25em] uppercase mt-1 text-foreground-muted/45">{WHATSAPP_PLACEHOLDER.display}</p>
          </div>
        </motion.a>

        {/* AI Agent */}
        <motion.button
          type="button"
          onClick={() => setAiModalOpen(true)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.23, duration: 0.5 }}
          className="flex items-center gap-4 p-5 rounded-xl text-left w-full transition-all duration-300 hover:border-[rgba(34,211,238,0.4)]"
          style={{ border: '1px solid rgba(34,211,238,0.25)', background: 'rgba(34,211,238,0.05)' }}
        >
          <Bot size={17} className="text-[#22d3ee] shrink-0" />
          <div>
            <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.85rem' }}>AI Agent</p>
            <p className="font-mono text-[0.48rem] tracking-[0.25em] uppercase mt-1 text-foreground-muted/45">Coming soon</p>
          </div>
        </motion.button>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          className="flex items-start gap-4 p-5 rounded-xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10, 14, 22, 0.55)' }}
        >
          <MapPin size={17} className="text-accent mt-0.5 shrink-0" />
          <div>
            <p className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/55 mb-2">Address</p>
            <address className="not-italic text-foreground-muted text-xs leading-relaxed">
              No. 8, Block K, 8th Floor<br />
              Sunway PJ 51A, Jalan SS9A/19<br />
              47300 Petaling Jaya<br />
              Selangor, Malaysia
            </address>
          </div>
        </motion.div>

        {/* Google Maps embed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.33, duration: 0.55 }}
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <iframe
            title="XR Summits Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0!2d101.5976!3d3.1076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4bdaf45b8c99%3A0x3c58a5e8c7c11b0e!2sSunway%20Geo%20Avenue%2C%20Jalan%20Lagoon%20Selatan%2C%20Bandar%20Sunway%2C%2047500%20Petaling%20Jaya%2C%20Selangor!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
            width="100%"
            height="220"
            style={{ border: 0, display: 'block', filter: 'invert(0.88) hue-rotate(180deg) brightness(0.85) contrast(1.05)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="flex gap-2 flex-wrap"
        >
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:scale-105 hover:border-white/20"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'rgba(240,244,255,0.55)' }}
            >
              <SocialIcon id={s.id} />
            </a>
          ))}
        </motion.div>

      </div>

      <GatewayModal open={aiModalOpen} onClose={() => setAiModalOpen(false)} title="AI Agent" accentColor="#22d3ee">
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ border: '1px solid rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.08)' }}>
            <Bot size={28} className="text-[#22d3ee]" />
          </div>
          <p className="text-foreground-muted text-sm leading-relaxed max-w-sm">
            Our AI assistant will help answer registration and programme questions. This is a UI placeholder — no live agent connected in Phase 1.
          </p>
          <p className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/45">Coming soon</p>
        </div>
      </GatewayModal>
    </>
  );
};

export default ContactSidebar;