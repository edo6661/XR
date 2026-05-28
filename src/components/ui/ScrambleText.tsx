import { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
}

// Karakter acak yang akan berkedip saat hover
const CHARS = '!<>-_\\/[]{}—=+*^?#010101';

const ScrambleText = ({ text }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            // Jika iterasi sudah melewati index karakter ini, tampilkan huruf asli
            if (index < iteration) {
              return text[index];
            }
            // Jika belum, tampilkan karakter acak
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      // Kecepatan dekripsi (semakin besar angkanya, semakin cepat selesai)
      iteration += 1 / 2.5;

      if (iteration >= text.length) {
        clearInterval(interval);
      }
    }, 30); // Berjalan setiap 30ms

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block whitespace-nowrap"
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;