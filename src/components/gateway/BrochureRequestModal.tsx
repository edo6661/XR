import { useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Send, CheckCircle, MapPin, Mail, User } from 'lucide-react';
import { COMPANY } from '../../core/navigation/routes';
import { lenisInstance } from '../../lib/lenisInstance';

type BrochureRequestModalProps = {
  open: boolean;
  onClose: () => void;
  eventName: string;
  accentColor?: string;
};

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-200 placeholder:opacity-40' +
  ' bg-white/[0.06] border border-white/[0.14] text-[#f8faff] focus:border-[rgba(239,120,61,0.6)] focus:shadow-[0_0_0_3px_rgba(239,120,61,0.1)]';

const BrochureRequestModal = ({
  open,
  onClose,
  eventName,
  accentColor = '#ef783d',
}: BrochureRequestModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', location: '' });

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', location: '' });
    onClose();
  };

  /* Lock scroll */
  if (open) {
    lenisInstance.current?.stop();
  } else {
    lenisInstance.current?.start();
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${eventName} — Brochure Request`);
    const body = encodeURIComponent(
      `Hello XR Summits Team,\n\nI would like to request the official brochure for ${eventName}.\n\nMy details:\nName: ${form.name}\nEmail: ${form.email}\nLocation / Origin: ${form.location}\n\nPlease send the brochure to my email address above.\n\nThank you!`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brochure-modal-title"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-xl overscroll-contain"
            style={{
              background: 'linear-gradient(155deg, rgba(22,38,62,0.97) 0%, rgba(10,20,36,0.99) 100%)',
              border: `1px solid ${accentColor}38`,
              boxShadow: `0 0 60px ${accentColor}14, 0 32px 64px rgba(0,0,0,0.55)`,
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 inset-x-0 h-[2px] rounded-t-xl"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}, ${accentColor}cc, transparent)`,
                boxShadow: `0 0 16px ${accentColor}60`,
              }}
              aria-hidden="true"
            />

            {/* Header */}
            <div className="flex items-center justify-between gap-4 p-6 pb-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}35`,
                  }}
                >
                  <FileText size={18} style={{ color: accentColor }} />
                </div>
                <div>
                  <h2
                    id="brochure-modal-title"
                    className="font-heading font-bold text-[#f8faff]"
                    style={{ fontSize: '1.05rem' }}
                  >
                    Request Brochure
                  </h2>
                  <p className="font-mono text-[0.55rem] tracking-[0.28em] uppercase mt-0.5" style={{ color: `${accentColor}aa` }}>
                    {eventName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center justify-center w-9 h-9 rounded-sm transition-colors hover:text-[#f8faff]"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(168,184,208,0.7)',
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 pt-5">
              {!submitted ? (
                <>
                  {/* Info banner */}
                  <div
                    className="flex items-start gap-3 p-4 rounded-lg mb-6"
                    style={{
                      background: `${accentColor}0d`,
                      border: `1px solid ${accentColor}25`,
                    }}
                  >
                    <FileText size={16} className="flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                    <p className="text-[#a8b8d0] leading-relaxed" style={{ fontSize: '0.85rem' }}>
                      Fill in your details below. Your email app will open with a pre-filled message — simply hit send and we'll deliver the{' '}
                      <strong className="text-[#f8faff]">{eventName}</strong> brochure to your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <label className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(168,184,208,0.7)' }}>
                        <User size={11} />
                        Full Name <span style={{ color: accentColor }}>*</span>
                      </span>
                      <input
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={INPUT_CLASS}
                      />
                    </label>

                    {/* Email */}
                    <label className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(168,184,208,0.7)' }}>
                        <Mail size={11} />
                        Email Address <span style={{ color: accentColor }}>*</span>
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={INPUT_CLASS}
                      />
                    </label>

                    {/* Location */}
                    <label className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(168,184,208,0.7)' }}>
                        <MapPin size={11} />
                        Location / Origin <span style={{ color: accentColor }}>*</span>
                      </span>
                      <input
                        name="location"
                        type="text"
                        required
                        placeholder="City, Country (e.g. Kuala Lumpur, Malaysia)"
                        value={form.location}
                        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                        className={INPUT_CLASS}
                      />
                    </label>

                    <p className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-center mt-1" style={{ color: 'rgba(107,127,163,0.5)' }}>
                      Your email app will open — just hit send
                    </p>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[0.72rem] text-[#050505] transition-all duration-300 hover:shadow-[0_0_36px_rgba(239,120,61,0.45)] active:scale-[0.99] mt-1"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor} 0%, #fb923c 100%)`,
                        border: `1px solid ${accentColor}80`,
                        boxShadow: `0 0 24px ${accentColor}30`,
                      }}
                    >
                      <Send size={15} />
                      Send Brochure Request
                    </button>
                  </form>
                </>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-5 py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: `${accentColor}18`,
                      border: `2px solid ${accentColor}55`,
                      boxShadow: `0 0 32px ${accentColor}25`,
                    }}
                  >
                    <CheckCircle size={28} style={{ color: accentColor }} />
                  </motion.div>

                  <div>
                    <h3 className="font-heading font-bold text-[#f8faff] mb-2" style={{ fontSize: '1.1rem' }}>
                      Request Sent!
                    </h3>
                    <p className="text-[#a8b8d0] leading-relaxed max-w-xs" style={{ fontSize: '0.88rem' }}>
                      Your email app should be open with the request pre-filled. If it didn't open, email us directly at{' '}
                      <a href={`mailto:${COMPANY.email}`} className="underline" style={{ color: accentColor }}>
                        {COMPANY.email}
                      </a>
                    </p>
                  </div>

                  <p className="font-mono text-[0.52rem] tracking-[0.25em] uppercase" style={{ color: 'rgba(107,127,163,0.5)' }}>
                    We'll deliver the brochure within 1–2 business days
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-7 py-3 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.7rem] transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor} 0%, #fb923c 100%)`,
                      color: '#050505',
                      border: `1px solid ${accentColor}80`,
                    }}
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BrochureRequestModal;