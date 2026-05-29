import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const BackgroundElements = () => {
  const { scrollY } = useScroll();
  const [pageHeight, setPageHeight] = useState(3000); // Nilai default

  // Hitung tinggi halaman dinamis agar parallax akurat
  useEffect(() => {
    const updateHeight = () => {
      setPageHeight(document.documentElement.scrollHeight - window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Observer jika konten dinamis berubah
    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  // Memperhalus nilai scroll (fisika pegas) agar tidak kaku
  const smoothScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 100,
    mass: 0.5
  });

  // Kalkulasi pergerakan parallax untuk 3 elemen berbeda
  // Elemen 1 bergerak naik perlahan
  const y1 = useTransform(smoothScrollY, [0, pageHeight || 1000], [0, -500]);

  // Elemen 2 bergerak turun (berlawanan arah scroll)
  const y2 = useTransform(smoothScrollY, [0, pageHeight || 1000], [0, 400]);

  // Elemen 3 bergerak naik lebih cepat dari Elemen 1 (ilusi lebih dekat ke kamera)
  const y3 = useTransform(smoothScrollY, [0, pageHeight || 1000], [0, -800]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">

      {/* Orb 1: Top Right (Orange Accent) */}
      <motion.div
        style={{ y: y1, willChange: 'transform' }}
        className="absolute top-[15%] -right-[10%] w-[600px] h-[600px] opacity-[0.08]"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* Orb 2: Middle Left (Cyan Accent) */}
      <motion.div
        style={{ y: y2, willChange: 'transform' }}
        className="absolute top-[45%] -left-[15%] w-[800px] h-[800px] opacity-[0.06]"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* Orb 3: Bottom Right (Purple/Deep Blue Accent) */}
      <motion.div
        style={{ y: y3, willChange: 'transform' }}
        className="absolute top-[75%] right-[5%] w-[500px] h-[500px] opacity-[0.08]"
        animate={{ scale: [1, 1.15, 1], x: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, #7e22ce 0%, #1e3a8a 30%, transparent 65%)' }}
        />
      </motion.div>

    </div>
  );
};

export default BackgroundElements;