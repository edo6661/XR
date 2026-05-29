import { motion } from 'framer-motion';
import MagneticWrapper from '../ui/MagneticWrapper'; // Import komponen baru
import SplitTextReveal from '../ui/SplitTextReveal';

const TicketsSection = () => {
  return (
    <section id="tickets" className="relative w-full overflow-hidden py-32 bg-background flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] bg-radial from-accent to-transparent blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl rounded-2xl glass-accent p-12 md:p-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

        <SplitTextReveal
          text="Secure Your Access"
          className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6 justify-center"
          delay={0.2}
        />
        <p className="text-foreground-muted mb-10 max-w-xl mx-auto leading-relaxed">
          Join 500+ industry leaders, innovators, and creators. Early bird tickets are highly limited and closing soon.
        </p>

        {/* Bungkus tombol dengan MagneticWrapper (tarikan agak kuat: 0.4) */}
        <MagneticWrapper strength={0.4}>
          <button className="relative px-8 py-4 bg-accent text-background font-bold tracking-[0.2em] uppercase rounded-sm overflow-hidden group transition-all hover:scale-105 shadow-[0_0_40px_rgba(251,146,60,0.4)] hover:shadow-[0_0_60px_rgba(251,146,60,0.6)] cursor-none">
            <span className="relative z-10">Get Tickets Now</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </MagneticWrapper>

      </motion.div>
    </section>
  );
};

export default TicketsSection;