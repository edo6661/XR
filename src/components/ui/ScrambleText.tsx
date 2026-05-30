// src/components/ui/ScrambleText.tsx
import { useRef, useEffect } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#010101';

const ScrambleText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (!textRef.current) return;
    let iteration = 0;

    // Bersihkan interval sebelumnya jika ada
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      // Mutasi DOM langsung, TANPA trigger React re-render
      textRef.current!.textContent = text
        .split('')
        .map((_, index) => {
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      iteration += 1 / 2.5;

      if (iteration >= text.length) clearInterval(intervalRef.current!);
    }, 30);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (textRef.current) textRef.current.textContent = text; // Kembalikan ke teks asli
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      ref={textRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block whitespace-nowrap"
    >
      {text}
    </span>
  );
};

export default ScrambleText;