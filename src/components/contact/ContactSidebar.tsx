import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bot, Mail, MapPin } from 'lucide-react';
import { COMPANY } from '../../core/navigation/routes';
import { WHATSAPP_PLACEHOLDER } from '../../core/content/contactPage';
import GatewayModal from '../gateway/GatewayModal';

const ContactSidebar = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        <motion.a
          href={`mailto:${COMPANY.email}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-start gap-4 p-5 rounded-xl transition-colors duration-300"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(10, 20, 36, 0.55)',
          }}
        >
          <Mail size={18} className="text-accent mt-0.5 shrink-0" />
          <div>
            <p className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/55 mb-1">
              Email
            </p>
            <p className="font-heading font-bold text-accent" style={{ fontSize: '0.9rem' }}>
              {COMPANY.email}
            </p>
          </div>
        </motion.a>

        <motion.a
          href={WHATSAPP_PLACEHOLDER.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.16, duration: 0.5 }}
          className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.15)]"
          style={{
            border: '1px solid rgba(74,222,128,0.25)',
            background: 'rgba(74,222,128,0.05)',
          }}
        >
          <MessageCircle size={18} className="text-[#4ade80] shrink-0" />
          <div>
            <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.85rem' }}>
              {WHATSAPP_PLACEHOLDER.label}
            </p>
            <p className="font-mono text-[0.48rem] tracking-[0.25em] uppercase mt-1 text-foreground-muted/45">
              Placeholder · wa.me
            </p>
          </div>
        </motion.a>

        <motion.button
          type="button"
          onClick={() => setAiModalOpen(true)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="flex items-center gap-4 p-5 rounded-xl text-left w-full transition-all duration-300"
          style={{
            border: '1px solid rgba(34,211,238,0.25)',
            background: 'rgba(34,211,238,0.05)',
          }}
        >
          <Bot size={18} className="text-[#22d3ee] shrink-0" />
          <div>
            <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.85rem' }}>
              AI Agent
            </p>
            <p className="font-mono text-[0.48rem] tracking-[0.25em] uppercase mt-1 text-foreground-muted/45">
              UI mockup · Coming soon
            </p>
          </div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.55 }}
          className="relative rounded-xl overflow-hidden aspect-[4/3] min-h-[200px]"
          style={{
            border: '1px dashed rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.02)',
          }}
          aria-label="Interactive map placeholder"
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <MapPin size={28} className="text-accent/60" />
            <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.85rem' }}>
              Interactive map
            </p>
            <p className="text-foreground-muted text-xs leading-relaxed max-w-[200px]">
              {COMPANY.address.line1} {COMPANY.address.line2} {COMPANY.address.line3}
            </p>
            <span className="font-mono text-[0.45rem] tracking-[0.3em] uppercase text-foreground-muted/40">
              Map embed · Phase 1 placeholder
            </span>
          </div>
        </motion.div>
      </div>

      <GatewayModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title="AI Agent"
        accentColor="#22d3ee"
      >
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ border: '1px solid rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.08)' }}
          >
            <Bot size={28} className="text-[#22d3ee]" />
          </div>
          <p className="text-foreground-muted text-sm leading-relaxed max-w-sm">
            Our AI assistant will help answer registration and programme questions. This is a UI placeholder
            only — no live agent is connected in Phase 1.
          </p>
          <p className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/45">
            Coming soon
          </p>
        </div>
      </GatewayModal>
    </>
  );
};

export default ContactSidebar;
