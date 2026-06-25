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
  comingSoon?: boolean;
};

type ActivationSessionSlotsProps = {
  slots: SessionSlot[];
  accentColor?: string;
};

const COMING_SOON_LABEL = 'COMING SOON';
const TOPIC_FONT_SIZE = '0.78rem';

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
      const hasSpeakerDetails = hasName || hasJobTitle || hasOrganization;
      const hasTopic = Boolean(slot.topic);
      const showSpeakerComingSoon = Boolean(slot.comingSoon) || !hasSpeakerDetails;
      const topicText = hasTopic ? slot.topic! : 'Topic to be announced';

      return (
        <article
          key={`session-slot-${index}`}
          className="relative flex h-full flex-col gap-5 rounded-xl p-5"
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
              className="flex h-20 items-center rounded-lg px-3 py-2 overflow-hidden"
              style={{
                background: hasTopic ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: hasTopic
                  ? `1px solid ${accentColor}44`
                  : `1.5px dashed ${accentColor}55`,
              }}
            >
              <p
                className="w-full font-semibold leading-[1.35]"
                style={{
                  fontSize: TOPIC_FONT_SIZE,
                  color: hasTopic ? '#f0f6ff' : 'rgba(200,215,240,0.55)',
                  fontStyle: hasTopic ? 'normal' : 'italic',
                }}
              >
                {topicText}
              </p>
            </div>
          </div>

          <div className="flex min-h-22 flex-1 flex-col">
            <p
              className="mb-3 font-bold tracking-[0.28em] uppercase"
              style={{ fontSize: '0.58rem', color: accentColor }}
            >
              Speaker
            </p>

            {showSpeakerComingSoon ? (
              <div className="flex flex-1 items-center justify-center rounded-xl">
                <span
                  className="text-center font-bold tracking-[0.18em] uppercase"
                  style={{
                    fontSize: '0.95rem',
                    color: accentColor,
                    textShadow: `0 0 16px ${accentColor}66`,
                  }}
                >
                  {COMING_SOON_LABEL}
                </span>
              </div>
            ) : (
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
                  {hasName ? (
                    <p className="font-bold leading-tight" style={{ fontSize: '1rem', color: '#f8faff' }}>
                      {speaker.name}
                    </p>
                  ) : null}
                  {hasJobTitle ? (
                    <p className="leading-snug" style={{ fontSize: '0.82rem', color: '#c8d8f0' }}>
                      {speaker.jobTitle}
                    </p>
                  ) : null}
                  {hasOrganization ? (
                    <p className="leading-snug" style={{ fontSize: '0.78rem', color: '#a8b8d0' }}>
                      {speaker.organization}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </article>
      );
    })}
  </div>
);

export default ActivationSessionSlots;
