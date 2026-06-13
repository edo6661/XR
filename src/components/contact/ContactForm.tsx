import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '../../core/navigation/routes';
import { CONTACT_SUBJECTS } from '../../core/content/contactPage';

const LABEL_CLASS =
  'font-mono text-sm tracking-[0.18em] uppercase text-[rgba(180,195,220,0.85)]';

const INPUT_CLASS =
  'w-full px-4 py-3.5 rounded-sm bg-[rgba(255,255,255,0.04)] border border-white/10 text-foreground text-[1.0625rem] outline-none focus:border-[rgba(251,146,60,0.45)] transition-colors placeholder:text-foreground-muted/45';

interface ContactFormProps {
  initialSubject?: string;
}

const ContactForm = ({ initialSubject }: ContactFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState<string>(initialSubject ?? CONTACT_SUBJECTS[0]);

  const isMedia = subject === 'Media Enquiries' || subject === 'Press Accreditation';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subj = encodeURIComponent(`XR Summits — ${String(form.get('subject') ?? 'Enquiry')}`);
    const lines = [
      `Subject: ${form.get('subject')}`,
      `Name: ${form.get('name')}`,
      `Job Title: ${form.get('jobtitle') ?? '—'}`,
      `Email: ${form.get('email')}`,
      `Organisation: ${form.get('organisation')}`,
      `Phone: ${form.get('phone') ?? '—'}`,
    ];
    if (isMedia) {
      lines.push(`Outlet: ${form.get('outlet') ?? '—'}`);
      lines.push(`Coverage Angle: ${form.get('coverage') ?? '—'}`);
    }
    lines.push('', `Message:`, String(form.get('message') ?? ''));
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${COMPANY.email}?subject=${subj}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-8 text-center"
        style={{
          border: '1px solid rgba(251,146,60,0.25)',
          background: 'rgba(251,146,60,0.04)',
        }}
      >
        <p className="text-foreground text-sm font-heading font-bold mb-2">Message composed</p>
        <p className="text-foreground-muted text-sm leading-relaxed mb-4">
          Your email client should open with your message pre-filled. If it didn't, write directly to{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
            {COMPANY.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-[0.68rem] font-bold tracking-[0.2em] uppercase text-accent hover:text-foreground transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      {/* Subject */}
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Subject</span>
        <select
          name="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={INPUT_CLASS}
        >
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>
          ))}
        </select>
      </label>

      {/* Name + Job Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASS}>Full name</span>
          <input name="name" type="text" required autoComplete="name" className={INPUT_CLASS} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASS}>Job title</span>
          <input name="jobtitle" type="text" autoComplete="organization-title" className={INPUT_CLASS} />
        </label>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASS}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={INPUT_CLASS} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASS}>Phone (optional)</span>
          <input name="phone" type="tel" autoComplete="tel" className={INPUT_CLASS} />
        </label>
      </div>

      {/* Organisation */}
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Organisation</span>
        <input name="organisation" type="text" className={INPUT_CLASS} />
      </label>

      {/* Media-specific fields */}
      <AnimatePresence>
        {isMedia && (
          <motion.div
            key="media-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            <div
              className="px-4 py-3 rounded-sm text-[0.88rem] leading-relaxed"
              style={{ border: '1px solid rgba(251,146,60,0.15)', background: 'rgba(251,146,60,0.04)', color: 'rgba(180,195,220,0.88)' }}
            >
              Applying for press accreditation — please provide your outlet and coverage angle below.
            </div>
            <label className="flex flex-col gap-1.5">
              <span className={LABEL_CLASS}>Outlet / Publication</span>
              <input name="outlet" type="text" className={INPUT_CLASS} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={LABEL_CLASS}>Coverage angle</span>
              <textarea name="coverage" rows={2} className={`${INPUT_CLASS} resize-none`} placeholder="What story are you covering?" />
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message */}
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className={`${INPUT_CLASS} resize-y min-h-[120px]`}
        />
      </label>

      <button
        type="submit"
        className="w-full py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[0.78rem] text-[#050505] transition-shadow hover:shadow-[0_0_28px_rgba(251,146,60,0.35)] active:scale-[0.99]"
        style={{
          background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
          border: '1px solid rgba(251,146,60,0.5)',
        }}
      >
        {isMedia ? 'Apply for accreditation' : 'Send via email'}
      </button>
    </motion.form>
  );
};

export default ContactForm;