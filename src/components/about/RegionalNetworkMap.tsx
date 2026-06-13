import { motion } from 'framer-motion';
import {
  ABOUT_ACCENT,
  MALAYSIA_HUB,
  networkNodes,
  regionalNodes,
} from '../../core/content/aboutPage';

const VIEWBOX = '0 0 1000 520';

const GRID_LINES = [
  { x1: 0, y1: 130, x2: 1000, y2: 130 },
  { x1: 0, y1: 260, x2: 1000, y2: 260 },
  { x1: 0, y1: 390, x2: 1000, y2: 390 },
  { x1: 200, y1: 0, x2: 200, y2: 520 },
  { x1: 400, y1: 0, x2: 400, y2: 520 },
  { x1: 600, y1: 0, x2: 600, y2: 520 },
  { x1: 800, y1: 0, x2: 800, y2: 520 },
] as const;

const LAND_MASSES = [
  {
    id: 'eurasia',
    d: 'M 388 95 L 448 78 L 518 74 L 598 80 L 668 86 L 738 96 L 780 112 L 808 128 L 816 148 L 798 168 L 774 186 L 742 198 L 710 208 L 678 218 L 648 228 L 622 242 L 598 256 L 574 270 L 552 284 L 532 292 L 512 286 L 494 272 L 478 256 L 462 244 L 448 258 L 436 278 L 442 298 L 456 312 L 472 324 L 484 342 L 490 362 L 498 380 L 488 392 L 470 388 L 452 378 L 434 368 L 416 354 L 400 338 L 386 318 L 374 298 L 364 278 L 356 258 L 352 238 L 356 218 L 364 198 L 374 178 L 382 158 L 388 138 L 384 118 L 388 95 Z',
    fill: 'rgba(255,255,255,0.045)',
    stroke: 'rgba(255,255,255,0.1)',
  },
  {
    id: 'western-europe',
    d: 'M 376 152 L 396 144 L 420 148 L 434 162 L 432 180 L 418 192 L 396 196 L 378 188 L 368 172 Z',
    fill: 'rgba(255,255,255,0.048)',
    stroke: 'rgba(255,255,255,0.11)',
  },
  {
    id: 'uk-isles',
    d: 'M 346 154 L 360 146 L 378 150 L 388 162 L 386 176 L 374 184 L 358 182 L 344 174 L 338 164 Z',
    fill: 'rgba(255,255,255,0.048)',
    stroke: 'rgba(255,255,255,0.11)',
  },
  {
    id: 'iberia',
    d: 'M 328 188 L 344 180 L 362 184 L 372 198 L 370 214 L 356 224 L 338 220 L 324 208 L 322 196 Z',
    fill: 'rgba(255,255,255,0.048)',
    stroke: 'rgba(255,255,255,0.11)',
  },
  {
    id: 'anatolia',
    d: 'M 458 168 L 478 160 L 500 166 L 510 182 L 504 198 L 486 206 L 466 200 L 452 186 Z',
    fill: 'rgba(255,255,255,0.048)',
    stroke: 'rgba(255,255,255,0.11)',
  },
  {
    id: 'china-mainland',
    d: 'M 624 168 L 648 158 L 674 166 L 684 182 L 676 198 L 654 206 L 630 198 L 618 182 Z',
    fill: 'rgba(255,255,255,0.048)',
    stroke: 'rgba(255,255,255,0.11)',
  },
  {
    id: 'africa',
    d: 'M 428 232 L 450 222 L 472 228 L 486 242 L 490 262 L 487 282 L 478 308 L 468 328 L 453 348 L 440 364 L 430 378 L 424 387 L 418 378 L 413 362 L 408 342 L 407 322 L 408 302 L 413 282 L 418 262 L 423 248 Z',
    fill: 'rgba(255,255,255,0.04)',
    stroke: 'rgba(255,255,255,0.09)',
  },
  {
    id: 'north-america',
    d: 'M 88 88 L 128 78 L 172 84 L 202 96 L 222 112 L 238 132 L 242 158 L 236 178 L 226 198 L 214 218 L 209 238 L 213 252 L 203 268 L 188 278 L 173 272 L 158 262 L 143 252 L 128 242 L 112 237 L 98 242 L 87 258 L 82 272 L 78 258 L 73 238 L 70 212 L 70 188 L 73 162 L 77 138 L 80 112 Z',
    fill: 'rgba(255,255,255,0.038)',
    stroke: 'rgba(255,255,255,0.085)',
  },
  {
    id: 'south-america',
    d: 'M 194 288 L 212 278 L 228 284 L 238 300 L 242 322 L 238 344 L 228 364 L 218 382 L 206 398 L 193 407 L 183 402 L 177 388 L 174 368 L 173 348 L 177 328 L 180 308 Z',
    fill: 'rgba(255,255,255,0.035)',
    stroke: 'rgba(255,255,255,0.085)',
  },
  {
    id: 'australia',
    d: 'M 770 312 L 802 302 L 834 308 L 858 322 L 870 344 L 866 366 L 850 382 L 830 387 L 808 383 L 787 373 L 770 358 L 760 340 L 762 320 Z',
    fill: 'rgba(255,255,255,0.04)',
    stroke: 'rgba(255,255,255,0.09)',
  },
  {
    id: 'indochina',
    d: 'M 584 228 L 604 216 L 626 224 L 638 242 L 634 260 L 620 272 L 600 268 L 586 252 L 580 238 Z',
    fill: 'rgba(255,255,255,0.048)',
    stroke: 'rgba(255,255,255,0.11)',
  },
  {
    id: 'borneo-sumatra',
    d: 'M 598 268 L 618 258 L 642 266 L 656 284 L 648 304 L 628 314 L 606 306 L 592 290 Z',
    fill: 'rgba(255,255,255,0.045)',
    stroke: 'rgba(255,255,255,0.1)',
  },
  {
    id: 'malay-peninsula',
    d: 'M 572 284 L 588 270 L 606 278 L 612 296 L 602 314 L 586 320 L 572 308 Z',
    fill: 'rgba(255,255,255,0.05)',
    stroke: 'rgba(255,255,255,0.12)',
    highlight: true,
  },
  {
    id: 'indonesia',
    d: 'M 608 334 L 628 324 L 652 330 L 668 346 L 664 368 L 646 382 L 622 378 L 604 362 L 600 346 Z',
    fill: 'rgba(255,255,255,0.048)',
    stroke: 'rgba(255,255,255,0.11)',
  },
  {
    id: 'indonesia-east',
    d: 'M 662 342 L 678 336 L 686 350 L 680 364 L 666 366 L 656 354 Z',
    fill: 'rgba(255,255,255,0.042)',
    stroke: 'rgba(255,255,255,0.09)',
  },
  {
    id: 'japan',
    d: 'M 712 148 L 724 140 L 732 150 L 729 162 L 719 170 L 708 166 L 702 154 Z',
    fill: 'rgba(255,255,255,0.04)',
    stroke: 'rgba(255,255,255,0.09)',
  },
] as const;

