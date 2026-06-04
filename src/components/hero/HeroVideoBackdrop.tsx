import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * HeroVideoBackdrop — a cinematic, "next-worldly" video layer for the hero.
 *
 * A raw stock clip on its own reads cheap and "gamer". To land the client's
 * "Corporate + Metaverse" brief we do three things on top of the footage:
 *   1. A slow ken-burns push-in + drift so the flat clip gains a sense of 3D
 *      depth (immersive, not 2D-flat) — disabled under reduced-motion.
 *   2. A per-clip colour filter that pulls the footage onto the brand palette.
 *   3. Layered grade passes (deep-navy floor, cyan/orange HUD tint, vignette)
 *      so the result feels like an elegant B2B keynote backdrop, not a loop.
 *
 * The component is intentionally "dumb": phase-driven blur / brightness / scale
 * and the parallax translate are applied by the parent wrapper in HeroSection,
 * so this layer inherits the HoloLens focus-pull for free.
 */

export interface HeroVideoConfig {
  /** Public path to the mp4 (e.g. `/hero/videos/3d_digital_globe.mp4`). */
  src: string;
  /** Optional still shown before the first frame decodes. */
  poster?: string;
  /** Framing of the focal point, e.g. `'50% 35%'` to favour the upper third. */
  objectPosition?: string;
  /** CSS filter that grades the raw clip toward the brand palette. */
  filter?: string;
}

const HeroVideoBackdrop = ({
  src,
  poster,
  objectPosition = '50% 50%',
  filter = 'brightness(0.9) contrast(1.05) saturate(1.04)',
}: HeroVideoConfig) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Some browsers defer autoplay until interaction; swallow the rejection.
    const tryPlay = () => v.play().catch(() => { });
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, [src]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ isolation: 'isolate' }}
      aria-hidden="true"
    >
      {/* Ken-burns wrapper — never drops below 1.06 so parent parallax + drift
          can never expose a hard edge. */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? { scale: 1.06 } : { scale: 1.14 }}
        animate={
          reduce
            ? { scale: 1.06 }
            : { scale: 1.06, x: ['-1.4%', '1.4%', '-1.4%'], y: ['1%', '-1%', '1%'] }
        }
        transition={{
          scale: { duration: 2.6, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 40, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 52, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ willChange: 'transform' }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition, filter }}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      </motion.div>

      {/* Deep-navy floor (multiply) — sinks the blacks into the brand background
          so the clip never reads as a bright stock loop. */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background: 'linear-gradient(180deg, #0b1730 0%, #050b18 100%)',
          opacity: 0.42,
        }}
      />

      {/* Cyan-top / orange-floor HUD tint (screen) — the "next-worldly" glow. */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 14%, rgba(56,189,248,0.14) 0%, transparent 55%), radial-gradient(100% 80% at 50% 102%, rgba(251,146,60,0.12) 0%, transparent 58%)',
        }}
      />

      {/* Cinematic vignette — focuses the eye centre-stage for the reveal. */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 240px 48px rgba(5,11,24,0.82)' }}
      />
    </div>
  );
};

export default HeroVideoBackdrop;
