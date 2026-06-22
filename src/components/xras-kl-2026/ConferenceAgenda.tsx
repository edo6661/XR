import { Fragment } from 'react';
import { Check } from 'lucide-react';

type AgendaItem = {
  time?: string;
  label: string;
  emphasis?: boolean;
};

type AgendaDay = {
  day: number;
  theme: string;
  items: AgendaItem[];
};

type ActivityRow = {
  name: string;
  days: [boolean, boolean, boolean];
};

const AGENDA_DAYS: AgendaDay[] = [
  {
    day: 1,
    theme: 'AI-XR Infrastructure & Spatial Media',
    items: [
      { time: '09:00 AM', label: 'Opening Ceremony' },
      { time: '10:00 AM', label: 'Expo Floor Opens' },
      { time: '11:00 AM', label: 'Conference Tracks' },
      { label: 'B2B Business Matching begins' },
      { label: 'Welcome Reception (evening)' },
    ],
  },
  {
    day: 2,
    theme: 'Esports, Governance & Future Interfaces',
    items: [
      { time: '09:10 AM', label: 'Conference, Masterclasses & Coaching' },
      { time: '09:00 AM – 03:00 PM', label: 'Esports Arena open' },
      { label: 'Full day exhibitor floor access' },
      { time: '07:30 PM', label: 'AI-XR Awards & Gala Dinner' },
    ],
  },
  {
    day: 3,
    theme: 'Film Industry, Policy & Broadcast Sports',
    items: [
      { time: '09:10 AM', label: 'Conference, Masterclasses & Coaching' },
      { label: 'Full day exhibitor floor access' },
      { label: 'Intensive buyer-seller deal sessions' },
      { label: 'Startup & Innovation Showcase' },
      { time: '06:00 PM', label: 'Closing Main Stage' },
      { label: 'End of XR ASIA SUMMIT 2026', emphasis: true },
    ],
  },
];

const ACTIVITY_MATRIX: ActivityRow[] = [
  { name: 'Conference', days: [true, true, true] },
  { name: 'Expo', days: [true, true, true] },
  { name: 'Masterclass', days: [true, true, true] },
  { name: 'Coaching', days: [false, true, true] },
  { name: 'Filmmaking Hackathon', days: [true, true, false] },
  { name: 'Esports Tournament', days: [false, true, false] },
  { name: 'Awards & Gala Dinner', days: [false, true, false] },
  { name: 'B2B Matching', days: [true, true, true] },
];

const DAY_LABELS = ['Day 1', 'Day 2', 'Day 3'] as const;

const cardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(239,120,61,0.22)',
  boxShadow: '0 0 24px rgba(239,120,61,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
} as const;

const ConferenceAgenda = () => (
  <div className="mt-8 space-y-8">
    <div>
      <p
        className="mb-1 font-bold tracking-[0.28em] uppercase"
        style={{ fontSize: '0.58rem', color: 'var(--theme-accent)' }}
      >
        Programme Highlights
      </p>
      <p
        className="mb-5 font-heading font-semibold"
        style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--theme-foreground)' }}
      >
        See the Ecosystem Come to Life.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {AGENDA_DAYS.map((day) => (
          <article key={day.day} className="overflow-hidden rounded-xl" style={cardStyle}>
            <header
              className="relative px-4 py-4"
              style={{
                background:
                  'linear-gradient(135deg, rgba(30,58,138,0.45) 0%, rgba(10,18,34,0.75) 100%)',
                borderBottom: '1px solid rgba(239,120,61,0.28)',
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, var(--theme-accent), var(--theme-accent-bright), transparent)',
                  boxShadow: '0 0 12px var(--theme-accent-glow)',
                }}
                aria-hidden="true"
              />
              <p
                className="font-heading font-bold tracking-[0.12em] uppercase"
                style={{ fontSize: '0.72rem', color: 'var(--theme-foreground)' }}
              >
                Day {day.day}
              </p>
              <p
                className="mt-1 font-semibold leading-snug"
                style={{ fontSize: '0.78rem', color: 'var(--theme-accent-bright)' }}
              >
                {day.theme}
              </p>
            </header>

            <ul style={{ borderColor: 'rgba(255,255,255,0.08)' }} className="divide-y">
              {day.items.map((item, index) => (
                <li key={`${day.day}-${index}`} className="px-4 py-3">
                  <p
                    className="leading-snug"
                    style={{
                      fontSize: '0.82rem',
                      color: item.emphasis ? 'var(--theme-accent)' : 'var(--theme-foreground-muted)',
                      fontWeight: item.emphasis ? 700 : 400,
                    }}
                  >
                    {item.time && (
                      <span
                        className="font-bold"
                        style={{ color: 'var(--theme-foreground)' }}
                      >
                        {item.time}:{' '}
                      </span>
                    )}
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>

    <div>
      <p
        className="mb-4 font-bold tracking-[0.28em] uppercase"
        style={{ fontSize: '0.58rem', color: 'var(--theme-accent)' }}
      >
        Activity Matrix
      </p>

      <div className="overflow-hidden rounded-xl p-4 md:p-5" style={cardStyle}>
        <div
          className="grid items-center gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-3.5"
          style={{
            gridTemplateColumns: 'minmax(6.5rem, 1.35fr) repeat(3, minmax(0, 1fr))',
          }}
          role="table"
          aria-label="Summit activity schedule by day"
        >
          <div role="columnheader" aria-hidden="true" />

          {DAY_LABELS.map((label) => (
            <p
              key={label}
              role="columnheader"
              className="text-center font-heading font-bold tracking-[0.1em] uppercase"
              style={{ fontSize: '0.65rem', color: 'var(--theme-accent)' }}
            >
              {label}
            </p>
          ))}

          {ACTIVITY_MATRIX.map((row) => (
            <Fragment key={row.name}>
              <p
                role="rowheader"
                className="font-heading font-bold leading-snug pr-1"
                style={{ fontSize: '0.78rem', color: 'var(--theme-foreground)' }}
              >
                {row.name}
              </p>

              {row.days.map((active, dayIndex) => (
                <div
                  key={`${row.name}-day-${dayIndex}`}
                  role="cell"
                  className="flex h-9 items-center justify-center rounded-full sm:h-10"
                  style={
                    active
                      ? {
                        background:
                          'linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-bright) 100%)',
                        border: '1px solid rgba(239,120,61,0.55)',
                        boxShadow: '0 0 16px rgba(239,120,61,0.25)',
                      }
                      : {
                        background: 'rgba(255,255,255,0.03)',
                        border: '1.5px solid rgba(239,120,61,0.28)',
                      }
                  }
                  aria-label={`${row.name} — ${DAY_LABELS[dayIndex]}: ${active ? 'included' : 'not included'}`}
                >
                  {active && (
                    <Check
                      className="h-4 w-4"
                      style={{ color: '#050505' }}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ConferenceAgenda;
