import { motion } from 'framer-motion';
import { ABOUT_HIGHLIGHT_PHOTOS } from '../../../core/content/aboutPage';

const GOLD = '#d4af37';

const AboutHighlightPhotos = ({ className = '' }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-3xl ${className}`}
  >
    {ABOUT_HIGHLIGHT_PHOTOS.map((photo) => (
      <div
        key={photo.src}
        className="relative rounded-xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
          background:
            photo.fit === 'contain'
              ? 'linear-gradient(145deg, #f6f7fa 0%, #eceff5 100%)'
              : 'rgba(8,12,22,0.6)',
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full h-[180px] md:h-[210px] ${photo.fit === 'contain' ? 'object-contain px-3 py-3' : 'object-cover object-center'
            }`}
          loading="lazy"
          decoding="async"
        />
        {photo.fit === 'cover' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(8,12,22,0.78) 0%, rgba(8,12,22,0.08) 50%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        )}
        <p
          className={`absolute bottom-2.5 left-3 right-3 font-mono uppercase tracking-[0.12em] ${photo.fit === 'contain' ? 'text-center' : ''
            }`}
          style={{
            fontSize: '0.88rem',
            color: photo.fit === 'contain' ? 'rgba(40,48,68,0.75)' : 'rgba(240,244,255,0.92)',
          }}
        >
          {photo.caption}
        </p>
        {photo.fit === 'contain' && (
          <div
            className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${GOLD}99 50%, transparent)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    ))}
  </motion.div>
);

export default AboutHighlightPhotos;
