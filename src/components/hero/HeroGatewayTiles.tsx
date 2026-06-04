import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * HeroGatewayTiles — the finale: three glassmorphic "shaky" tiles that BOOM in
 * after the logo, letting the visitor pick an event landing page.
 *
 * "glassmorphic shaky tiles" → frosted-glass cards that float/jitter gently
 * (a holographic, alive feel) and settle on hover with a glow + lift. The
 * centre tile sits slightly forward for the "carousel sorta feeling".
 *
 * Data-driven via TILES — the flagship + regional events are real routes; the
 * third (Awards Gala) is a marquee sub-event of XRAS KL. Swap targets/labels in
 * one place if Tamil wants different destinations.
 */

type Tile = {
  tag: string;
  title: string;
  subtitle: string;
  to: string;
  accent: string;
};

const TILES: Tile[] = [
  {
    tag: 'Flagship · KL',
    title: "XRAS KL 26'",
    subtitle: 'The XR Asia Summit',
    to: '/xras-kl-2026',
    accent: '#fb923c',
  },
  {
    tag: 'Grand Finals',
    title: 'XR Esports & Gala',
    subtitle: 'Finals · AI/XR Awards Night',
    to: '/xras-kl-2026',
    accent: '#a855f7',
  },
  {
    tag: 'Regional · Sarawak',
    title: "AIXR 26'",
    subtitle: 'Innovation · Culture · Talent',
    to: '/aixr-2026-sarawak',
    accent: '#22d3ee',
  },
];

type HeroGatewayTilesProps = {
  /** Trigger the boom-in once the sequence reaches the tile step. */
  active: boolean;
};

const HeroGatewayTiles = ({ active }: HeroGatewayTilesProps) => {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative z-20 w-full max-w-4xl mt-4"
      style={{ perspective: '1200px', pointerEvents: active ? 'auto' : 'none' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        {TILES.map((tile, i) => (
          <TileCard
            key={tile.title + i}
            tile={tile}
            index={i}
            active={active}
            isCenter={i === 1}
            reduce={!!reduce}
          />
        ))}
      </div>
    </div>
  );
};

const TileCard = ({
  tile,
  index,
  active,
  isCenter,
  reduce,
}: {
  tile: Tile;
  index: number;
  active: boolean;
  isCenter: boolean;
  reduce: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  // Per-tile shake signature so they don't jitter in lockstep.
  const shake =
    reduce || hovered
      ? { x: 0, y: 0, rotate: 0 }
      : {
        x: [0, index % 2 === 0 ? 1.6 : -1.6, 0, index % 2 === 0 ? -1.2 : 1.2, 0],
        y: [0, -1.4, 1, -0.6, 0],
        rotate: [0, index % 2 === 0 ? 0.35 : -0.35, 0, index % 2 === 0 ? -0.25 : 0.25, 0],
      };

  return (
    <motion.div
      // Boom-in entrance
      initial={{ opacity: 0, y: 44, scale: 0.82, filter: 'blur(10px)' }}
      animate={
        active
          ? { opacity: 1, y: isCenter ? -10 : 0, scale: isCenter ? 1.04 : 1, filter: 'blur(0px)' }
          : { opacity: 0, y: 44, scale: 0.82, filter: 'blur(10px)' }
      }
      transition={{
        delay: active ? 0.12 + index * 0.1 : 0,
        duration: 0.7,
        ease: [0.22, 1.4, 0.4, 1], // slight overshoot → the "boom"
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Shake wrapper (separate so it composes with the entrance transform) */}
      <motion.div
        animate={shake}
        transition={
          reduce || hovered
            ? { duration: 0.4, ease: 'easeOut' }
            : {
              duration: 5.5 + index * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }
        }
      >
        <Link
          to={tile.to}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="group relative block cursor-none rounded-2xl overflow-hidden"
          style={{
            minHeight: isCenter ? '188px' : '172px',
            background: 'rgba(13, 27, 46, 0.42)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid ${tile.accent}${hovered ? '5a' : '2e'}`,
            boxShadow: hovered
              ? `0 0 40px ${tile.accent}22, 0 24px 50px rgba(0,0,0,0.5)`
              : `0 12px 34px rgba(0,0,0,0.34)`,
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {/* top accent line */}
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${tile.accent}80, transparent)`,
            }}
            aria-hidden="true"
          />
          {/* glass sheen */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)' }}
            aria-hidden="true"
          />
          {/* corner brackets */}
          <div
            className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l"
            style={{ borderColor: `${tile.accent}55` }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r"
            style={{ borderColor: `${tile.accent}55` }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col h-full p-5">
            <span
              className="self-start text-[0.52rem] font-bold tracking-[0.3em] uppercase px-2 py-1 rounded-sm"
              style={{
                color: tile.accent,
                background: `${tile.accent}16`,
                border: `1px solid ${tile.accent}2c`,
              }}
            >
              {tile.tag}
            </span>

            <div className="mt-auto flex flex-col gap-1">
              <h3
                className="font-heading font-bold text-foreground leading-tight"
                style={{ fontSize: isCenter ? '1.18rem' : '1.06rem' }}
              >
                {tile.title}
              </h3>
              <p
                className="text-foreground-muted leading-snug"
                style={{ fontSize: '0.7rem' }}
              >
                {tile.subtitle}
              </p>
            </div>

            <div
              className="flex items-center justify-between pt-3 mt-3 border-t"
              style={{ borderColor: `${tile.accent}1c` }}
            >
              <span
                className="text-[0.6rem] font-bold tracking-[0.2em] uppercase"
                style={{ color: tile.accent, opacity: 0.8 }}
              >
                Enter
              </span>
              <span
                className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: tile.accent }}
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroGatewayTiles;
