import { useEffect, useState, type FormEvent } from 'react';
import { Download, MessageCircle, Send, CheckCircle } from 'lucide-react';
import GatewayModal from './GatewayModal';
import { COMPANY } from '../../core/navigation/routes';
import { WHATSAPP_PLACEHOLDER } from '../../core/content/contactPage';
import {
  LEAD_EVENT_OPTIONS,
  LEAD_INTEREST_OPTIONS,
  buildLeadCaptureMailto,
  buildLeadCaptureWhatsAppHref,
  getDocumentsForLead,
  resolveDefaultEvent,
  type LeadCaptureConfig,
  type LeadCaptureFields,
  type LeadEvent,
  type LeadInterest,
} from '../../core/content/leadCapture';

type LeadCaptureModalProps = LeadCaptureConfig & {
  open: boolean;
  onClose: () => void;
};

const EMPTY_FORM: LeadCaptureFields = {
  name: '',
  email: '',
  phone: '',
  title: '',
  organisation: '',
  country: '',
  interest: LEAD_INTEREST_OPTIONS[0],
  event: '',
};

const buildInitialForm = (
  defaultInterest?: LeadInterest,
  defaultEvent?: LeadEvent,
  eventName?: string,
): LeadCaptureFields => ({
  ...EMPTY_FORM,
  interest: defaultInterest ?? EMPTY_FORM.interest,
  event: defaultEvent ?? resolveDefaultEvent(eventName) ?? '',
});

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-200 placeholder:opacity-40' +
  ' bg-white/[0.06] border border-white/[0.14] text-[#f8faff] focus:border-[rgba(239,120,61,0.6)] focus:shadow-[0_0_0_3px_rgba(239,120,61,0.1)]';

const LABEL_CLASS =
  'font-mono text-[0.58rem] tracking-[0.3em] uppercase text-foreground-muted/80';

