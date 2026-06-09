import { motion, type Variants } from 'framer-motion';
import { COMPANY } from '../../core/navigation/routes';

const coinSpinVariants: Variants = {
  animate: {
    // Putaran Y penuh, tapi kita akali timingnya
    rotateY: [0, 180, 360],
    // Tilt X sedikit ke atas/bawah memberikan ilusi kedalaman (tidak perfectly flat)
    rotateX: [2, 12, 2],
    // Sedikit mengecil saat posisi menyamping (edge-on) biar dramatis
    scale: [1, 0.88, 1],
    transition: {
      duration: 5, // Durasi 1 putaran penuh
      // Cubic-bezier ini rahasianya: 
      // Sangat lambat di awal & akhir (nahan di depan agar terbaca), 
      // tapi melesat sangat cepat di tengah (saat logo terbalik).
      ease: [0.65, 0, 0.35, 1],
      repeat: Infinity,
    },
  },
};

const HeroLogo = ({ showText = true }: { showText?: boolean }) => {
  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-4xl mx-auto">
      {/* Tambahkan perspective di parent agar kedalaman 3D-nya lebih terasa natural */}
      <div className="relative flex flex-col items-center gap-0 mb-3 w-full" style={{ perspective: '1200px' }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: 'blur(16px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-2 sm:mb-5"
        >


          {/* ── LOGO IMAGE UTAMA (Dynamic Premium Coin Spin) ── */}
          <motion.img
            src="/logo_dark_transparent.png"
            alt="XR Summits"
            className="relative w-auto object-contain drop-shadow-xl"
            variants={coinSpinVariants}
            animate="animate"
            style={{
              height: 'clamp(9rem, 14vw, 11rem)',
              // Glow diset sedikit lebih menyebar agar saat muter, pendarannya mengikuti

              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible', // Biarkan terlihat saat di-flip cepat
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