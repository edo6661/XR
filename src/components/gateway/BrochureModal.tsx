import GatewayModal from './GatewayModal';
import { COMPANY } from '../../core/navigation/routes';

type BrochureModalProps = {
  open: boolean;
  onClose: () => void;
  eventName: string;
  accentColor?: string;
};

const BrochureModal = ({ open, onClose, eventName, accentColor = '#fb923c' }: BrochureModalProps) => {
  const mailtoHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`${eventName} — Brochure Request`)}&body=${encodeURIComponent(`Please send me the ${eventName} event brochure.`)}`;

  return (
    <GatewayModal open={open} onClose={onClose} title="Download Brochure" accentColor={accentColor}>
      <div className="flex flex-col gap-5">
        <div
          className="flex flex-col items-center justify-center gap-4 py-10 px-6 rounded-lg"
          style={{
            border: `1px dashed ${accentColor}55`,
            background: `${accentColor}0a`,
          }}
        >
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center"
            style={{ border: `1px solid ${accentColor}40`, background: `${accentColor}12` }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth={1.2} className="w-7 h-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-.53a2 2 0 00-1.94.53l-7.1 5.58a2 2 0 00-.74 1.94V19a2 2 0 002 2h14a2 2 0 002-2v-6.64a2 2 0 00-.74-1.94l-7.1-5.58z"
              />
            </svg>
          </div>
          <p className="font-heading font-bold text-foreground text-center" style={{ fontSize: '0.95rem' }}>
            Brochure PDF — coming soon
          </p>
          <p className="text-foreground-muted text-sm text-center leading-relaxed max-w-xs">
            The official {eventName} brochure will be published here. Request a copy via email in the meantime.
          </p>
        </div>

        <a
          href={mailtoHref}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050b18] transition-shadow"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
            border: `1px solid ${accentColor}80`,
            boxShadow: `0 0 28px ${accentColor}35`,
          }}
        >
          Request brochure by email
        </a>

        <p className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-center text-foreground-muted/45">
          Phase 1 · Asset placeholder
        </p>
      </div>
    </GatewayModal>
  );
};

export default BrochureModal;
