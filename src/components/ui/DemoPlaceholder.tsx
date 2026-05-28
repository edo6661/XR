import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DemoPlaceholderProps {
  title: string;
}

const DemoPlaceholder = ({ title }: DemoPlaceholderProps) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-accent opacity-5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 glass-accent p-10 md:p-16 rounded-2xl max-w-2xl w-full text-center border border-accent/20 shadow-[0_0_40px_rgba(251,146,60,0.05)]"
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 border border-accent/30 rounded-xl flex items-center justify-center text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="font-heading font-black text-3xl md:text-5xl text-foreground mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-foreground-muted mb-10 text-sm md:text-base leading-relaxed">
          This module <span className="text-accent font-semibold">is currently under development</span> and will be available soon.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-300 rounded-sm font-bold tracking-[0.15em] text-[0.7rem] uppercase shadow-[0_0_15px_rgba(251,146,60,0.15)] hover:shadow-[0_0_25px_rgba(251,146,60,0.4)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Return to Hub
        </Link>
      </motion.div>
    </section>
  );
};

export default DemoPlaceholder;