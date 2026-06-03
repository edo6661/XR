import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type GatewayModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  accentColor?: string;
};

const GatewayModal = ({ open, onClose, title, children, accentColor = '#fb923c' }: GatewayModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
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
          aria-labelledby="gateway-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#050b18]/85 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close dialog"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[99999] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl"
            style={{
              background: 'linear-gradient(155deg, rgba(22,38,62,0.96) 0%, rgba(10,20,36,0.98) 100%)',
              border: `1px solid ${accentColor}30`,
              boxShadow: `0 0 48px ${accentColor}12, 0 32px 64px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}70, transparent)`,
              }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between gap-4 p-6 pb-0">
              <h2
                id="gateway-modal-title"
                className="font-heading font-bold text-foreground tracking-wide"
                style={{ fontSize: '1.05rem' }}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-9 h-9 rounded-sm text-foreground-muted hover:text-accent transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 pt-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GatewayModal;
