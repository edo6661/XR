import { motion } from 'framer-motion';
import type {
  IndustryFocusItem,
  IndustryFocusSectorItem,
} from '../../../core/content/aboutPage';
import { ABOUT_ACCENT } from '../../../core/content/aboutPage';

type IndustryFocusBlockProps = {
  intro: IndustryFocusItem;
  sectors: IndustryFocusSectorItem[];
};

const IndustryFocusBlock = ({ intro, sectors }: IndustryFocusBlockProps) => (
  <div className="max-w-5xl">
    <p
      className="text-foreground-muted leading-relaxed mb-10"
      style={{
        fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
        lineHeight: 1.8,
      }}
    >
      {intro.description}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      {sectors.map((sector, index) => (
        <motion.div
          key={sector.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            delay: index * 0.07,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative flex flex-col overflow-hidden rounded-xl"
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(10,10,10,0.6)',
          }}
        >
          <div className="relative overflow-hidden aspect-[16/9]">
            <img
              src={sector.image}
              alt={sector.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.85) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col gap-1.5 px-4 py-4">
            <div className="flex items-center gap-2">
              <span
                className="w-1 h-3.5 rounded-full flex-shrink-0"
                style={{ background: ABOUT_ACCENT }}
                aria-hidden="true"
              />
              <h4
                className="font-heading font-bold text-foreground leading-tight"
                style={{ fontSize: '0.95rem' }}
              >
                {sector.title}
              </h4>
            </div>
            <p
              className="leading-relaxed pl-3"
              style={{
                fontSize: '1.02rem',
                color: 'rgba(180,195,220,0.9)',
                lineHeight: 1.65,
              }}
            >
              {sector.desc}
            </p>
            {sector.bullets.length > 0 && (
              <ul
                className="mt-1 space-y-1 pl-3"
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(150,165,195,0.85)',
                  lineHeight: 1.55,
                }}
              >
                {sector.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-[0.45em] h-1 w-1 flex-shrink-0 rounded-full"
                      style={{ background: ABOUT_ACCENT }}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default IndustryFocusBlock;
