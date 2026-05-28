import { motion } from 'framer-motion';

const SPONSORS = ['NVIDIA', 'META', 'MICROSOFT', 'EPIC GAMES', 'UNITY', 'SONY', 'HTC VIVE', 'QUALCOMM'];

const SponsorsSection = () => {
  return (
    <section className="py-20 border-y border-border bg-background/50 backdrop-blur-sm overflow-hidden flex flex-col justify-center">
      <div className="text-center mb-10">
        <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-foreground-muted">
          Supported By Industry Leaders
        </span>
      </div>

      <div className="relative w-full flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          className="flex whitespace-nowrap items-center"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...SPONSORS, ...SPONSORS].map((sponsor, i) => (
            <div key={i} className="px-12 flex items-center justify-center">
              <span className="font-heading font-bold text-2xl md:text-4xl text-foreground/20 hover:text-accent/60 transition-colors duration-300">
                {sponsor}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;