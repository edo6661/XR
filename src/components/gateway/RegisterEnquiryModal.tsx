import { useState, type FormEvent } from 'react';
import GatewayModal from './GatewayModal';
import { COMPANY } from '../../core/navigation/routes';

const ENQUIRY_TYPES = [
  'General registration interest',
  'Exhibitor / sponsorship',
  'Speaker application',
  'Media / press',
  'Partnership',
] as const;

type RegisterEnquiryModalProps = {
  open: boolean;
  onClose: () => void;
  eventName: string;
  accentColor?: string;
};

const RegisterEnquiryModal = ({
  open,
  onClose,
  eventName,
  accentColor = '#fb923c',
}: RegisterEnquiryModalProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const organisation = String(form.get('organisation') ?? '');
    const enquiryType = String(form.get('enquiryType') ?? '');
    const message = String(form.get('message') ?? '');

    const subject = encodeURIComponent(`${eventName} — Registration / Enquiry`);
    const body = encodeURIComponent(
      `Event: ${eventName}\nEnquiry type: ${enquiryType}\nName: ${name}\nEmail: ${email}\nOrganisation: ${organisation}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const labelClass =
    'font-mono text-xs tracking-[0.2em] uppercase text-foreground-muted/80';

  const inputClass =
    'w-full px-4 py-3 rounded-sm bg-[rgba(255,255,255,0.04)] border border-white/10 text-foreground text-sm outline-none transition-colors';

  return (
    <GatewayModal open={open} onClose={handleClose} title="Register / Enquiry" accentColor={accentColor}>
      {submitted ? (
        <div className="flex flex-col gap-4 text-center py-4">
          <p className="text-foreground-muted text-sm leading-relaxed">
            Your email client should open with a pre-filled message. If it did not open, please email us directly at{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
              {COMPANY.email}
            </a>
            .
          </p>
          <p className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-foreground-muted/50">
            Phase 1 · UI placeholder — no backend submission
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 px-6 py-3 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050b18]"
            style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)` }}
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Enquiry type
              </span>
              <select name="enquiryType" required className={inputClass} defaultValue={ENQUIRY_TYPES[0]}>
                {ENQUIRY_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#0d1b2e]">
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Full name
              </span>
              <input name="name" type="text" required autoComplete="name" className={inputClass} />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Email
              </span>
              <input name="email" type="email" required autoComplete="email" className={inputClass} />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Organisation
              </span>
              <input name="organisation" type="text" className={inputClass} />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Message
              </span>
              <textarea name="message" rows={4} className={`${inputClass} resize-y min-h-[100px]`} />
            </label>

            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[0.7rem] text-[#050b18] transition-shadow"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                border: `1px solid ${accentColor}80`,
                boxShadow: `0 0 28px ${accentColor}35`,
              }}
            >
              Send enquiry via email
            </button>
          </form>
        </>
      )}
    </GatewayModal>
  );
};

export default RegisterEnquiryModal;