const LeadCaptureModal = ({
  open,
  onClose,
  title,
  description,
  eventName,
  defaultInterest,
  defaultEvent,
  intent = 'enquiry',
  accentColor = '#fb923c',
}: LeadCaptureModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<LeadCaptureFields>(() =>
    buildInitialForm(defaultInterest, defaultEvent, eventName),
  );

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    setForm(buildInitialForm(defaultInterest, defaultEvent, eventName));
  }, [open, defaultInterest, defaultEvent, eventName]);

  const handleClose = () => {
    setSubmitted(false);
    setForm(buildInitialForm(defaultInterest, defaultEvent, eventName));
    onClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = buildLeadCaptureMailto(form, { title, eventName });
    setSubmitted(true);
  };

  const documents = getDocumentsForLead(intent, form.interest, eventName);
  const availableDocs = documents.filter((doc) => doc.available);
  const whatsappHref = buildLeadCaptureWhatsAppHref(form, { title, eventName });

  return (
    <GatewayModal open={open} onClose={handleClose} title={title} accentColor={accentColor}>
      {!submitted ? (
        <div className="flex flex-col gap-5">
          {description && (
            <p className="text-copy-sm leading-relaxed">{description}</p>
          )}

          <div
            className="flex items-start gap-3 p-4 rounded-lg"
            style={{
              background: `${accentColor}0d`,
              border: `1px solid ${accentColor}25`,
            }}
          >
            <MessageCircle size={16} className="flex-shrink-0 mt-0.5 text-[#4ade80]" />
            <p className="text-copy-sm leading-relaxed">
              Prefer to chat?{' '}
              <a
                href={WHATSAPP_PLACEHOLDER.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4ade80] underline underline-offset-2 hover:text-[#86efac]"
              >
                Start a conversation on WhatsApp
              </a>{' '}
              — fill in the form below and we&apos;ll follow up, or message us directly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">


            <label className="flex flex-col gap-1.5">
              <span className={LABEL_CLASS}>
                Interest <span className="text-accent">*</span>
              </span>
              <select
                name="interest"
                required
                value={form.interest}
                onChange={(e) =>
                  setForm((f) => ({ ...f, interest: e.target.value as LeadInterest }))
                }
                className={INPUT_CLASS}
              >
                {LEAD_INTEREST_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-[#0d1b2e]">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={LABEL_CLASS}>
                Event <span className="text-accent">*</span>
              </span>
              <select
                name="event"
                required
                value={form.event}
                onChange={(e) =>
                  setForm((f) => ({ ...f, event: e.target.value as LeadEvent }))
                }
                className={INPUT_CLASS}
              >
                <option value="" disabled className="bg-[#0d1b2e]">
                  Select an event
                </option>
                {LEAD_EVENT_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-[#0d1b2e]">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className={LABEL_CLASS}>
                  Full name <span className="text-accent">*</span>
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="Your full name"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={LABEL_CLASS}>
                  Job title <span className="text-accent">*</span>
                </span>
                <input
                  name="title"
                  type="text"
                  required
                  autoComplete="organization-title"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="Your role"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className={LABEL_CLASS}>
                  Organisation / Institution <span className="text-accent">*</span>
                </span>
                <input
                  name="organisation"
                  type="text"
                  required
                  autoComplete="organization"
                  value={form.organisation ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, organisation: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="Your company or institution"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={LABEL_CLASS}>
                  Country <span className="text-accent">*</span>
                </span>
                <input
                  name="country"
                  type="text"
                  required
                  autoComplete="country-name"
                  value={form.country ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="e.g. Malaysia"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className={LABEL_CLASS}>
                  Email <span className="text-accent">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="you@company.com"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={LABEL_CLASS}>
                  Phone number <span className="text-accent">*</span>
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="+60 12 345 6789"
                />
              </label>
            </div>

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
              Submit &amp; continue
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: `${accentColor}18`,
              border: `2px solid ${accentColor}55`,
              boxShadow: `0 0 32px ${accentColor}25`,
            }}
          >
            <CheckCircle size={28} style={{ color: accentColor }} />
          </div>

          <div>
            <h3 className="font-heading font-bold text-foreground mb-2" style={{ fontSize: '1.1rem' }}>
              Thank you — let&apos;s start the conversation
            </h3>
            <p className="text-copy-sm max-w-sm mx-auto leading-relaxed">
              Your details have been captured. If your email app opened, please hit send so our team receives your enquiry. We&apos;ll be in touch shortly.
            </p>
          </div>

          {availableDocs.length > 0 ? (
            <div className="w-full flex flex-col gap-2">
              <p className="text-micro-label">Download your documents</p>
              {availableDocs.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-sm font-bold tracking-[0.16em] uppercase text-[0.68rem] text-[#050505]"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, #fb923c 100%)`,
                    border: `1px solid ${accentColor}80`,
                  }}
                >
                  <Download size={14} />
                  {doc.label}
                </a>
              ))}
            </div>
          ) : documents.length > 0 ? (
            <p className="text-copy-sm max-w-sm">
              Brochure and package documents will be sent to{' '}
              <strong className="text-foreground/90">{form.email}</strong> within 1–2 business days.
            </p>
          ) : null}

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-sm font-bold tracking-[0.16em] uppercase text-[0.68rem] transition-all duration-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.2)]"
            style={{
              border: '1px solid rgba(74,222,128,0.35)',
              background: 'rgba(74,222,128,0.08)',
              color: '#4ade80',
            }}
          >
            <MessageCircle size={15} />
            Continue on WhatsApp
          </a>

          <p className="text-copy-sm">
            Or email us at{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
              {COMPANY.email}
            </a>
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="px-7 py-3 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.7rem] text-[#050505]"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #fb923c 100%)`,
              border: `1px solid ${accentColor}80`,
            }}
          >
            Done
          </button>
        </div>
      )}
    </GatewayModal>
  );
};

export default LeadCaptureModal;
