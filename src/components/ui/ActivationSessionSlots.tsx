import { User } from 'lucide-react';

export type SessionSpeaker = {
  photo?: string;
  name?: string;
  jobTitle?: string;
  organization?: string;
};

export type SessionSlot = {
  topic?: string;
  speaker?: SessionSpeaker;
};

type ActivationSessionSlotsProps = {
  slots: SessionSlot[];
  accentColor?: string;
};

const ActivationSessionSlots = ({
  slots,
  accentColor = '#ef783d',
}: ActivationSessionSlotsProps) => (
  <div
    className={`mt-8 grid items-stretch gap-4 ${slots.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
      }`}
  >
    {slots.map((slot, index) => {
      const speaker = slot.speaker ?? {};
      const hasPhoto = Boolean(speaker.photo);
      const hasName = Boolean(speaker.name);
      const hasJobTitle = Boolean(speaker.jobTitle);
      const hasOrganization = Boolean(speaker.organization);
      const hasTopic = Boolean(slot.topic);

      return (
        <article
          key={`session-slot-${index}`}
          className="flex h-full flex-col gap-5 rounded-xl p-5"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${accentColor}33`,
            boxShadow: `0 0 24px ${accentColor}0a, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          <div className="shrink-0">
            <p
              className="mb-2 font-bold tracking-[0.28em] uppercase"
              style={{ fontSize: '0.58rem', color: accentColor }}
            >
              Topic
            </p>
            <div
              className="flex h-20 items-start rounded-lg px-4 py-3"
              style={{
                background: hasTopic ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: hasTopic
                  ? `1px solid ${accentColor}44`
                  : `1.5px dashed ${accentColor}55`,
              }}
            >
              <p
                className="line-clamp-2 font-semibold leading-snug"
                style={{
                  fontSize: '0.95rem',
                  color: hasTopic ? '#f0f6ff' : 'rgba(200,215,240,0.55)',
                  fontStyle: hasTopic ? 'normal' : 'italic',
                }}
              >
                {hasTopic ? slot.topic : 'Topic to be announced'}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <p
              className="mb-3 font-bold tracking-[0.28em] uppercase"
              style={{ fontSize: '0.58rem', color: accentColor }}
            >
              Speaker
            </p>
            <div className="flex items-start gap-4">
              <div
                className="relative shrink-0 overflow-hidden rounded-xl"
                style={{
                  width: '5.5rem',
                  height: '5.5rem',
                  background: hasPhoto ? 'transparent' : 'rgba(255,255,255,0.03)',
                  border: hasPhoto
                    ? `1.5px solid ${accentColor}55`
                    : `1.5px dashed ${accentColor}55`,
                  boxShadow: hasPhoto ? `0 0 18px ${accentColor}22` : 'none',
                }}
              >
                {hasPhoto ? (
                  <img
                    src={speaker.photo}
                    alt={speaker.name ?? 'Speaker'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                    <User
                      className="h-7 w-7"
                      style={{ color: `${accentColor}88` }}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span
                      className="font-bold tracking-[0.18em] uppercase"
                      style={{ fontSize: '0.45rem', color: 'rgba(200,215,240,0.45)' }}
                    >
                      Photo
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <p
                  className="font-bold leading-tight"
                  style={{
                    fontSize: '1rem',
                    color: hasName ? '#f8faff' : 'rgba(200,215,240,0.5)',
                    fontStyle: hasName ? 'normal' : 'italic',
                  }}
                >
                  {hasName ? speaker.name : 'Speaker name'}
                </p>
                <p
                  className="leading-snug"
                  style={{
                    fontSize: '0.82rem',
                    color: hasJobTitle ? '#c8d8f0' : 'rgba(200,215,240,0.42)',
                    fontStyle: hasJobTitle ? 'normal' : 'italic',
                  }}
                >
                  {hasJobTitle ? speaker.jobTitle : 'Job title'}
                </p>
                <p
                  className="leading-snug"
                  style={{
                    fontSize: '0.78rem',
                    color: hasOrganization ? '#a8b8d0' : 'rgba(200,215,240,0.38)',
                    fontStyle: hasOrganization ? 'normal' : 'italic',
                  }}
                >
                  {hasOrganization ? speaker.organization : 'Organisation'}
                </p>
              </div>
            </div>
          </div>
        </article>
      );
    })}
  </div>
);

export default ActivationSessionSlots;
