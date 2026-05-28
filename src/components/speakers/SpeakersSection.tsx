import { motion } from 'framer-motion';
import HolographicImage from '../ui/HolographicImage';

const SPEAKERS = [
  { name: 'Dr. Sarah Chen', role: 'Chief AI Scientist, Nexus', image: 'https://i.pravatar.cc/300?img=1' },
  { name: 'Marcus V.', role: 'Head of Spatial, MetaXR', image: 'https://i.pravatar.cc/300?img=11' },
  { name: 'Elena Rostova', role: 'VP Engineering, NeuralNet', image: 'https://i.pravatar.cc/300?img=5' },
  { name: 'David Kim', role: 'Founder, XR Esports Arena', image: 'https://i.pravatar.cc/300?img=8' },
];

const SpeakersSection = () => {
  return (
    <section className="relative w-full bg-background py-24 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <span className="w-6 h-px bg-accent/60" />
          <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-accent/80">
            Visionary Minds
          </span>
        </div>

        <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-12">
          Keynote{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-white">
            Speakers
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPEAKERS.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group relative rounded-xl overflow-hidden glass p-4 cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">

                {/* Ganti <img> dengan HolographicImage */}
                <HolographicImage
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full rounded-lg"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e] via-transparent to-transparent opacity-80 z-40 pointer-events-none" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors relative z-50">
                {speaker.name}
              </h3>
              <p className="text-xs text-foreground-muted tracking-wide mt-1 relative z-50">
                {speaker.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;