const REGION_LABELS = [
  { x: 140, y: 68, label: 'NORTH AMERICA' },
  { x: 410, y: 68, label: 'EUROPE' },
  { x: 722, y: 68, label: 'EAST ASIA' },
  { x: 630, y: 420, label: 'SOUTHEAST ASIA' },
] as const;

const REGION_LABEL_STYLE = {
  fill: 'rgba(210, 220, 240, 0.62)',
  stroke: 'rgba(0, 0, 0, 0.55)',
  strokeWidth: 0.6,
  paintOrder: 'stroke fill' as const,
  fontFamily: 'var(--font-sans)',
  fontSize: '8.5px',
  fontWeight: 600,
  letterSpacing: '0.22em',
};

const RegionalNetworkMap = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
    className="relative w-full mt-4 rounded-[18px] p-1"
    style={{
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 0 32px rgba(239,120,61,0.06)',
    }}
  >
    <div
      className="relative w-full rounded-2xl overflow-hidden glass"
      style={{
        background: 'radial-gradient(circle at 75% 70%, rgba(239,120,61,0.06) 0%, rgba(5,5,5,0) 60%)',
        border: '1px solid rgba(239,120,61,0.25)',
        boxShadow: 'inset 0 0 0 1px rgba(239,120,61,0.08)',
      }}
    >
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="min-w-[700px] w-full p-6 lg:p-10">
          <svg
            viewBox={VIEWBOX}
            className="w-full h-auto drop-shadow-md"
            role="img"
            aria-label="Regional network map showing speaker origin countries connected to Malaysia"
          >
            <defs>
              <filter id="network-dot-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="network-hub-glow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="7" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="network-sea-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="22" result="b" />
              </filter>
            </defs>

            {/* SEA radial glow */}
            <motion.ellipse
              cx={MALAYSIA_HUB.x + 16}
              cy={MALAYSIA_HUB.y + 31}
              rx={160}
              ry={100}
              fill="rgba(239,120,61,0.11)"
              filter="url(#network-sea-glow)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />

            {/* Grid */}
            {GRID_LINES.map((line, i) => (
              <motion.line
                key={`grid-${i}`}
                {...line}
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
              />
            ))}

            {/* Continent / country outlines */}
            {LAND_MASSES.map((land, i) => (
              <motion.path
                key={land.id}
                d={land.d}
                fill={land.fill}
                stroke={land.stroke}
                strokeWidth="0.65"
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.1 + i * 0.06 },
                  pathLength: { duration: 1.4, delay: 0.1 + i * 0.06, ease: 'easeOut' },
                }}
                style={
                  'highlight' in land && land.highlight
                    ? { filter: `drop-shadow(0 0 8px ${ABOUT_ACCENT}22)` }
                    : undefined
                }
              />
            ))}

            {/* Region labels */}
            {REGION_LABELS.map((region, i) => (
              <motion.text
                key={region.label}
                x={region.x}
                y={region.y}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                style={REGION_LABEL_STYLE}
              >
                {region.label}
              </motion.text>
            ))}

            {/* International lines → Malaysia hub */}
            {networkNodes.map((node, i) => (
              <motion.line
                key={`line-${node.id}`}
                x1={node.x}
                y1={node.y}
                x2={MALAYSIA_HUB.x}
                y2={MALAYSIA_HUB.y}
                stroke={ABOUT_ACCENT}
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeOpacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 1.8, ease: 'easeOut' }}
              />
            ))}

            {/* Regional lines → Malaysia hub */}
            {regionalNodes.map((node, i) => (
              <motion.line
                key={`regional-line-${node.id}`}
                x1={node.x}
                y1={node.y}
                x2={MALAYSIA_HUB.x}
                y2={MALAYSIA_HUB.y}
                stroke={ABOUT_ACCENT}
                strokeWidth="1"
                strokeDasharray="3 5"
                strokeOpacity="0.18"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.15, duration: 1.4, ease: 'easeOut' }}
              />
            ))}

            {/* International & regional dots */}
            {[...networkNodes, ...regionalNodes].map((node, i) => {
              const isRegional = regionalNodes.some((r) => r.id === node.id);
              const delay = 0.8 + i * 0.05;

              return (
                <g key={`node-${node.id}`} filter="url(#network-dot-glow)">
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={12}
                    fill="transparent"
                    stroke={ABOUT_ACCENT}
                    strokeWidth="1"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: [0, 0.35, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isRegional ? 5 : 4}
                    fill={ABOUT_ACCENT}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay, type: 'spring', stiffness: 200, damping: 10 }}
                    style={{ filter: `drop-shadow(0 0 6px ${ABOUT_ACCENT})` }}
                  />
                  <motion.text
                    x={node.x}
                    y={node.y - 12}
                    fill="#f0f4ff"
                    fontSize={isRegional ? '14px' : '13px'}
                    fontWeight={isRegional ? '600' : 'normal'}
                    textAnchor="middle"
                    letterSpacing="0.05em"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.2, duration: 0.4 }}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {node.label}
                  </motion.text>
                </g>
              );
            })}

            {/* Malaysia hub — primary epicenter */}
            <g filter="url(#network-hub-glow)">
              <motion.circle
                cx={MALAYSIA_HUB.x}
                cy={MALAYSIA_HUB.y}
                r={28}
                fill="transparent"
                stroke={ABOUT_ACCENT}
                strokeWidth="1.5"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1.6, opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={MALAYSIA_HUB.x}
                cy={MALAYSIA_HUB.y}
                r={10}
                fill={ABOUT_ACCENT}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                style={{ filter: `drop-shadow(0 0 14px ${ABOUT_ACCENT})` }}
              />
              <motion.text
                x={MALAYSIA_HUB.x}
                y={MALAYSIA_HUB.y - 20}
                fill="#f0f4ff"
                fontSize="18px"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="0.06em"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                }}
              >
                {MALAYSIA_HUB.label}
              </motion.text>
              <motion.text
                x={MALAYSIA_HUB.x + 68}
                y={MALAYSIA_HUB.y + 23}
                fill={ABOUT_ACCENT}
                fontSize="9px"
                fontWeight="bold"
                textAnchor="start"
                letterSpacing="0.28em"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.85 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6, duration: 0.8 }}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                EPICENTER
              </motion.text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </motion.div>
);

export default RegionalNetworkMap;
