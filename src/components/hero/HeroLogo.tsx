import { motion, type Variants } from 'framer-motion';
import { COMPANY } from '../../core/navigation/routes';

// Animasi baru: 3D Hover / Subtle Wobble
const coinSpinVariants: Variants = {
  animate: {
    // "Nengok" kiri-kanan perlahan (max 25 derajat)
    rotateY: [-25, 25, -25],
    // Sedikit tilt (mendongak/menunduk) untuk dimensi ekstra
    rotateX: [5, -5, 5],
    // Efek floating (mengambang naik-turun sedikit)
    y: [-6, 6, -6],
    transition: {
      duration: 7, // Dibuat lebih lambat (7 detik) agar pergerakannya sangat smooth dan elegan
      ease: "easeInOut", // Gerakan melambat secara natural saat berganti arah
      repeat: Infinity,
    },
  },
};

const HeroLogo = ({ showText = true }: { showText?: boolean }) => {
  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-4xl mx-auto">
      {/* Perspective tetap ada agar rotasi 25 derajatnya terasa 3D */}
      <div className="relative flex flex-col items-center gap-0 mb-3 w-full" style={{ perspective: '1200px' }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: 'blur(16px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-2 sm:mb-5"
        >
          {/* Efek Conic Glow di Background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-10 rounded-full pointer-events-none"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 40%, rgba(56,189,248,0.06) 60%, rgba(251,146,60,0.12) 80%, rgba(251,146,60,0.06) 90%, transparent 100%)',
              filter: 'blur(10px)',
            }}
            aria-hidden="true"
          />

          {/* Radial Pulse Glow (Oranye) */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.08, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-6 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.45) 0%, transparent 75%)' }}
            aria-hidden="true"
          />

          {/* ── LOGO IMAGE UTAMA (3D Subtle Hover) ── */}
          <motion.img
            src="/logo_dark_transparent.png"
            alt="XR Summits"
            className="relative w-auto object-contain drop-shadow-xl"
            variants={coinSpinVariants}
            animate="animate"
            style={{
              height: 'clamp(9rem, 14vw, 11rem)',
              // Glow tipis dan elegan yang sudah di-ACC sebelumnya
              filter:
                'drop-shadow(0 0 3px rgba(255, 255, 255, 0.45)) ' +
                'drop-shadow(0 0 12px rgba(251, 146, 60, 0.2))',
              transformStyle: 'preserve-3d',
              willChange: 'transform'
            }}
          />
        </motion.div>
      </div>

      {showText && (
        <>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-px origin-center mt-6 mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.75), transparent)',
              boxShadow: '0 0 14px rgba(251,146,60,0.45)',
            }}
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-medium leading-relaxed max-w-2xl px-2"
            style={{ fontSize: 'clamp(0.72rem, 1.5vw, 0.88rem)', color: 'rgba(240,244,255,0.82)', letterSpacing: '0.02em' }}
          >
            {COMPANY.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center leading-relaxed mt-3 px-4"
            style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)', color: 'rgba(107,127,163,0.7)', lineHeight: 1.75 }}
          >
            The future will not be viewed. It will be experienced.
          </motion.p>
        </>
      )}
    </div>
  );
};

export default HeroLogo;