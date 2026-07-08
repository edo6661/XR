import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';
import { lenisInstance } from '../../lib/lenisInstance';
import type { SpeakerProfile } from '../../core/content/speakerUtils';

type SpeakerDetailModalProps = {
  speaker: SpeakerProfile | null;
  onClose: () => void;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((part) => !part.startsWith("'") && part.length > 1 && !part.startsWith('Dr') && !part.startsWith('Ts'))
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

const SectionLabel = ({
  children,
  accent,
}: {
  children: string;
  accent: string;
}) => (
  <p
    className="mb-2 font-bold tracking-[0.22em] uppercase"
    style={{ fontSize: '0.72rem', color: accent }}
  >
    {children}
  </p>
);

const SpeakerDetailModal = ({ speaker, onClose }: SpeakerDetailModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const open = Boolean(speaker);
  const accent = speaker?.accentColor ?? '#ef783d';
  const hasTopic = Boolean(speaker?.topic?.trim());
  const hasBio = Boolean(speaker?.bio?.trim());

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const lenis = lenisInstance.current;
    lenis?.stop();

    const html = document.documentElement;
    const { style: htmlStyle } = html;
    const { style: bodyStyle } = document.body;
    const prevHtmlOverflow = htmlStyle.overflow;
    const prevBodyOverflow = bodyStyle.overflow;

    htmlStyle.overflow = 'hidden';
    bodyStyle.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      htmlStyle.overflow = prevHtmlOverflow;
      bodyStyle.overflow = prevBodyOverflow;
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  useLayoutEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const onPanelWheel = (event: WheelEvent) => {
      event.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = panel;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) return;

      event.preventDefault();
      panel.scrollTop += event.deltaY;
    };

    panel.addEventListener('wheel', onPanelWheel, { passive: false });

    return () => {
      panel.removeEventListener('wheel', onPanelWheel);
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {speaker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="speaker-detail-name"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#050b18]/88 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close speaker details"
          />

          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl overscroll-contain"
            data-lenis-prevent
            data-lenis-prevent-wheel
            style={{
              background: 'linear-gradient(155deg, rgba(22,38,62,0.96) 0%, rgba(10,20,36,0.98) 100%)',
              border: `1px solid ${accent}35`,
              boxShadow: `0 0 48px ${accent}14, 0 32px 64px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
              }}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-sm text-foreground-muted hover:text-accent transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(5,8,16,0.55)' }}
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col sm:flex-row">
              <div
                className="relative shrink-0 w-full sm:w-56 lg:w-64 overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                {speaker.photo ? (
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="h-full w-full object-cover object-[50%_12%]"
                    style={{ filter: 'grayscale(10%) brightness(0.92)' }}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{
                      background: `linear-gradient(145deg, ${accent}18 0%, rgba(5,8,16,0.92) 100%)`,
                    }}
                  >
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full font-heading font-black"
                      style={{
                        fontSize: '1.5rem',
                        background: `${accent}14`,
                        border: `1px solid ${accent}35`,
                        color: accent,
                      }}
                    >
                      {getInitials(speaker.name) || <User size={28} aria-hidden="true" />}
                    </div>
                  </div>
                )}

                <div
                  className="absolute inset-0 pointer-events-none sm:hidden"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,20,36,0.95) 0%, rgba(10,20,36,0.2) 45%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
                <div>
                  <p
                    className="mb-2 font-bold tracking-[0.28em] uppercase"
                    style={{ fontSize: '0.82rem', color: accent }}
                  >
                    Speaker
                  </p>
                  <h2
                    id="speaker-detail-name"
                    className="font-heading font-bold leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', color: '#f8faff' }}
                  >
                    {speaker.name}
                  </h2>
                </div>

                {speaker.role ? (
                  <p
                    className="font-semibold leading-snug whitespace-pre-line"
                    style={{ fontSize: '1rem', color: accent }}
                  >
                    {speaker.role}
                  </p>
                ) : null}

                {speaker.company ? (
                  <p
                    className="leading-relaxed whitespace-pre-line"
                    style={{ fontSize: '1rem', color: '#a8b8d0', lineHeight: 1.75 }}
                  >
                    {speaker.company}
                  </p>
                ) : null}
              </div>
            </div>

            {(hasTopic || hasBio) && (
              <div
                className="flex flex-col gap-6 px-6 pb-7 sm:px-8 sm:pb-8"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {hasTopic ? (
                  <div className="pt-6">
                    <SectionLabel accent={accent}>Topic & Syllabus</SectionLabel>
                    <p
                      className="leading-relaxed whitespace-pre-line"
                      style={{ fontSize: '0.95rem', color: '#e8eef8', lineHeight: 1.7 }}
                    >
                      {speaker.topic}
                    </p>
                  </div>
                ) : null}

                {hasBio ? (
                  <div className={hasTopic ? '' : 'pt-6'}>
                    <SectionLabel accent={accent}>Bio</SectionLabel>
                    <p
                      className="leading-relaxed whitespace-pre-line"
                      style={{ fontSize: '0.95rem', color: '#a8b8d0', lineHeight: 1.75 }}
                    >
                      {speaker.bio}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default SpeakerDetailModal;
