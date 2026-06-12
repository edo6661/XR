/**
 * Monochromatic silver/white abstract blob field — glossy 3D orbs behind Past Events.
 * Layered SVG + soft CSS blurs for depth; no colour accents (specular highlights only).
 */

interface SilverBlobBackgroundProps {
  /** Unique id prefix to avoid SVG gradient collisions when multiple instances mount */
  idPrefix?: string;
  className?: string;
}

const SilverBlobBackground = ({ idPrefix = 'svb', className = '' }: SilverBlobBackgroundProps) => {
  const p = idPrefix;

  const blobDefs = [
    { id: 'a', filter: 'lg', transform: 'translate(-90, -70) scale(3.4)', path: 'M48 88 C168 12, 312 -28, 428 72 C544 172, 512 328, 368 392 C224 456, 72 388, 28 248 C-16 108, 8 148, 48 88Z' },
    { id: 'b', filter: 'xl', transform: 'translate(860, -50) scale(3.2)', path: 'M32 52 C148 -12, 296 8, 348 108 C400 208, 332 312, 212 336 C92 360, -8 268, 4 156 C16 44, 88 72, 32 52Z' },
    { id: 'c', filter: 'md', transform: 'translate(1180, 320) scale(2.6)', path: 'M24 36 C88 4, 156 28, 168 96 C180 164, 128 212, 64 220 C0 228, -16 168, 8 108 C32 48, 56 56, 24 36Z' },
    { id: 'd', filter: 'lg', transform: 'translate(-40, 880) scale(3.1)', path: 'M36 44 C132 8, 248 36, 276 132 C304 228, 220 296, 120 304 C20 312, -12 220, 16 132 C44 44, 88 68, 36 44Z' },
    { id: 'e', filter: 'sm', transform: 'translate(760, 1080) scale(2.4)', path: 'M20 28 C64 8, 108 32, 112 76 C116 120, 80 148, 40 144 C0 140, -8 96, 12 56 C32 16, 44 36, 20 28Z' },
    { id: 'f', filter: 'md', transform: 'translate(480, 120) scale(2.8)', path: 'M28 40 C96 12, 172 48, 184 116 C196 184, 140 232, 72 236 C4 240, -12 176, 16 112 C44 48, 68 56, 28 40Z' },
    { id: 'g', filter: 'sm', transform: 'translate(240, 1380) scale(2.2)', path: 'M16 24 C52 4, 88 24, 92 64 C96 104, 68 128, 32 124 C-4 120, -8 80, 8 48 C24 16, 36 32, 16 24Z' },
    { id: 'h', filter: 'xs', transform: 'translate(1020, 1480) scale(2)', path: 'M12 18 C40 4, 68 20, 72 52 C76 84, 52 104, 24 100 C-4 96, -8 64, 4 40 C16 16, 28 28, 12 18Z' },
    { id: 'i', filter: 'md', transform: 'translate(520, -20) rotate(-14) scale(2.5)', path: 'M0 60 C120 20, 240 40, 320 100 C400 160, 380 240, 280 260 C180 280, 80 220, 40 140 C0 60, 20 80, 0 60Z' },
    { id: 'j', filter: 'sm', transform: 'translate(40, 520) rotate(16) scale(2.3)', path: 'M0 48 C96 8, 200 24, 248 88 C296 152, 252 208, 160 216 C68 224, 12 168, 8 108 C4 48, 32 64, 0 48Z' },
    { id: 'k', filter: 'xs', transform: 'translate(1280, 720) scale(1.9)', path: 'M10 16 C32 2, 56 14, 60 42 C64 70, 44 88, 22 84 C0 80, -4 54, 6 34 C16 14, 24 24, 10 16Z' },
    { id: 'l', filter: 'sm', transform: 'translate(140, 280) scale(2.1)', path: 'M18 30 C58 10, 98 34, 102 74 C106 114, 76 138, 38 134 C0 130, -6 90, 10 54 C26 18, 40 38, 18 30Z' },
    { id: 'm', filter: 'md', transform: 'translate(1040, 560) scale(2.5)', path: 'M22 38 C78 10, 140 32, 152 92 C164 152, 118 196, 58 200 C-2 204, -14 148, 10 92 C34 36, 52 52, 22 38Z' },
    { id: 'n', filter: 'lg', transform: 'translate(380, 1580) scale(3)', path: 'M40 56 C148 16, 268 48, 292 148 C316 248, 232 316, 128 324 C24 332, -8 236, 24 144 C56 52, 88 76, 40 56Z' },
    { id: 'o', filter: 'sm', transform: 'translate(620, 720) scale(1.8)', path: 'M14 22 C48 6, 82 26, 86 62 C90 98, 64 118, 32 114 C0 110, -6 74, 8 44 C22 14, 34 30, 14 22Z' },
    { id: 'p', filter: 'xs', transform: 'translate(340, 1040) scale(1.7)', path: 'M11 17 C36 3, 62 18, 66 48 C70 78, 48 96, 22 92 C-4 88, -8 58, 5 36 C18 14, 28 26, 11 17Z' },
  ];

  const abstractRings = [
    { cx: 260, cy: 680, r: 180, opacity: 0.22 },
    { cx: 1100, cy: 360, r: 140, opacity: 0.18 },
    { cx: 920, cy: 1320, r: 110, opacity: 0.15 },
    { cx: 620, cy: 960, r: 220, opacity: 0.12 },
    { cx: 180, cy: 1180, r: 95, opacity: 0.14 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Mesh base — subtle cool/warm silver shift */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 12% 8%, rgba(255,255,255,0.55) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 88% 12%, rgba(232,240,255,0.45) 0%, transparent 50%),
            radial-gradient(ellipse 80% 55% at 72% 88%, rgba(210,224,248,0.35) 0%, transparent 52%),
            radial-gradient(ellipse 65% 45% at 8% 78%, rgba(248,250,255,0.4) 0%, transparent 48%),
            linear-gradient(155deg, #d8e2f2 0%, #e6edf8 38%, #dfe9f6 62%, #eaf0fa 100%)
          `,
        }}
      />

      {/* Soft CSS orbs — depth-of-field behind SVG */}
      <div
        className="absolute -left-[8%] -top-[6%] w-[52%] h-[38%] rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(220,232,250,0.35) 42%, transparent 72%)',
          filter: 'blur(48px)',
        }}
      />
      <div
        className="absolute -right-[6%] top-[4%] w-[44%] h-[32%] rounded-full opacity-65"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.68) 0%, rgba(215,228,248,0.3) 45%, transparent 70%)',
          filter: 'blur(56px)',
        }}
      />
      <div
        className="absolute left-[28%] bottom-[6%] w-[48%] h-[36%] rounded-full opacity-55"
        style={{
          background: 'radial-gradient(circle, rgba(248,250,255,0.6) 0%, rgba(200,218,242,0.28) 48%, transparent 74%)',
          filter: 'blur(64px)',
        }}
      />
      <div
        className="absolute right-[18%] top-[38%] w-[28%] h-[22%] rounded-full opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 68%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Primary SVG blob field */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 2000"
      >
        <defs>
          {blobDefs.map((b) => (
            <g key={`grad-${b.id}`}>
              <radialGradient
                id={`${p}-${b.id}-fill`}
                cx="34%"
                cy="26%"
                r="58%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="22%" stopColor="#eef3ff" stopOpacity="0.9" />
                <stop offset="48%" stopColor="#d4e2f8" stopOpacity="0.72" />
                <stop offset="72%" stopColor="#b8cce8" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#a0b8dc" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id={`${p}-${b.id}-shine`}
                cx="22%"
                cy="16%"
                r="42%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id={`${p}-${b.id}-rim`}
                cx="78%"
                cy="82%"
                r="48%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#8aa4cc" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#8aa4cc" stopOpacity="0" />
              </radialGradient>
            </g>
          ))}

          <filter id={`${p}-shadow-xl`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="8" dy="16" stdDeviation="32" floodColor="#7a94be" floodOpacity="0.38" />
          </filter>
          <filter id={`${p}-shadow-lg`} x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="6" dy="12" stdDeviation="24" floodColor="#8498c4" floodOpacity="0.32" />
          </filter>
          <filter id={`${p}-shadow-md`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="5" dy="10" stdDeviation="18" floodColor="#8aa0c8" floodOpacity="0.28" />
          </filter>
          <filter id={`${p}-shadow-sm`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="3" dy="7" stdDeviation="12" floodColor="#90a8cc" floodOpacity="0.24" />
          </filter>
          <filter id={`${p}-shadow-xs`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="5" stdDeviation="8" floodColor="#98aed0" floodOpacity="0.2" />
          </filter>
          <filter id={`${p}-blur-far`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Far-depth ghost blobs */}
        <g opacity="0.42" filter={`url(#${p}-blur-far)`}>
          <ellipse cx="200" cy="420" rx="280" ry="200" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="1180" cy="680" rx="240" ry="180" fill="rgba(232,242,255,0.3)" />
          <ellipse cx="720" cy="1520" rx="320" ry="220" fill="rgba(248,250,255,0.28)" />
        </g>

        {blobDefs.map((b) => {
          const filterMap: Record<string, string> = {
            xl: `${p}-shadow-xl`,
            lg: `${p}-shadow-lg`,
            md: `${p}-shadow-md`,
            sm: `${p}-shadow-sm`,
            xs: `${p}-shadow-xs`,
            ribbon: `${p}-shadow-md`,
          };
          return (
            <g key={b.id} filter={`url(#${filterMap[b.filter]})`} transform={b.transform}>
              <path d={b.path} fill={`url(#${p}-${b.id}-fill)`} />
              <path d={b.path} fill={`url(#${p}-${b.id}-rim)`} />
              <path d={b.path} fill={`url(#${p}-${b.id}-shine)`} />
            </g>
          );
        })}

        {/* Abstract lens rings — thin specular arcs */}
        {abstractRings.map((ring, i) => (
          <circle
            key={`ring-${i}`}
            cx={ring.cx}
            cy={ring.cy}
            r={ring.r}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2"
            opacity={ring.opacity}
          />
        ))}

        {/* Caustic streaks */}
        <path
          d="M120 180 Q420 80, 680 200 T1240 120"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          opacity="0.4"
        />
        <path
          d="M80 920 Q380 820, 620 940 T1100 860"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.5"
          opacity="0.35"
        />
      </svg>

      {/* Pearl micro-orbs — scattered highlights */}
      <div className="absolute inset-0">
        {[
          { top: '8%', left: '24%', size: 28 },
          { top: '14%', left: '68%', size: 18 },
          { top: '22%', left: '88%', size: 14 },
          { top: '35%', left: '6%', size: 22 },
          { top: '42%', left: '52%', size: 12 },
          { top: '55%', left: '82%', size: 20 },
          { top: '62%', left: '18%', size: 16 },
          { top: '70%', left: '44%', size: 24 },
          { top: '78%', left: '72%', size: 15 },
          { top: '86%', left: '32%', size: 19 },
          { top: '48%', left: '94%', size: 11 },
          { top: '28%', left: '38%', size: 10 },
        ].map((orb, i) => (
          <div
            key={`pearl-${i}`}
            className="absolute rounded-full"
            style={{
              top: orb.top,
              left: orb.left,
              width: orb.size,
              height: orb.size,
              background:
                'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(230,240,255,0.5) 45%, transparent 72%)',
              boxShadow: '0 4px 18px rgba(140,162,200,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
              opacity: 0.55 + (i % 3) * 0.12,
            }}
          />
        ))}
      </div>

      {/* Convex glass sheen */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(118deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 58%, rgba(255,255,255,0.18) 100%),
            linear-gradient(198deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 72%, rgba(255,255,255,0.28) 100%)
          `,
        }}
      />

      {/* Top edge highlight */}
      <div
        className="absolute top-0 inset-x-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 4%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 70%, transparent 96%)',
        }}
      />

      {/* Soft vignette — grounds content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 50% 45%, transparent 40%, rgba(160,178,210,0.08) 100%)',
        }}
      />
    </div>
  );
};

export default SilverBlobBackground;
