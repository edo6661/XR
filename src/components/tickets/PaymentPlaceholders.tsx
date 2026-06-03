import { motion } from 'framer-motion';
import { CreditCard, Building2, QrCode } from 'lucide-react';
import { BNI_BANK_DETAILS } from '../../core/content/contactPage';

const PaymentPlaceholders = () => (
  <div className="mt-16 pt-14 border-t border-white/[0.06]">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      <p
        className="font-bold tracking-[0.45em] uppercase mb-3"
        style={{ fontSize: '0.52rem', color: 'rgba(251,146,60,0.65)' }}
      >
        Payment options
      </p>
      <h3 className="font-heading font-bold text-foreground" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
        Phase 1 · UI placeholders only
      </h3>
      <p className="text-foreground-muted text-sm mt-3 max-w-lg mx-auto leading-relaxed">
        No live payment processing. Select a method below to preview the registration flow layout.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
      {/* Stripe mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="rounded-xl p-6 flex flex-col gap-4"
        style={{
          border: '1px solid rgba(99,102,241,0.25)',
          background: 'rgba(99,102,241,0.04)',
        }}
      >
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-[#818cf8]" />
          <span className="font-heading font-bold text-foreground text-sm">Stripe payment</span>
        </div>
        <div className="flex flex-col gap-3 opacity-60 pointer-events-none" aria-hidden="true">
          <div className="h-10 rounded-sm bg-white/5 border border-white/10" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-10 rounded-sm bg-white/5 border border-white/10" />
            <div className="h-10 rounded-sm bg-white/5 border border-white/10" />
          </div>
        </div>
        <button
          type="button"
          disabled
          className="mt-auto w-full py-3 rounded-sm font-bold tracking-[0.16em] uppercase text-[0.65rem] text-white/50 cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
        >
          Pay with Stripe (mockup)
        </button>
        <p className="font-mono text-[0.45rem] tracking-[0.25em] uppercase text-center text-foreground-muted/40">
          No Stripe API · Phase 1
        </p>
      </motion.div>

      {/* Bank-in BNI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.06, duration: 0.55 }}
        className="rounded-xl p-6 flex flex-col gap-4"
        style={{
          border: '1px solid rgba(251,146,60,0.2)',
          background: 'rgba(251,146,60,0.03)',
        }}
      >
        <div className="flex items-center gap-2">
          <Building2 size={18} className="text-accent" />
          <span className="font-heading font-bold text-foreground text-sm">Bank-in payment</span>
        </div>
        <dl className="flex flex-col gap-2 text-sm">
          {[
            ['Bank', BNI_BANK_DETAILS.bank],
            ['Account name', BNI_BANK_DETAILS.accountName],
            ['Account no.', BNI_BANK_DETAILS.accountNumber],
            ['SWIFT', BNI_BANK_DETAILS.swift],
            ['Branch', BNI_BANK_DETAILS.branch],
          ].map(([dt, dd]) => (
            <div key={dt} className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-foreground-muted/50 shrink-0 sm:w-24">
                {dt}
              </dt>
              <dd className="text-foreground-muted">{dd}</dd>
            </div>
          ))}
        </dl>
        <p className="font-mono text-[0.45rem] tracking-[0.25em] uppercase text-foreground-muted/40 mt-auto">
          Placeholder account details
        </p>
      </motion.div>

      {/* QR code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.12, duration: 0.55 }}
        className="rounded-xl p-6 flex flex-col items-center gap-4"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div className="flex items-center gap-2 w-full">
          <QrCode size={18} className="text-foreground-muted" />
          <span className="font-heading font-bold text-foreground text-sm">QR code payment</span>
        </div>
        <div
          className="w-full max-w-[160px] aspect-square rounded-lg flex items-center justify-center relative overflow-hidden"
          style={{
            border: '1px dashed rgba(255,255,255,0.15)',
            background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 8px, transparent 8px, transparent 16px)',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-4 border-2 border-white/10 rounded"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fff 2px, transparent 2px), linear-gradient(#fff 2px, transparent 2px)',
              backgroundSize: '12px 12px',
              opacity: 0.08,
            }}
          />
          <QrCode size={48} className="text-foreground-muted/30 relative z-10" />
        </div>
        <p className="text-center text-foreground-muted text-xs leading-relaxed">
          Scan to pay — QR image placeholder
        </p>
        <p className="font-mono text-[0.45rem] tracking-[0.25em] uppercase text-foreground-muted/40">
          DuitNow / FPX · Coming soon
        </p>
      </motion.div>
    </div>
  </div>
);

export default PaymentPlaceholders;
