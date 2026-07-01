import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Download, MessageCircle } from 'lucide-react';
import { COMPANY } from '../../core/navigation/routes';
import { WHATSAPP_PLACEHOLDER } from '../../core/content/contactPage';
import {
  LEAD_EVENT_OPTIONS,
  buildLeadCaptureMailto,
  buildLeadCaptureWhatsAppHref,
  getDocumentsForLead,
  type LeadCaptureFields,
  type LeadEvent,
  type LeadInterest,
} from '../../core/content/leadCapture';

const CONTACT_INTEREST: LeadInterest = 'General Enquiries';

const EMPTY_FORM: LeadCaptureFields = {
  name: '',
  email: '',
  phone: '',
  title: '',
  organisation: '',
  country: '',
  interest: CONTACT_INTEREST,
  event: '',
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<LeadCaptureFields>(EMPTY_FORM);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailto = buildLeadCaptureMailto(form, {
      title: CONTACT_INTEREST,
      message: message.trim() || undefined,
    });
    window.location.href = mailto;
    setSubmitted(true);
  };

  const documents = getDocumentsForLead('enquiry', form.interest);
  const availableDocs = documents.filter((doc) => doc.available);
  const whatsappHref = buildLeadCaptureWhatsAppHref(form, { title: CONTACT_INTEREST });

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-8 text-center callout-accent"
      >
        <p className="text-foreground text-sm font-heading font-bold mb-2">
          Thank you — let&apos;s start the conversation
        </p>
        <p className="text-copy-sm mb-4">
          Your details have been captured. If your email app opened, please hit send. We&apos;ll follow up shortly.
        </p>

        {availableDocs.length > 0 && (
          <div className="flex flex-col gap-2 mb-4">
            {availableDocs.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                download
                className="btn-orange inline-flex items-center justify-center gap-2 py-3"
              >
                <Download size={14} />
                {doc.label}
              </a>
            ))}
          </div>
        )}

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-sm font-bold tracking-[0.16em] uppercase text-[0.68rem] mb-4"
          style={{
            border: '1px solid rgba(74,222,128,0.35)',
            background: 'rgba(74,222,128,0.08)',
            color: '#4ade80',
          }}
        >
          <MessageCircle size={15} />
          Continue on WhatsApp
        </a>

        <p className="text-copy-sm mb-4">
          Or email{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
            {COMPANY.email}
          </a>
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(EMPTY_FORM);
            setMessage('');
          }}
          className="mt-2 text-micro-label font-bold text-accent hover:text-foreground transition-colors"
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
      <div
        className="flex items-start gap-3 p-4 rounded-lg callout-accent"
      >
        <MessageCircle size={16} className="flex-shrink-0 mt-0.5 text-[#4ade80]" />
        <p className="text-copy-sm">
          Prefer WhatsApp?{' '}
          <a
            href={WHATSAPP_PLACEHOLDER.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4ade80] underline underline-offset-2"
          >
            Chat with us directly
          </a>
        </p>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-label-ui">Event</span>
        <select
          name="event"
          required
          value={form.event}
          onChange={(e) => setForm((f) => ({ ...f, event: e.target.value as LeadEvent }))}
          className="input-field"
        >
          <option value="" disabled className="bg-[#0a0a0a]">
            Select an event
          </option>
          {LEAD_EVENT_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-[#0a0a0a]">
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-label-ui">Full name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="input-field"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-label-ui">Job title</span>
          <input
            name="title"
            type="text"
            required
            autoComplete="organization-title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="input-field"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-label-ui">Organisation / Institution</span>
          <input
            name="organisation"
            type="text"
            required
            autoComplete="organization"
            value={form.organisation ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, organisation: e.target.value }))}
            className="input-field"
            placeholder="Your company or institution"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-label-ui">Country</span>
          <input
            name="country"
            type="text"
            required
            autoComplete="country-name"
            value={form.country ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            className="input-field"
            placeholder="e.g. Malaysia"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-label-ui">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="input-field"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-label-ui">Phone number</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="input-field"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-label-ui">Message</span>
        <textarea
          name="message"
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us more about what you're looking for..."
          className="input-field resize-y min-h-[160px]"
        />
      </label>

      <button type="submit" className="btn-orange w-full py-3.5">
        Submit &amp; start conversation
      </button>
    </motion.form>
  );
};

export default ContactForm;
