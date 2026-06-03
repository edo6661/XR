import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { COMPANY } from '../../core/navigation/routes';
import { CONTACT_SUBJECTS } from '../../core/content/contactPage';

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-sm bg-[rgba(255,255,255,0.04)] border border-white/10 text-foreground text-sm outline-none focus:border-[rgba(251,146,60,0.45)] transition-colors';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `XR Summits — ${String(form.get('subject') ?? 'Enquiry')}`,
    );
    const body = encodeURIComponent(
      `Subject: ${form.get('subject')}\nName: ${form.get('name')}\nEmail: ${form.get('email')}\nOrganisation: ${form.get('organisation')}\nPhone: ${form.get('phone')}\n\nMessage:\n${form.get('message')}`,
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
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
        <p className="text-foreground-muted text-sm leading-relaxed mb-4">
          Your email client should open with your message. If not, contact us at{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
            {COMPANY.email}
          </a>
          .
        </p>
        <p className="font-mono text-[0.48rem] tracking-[0.3em] uppercase text-foreground-muted/50">
          Phase 1 · No server submission
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[0.68rem] font-bold tracking-[0.2em] uppercase text-accent hover:text-foreground transition-colors"
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
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/60">
          Subject
        </span>
        <select name="subject" required className={INPUT_CLASS} defaultValue={CONTACT_SUBJECTS[0]}>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s} className="bg-[#0d1b2e]">
              {s}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/60">
            Full name
          </span>
          <input name="name" type="text" required autoComplete="name" className={INPUT_CLASS} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/60">
            Email
          </span>
          <input name="email" type="email" required autoComplete="email" className={INPUT_CLASS} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/60">
            Organisation
          </span>
          <input name="organisation" type="text" className={INPUT_CLASS} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/60">
            Phone (optional)
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={INPUT_CLASS} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-foreground-muted/60">
          Message
        </span>
        <textarea name="message" rows={5} required className={`${INPUT_CLASS} resize-y min-h-[120px]`} />
      </label>

      <button
        type="submit"
        className="w-full py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[0.7rem] text-[#050b18] transition-shadow hover:shadow-[0_0_28px_rgba(251,146,60,0.35)]"
        style={{
          background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
          border: '1px solid rgba(251,146,60,0.5)',
        }}
      >
        Send via email
      </button>
    </motion.form>
  );
};

export default ContactForm;
