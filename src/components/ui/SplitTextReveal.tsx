import { motion, type Variants } from 'framer-motion';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitTextReveal = ({ text, className = '', delay = 0 }: SplitTextRevealProps) => {
  // Pecah teks menjadi array kata
  const words = text.split(' ');

  // Varian untuk Container (mengatur jeda antar kata)
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay * i
      },
    }),
  };

  // Varian untuk setiap kata
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -40,
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '0.25em', display: 'inline-block', transformOrigin: 'bottom' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitTextReveal;