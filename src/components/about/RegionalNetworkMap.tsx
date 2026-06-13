import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ABOUT_ACCENT } from '../../core/content/aboutPage';
import {
  MAP_VIEWBOX,
  MALAYSIA_HUB,
  networkNodes,
  regionalNodes,
  SPEAKER_COUNTRY_ISO,
  type GeoNetworkNode,
  type LabelPlacement,
} from '../../core/content/regionalNetworkMap';
import {
  buildConnectionArc,
  countryIsoId,
  countryPath,
  createMapProjection,
  projectPoint,
  worldCountryFeatures,
} from '../../lib/regionalNetworkGeo';

const VIEWBOX = `0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`;

const GRID_LINES = [
  { x1: 0, y1: 130, x2: 1000, y2: 130 },
  { x1: 0, y1: 260, x2: 1000, y2: 260 },
  { x1: 0, y1: 390, x2: 1000, y2: 390 },
  { x1: 200, y1: 0, x2: 200, y2: 520 },
  { x1: 400, y1: 0, x2: 400, y2: 520 },
  { x1: 600, y1: 0, x2: 600, y2: 520 },
  { x1: 800, y1: 0, x2: 800, y2: 520 },
] as const;

type ProjectedNode = GeoNetworkNode & { x: number; y: number };

const DEFAULT_LABEL: LabelPlacement = { dx: 0, dy: -12, anchor: 'middle', size: 13 };

function resolveLabel(node: GeoNetworkNode) {
  const p = node.labelPlacement ?? DEFAULT_LABEL;
  return {
    x: 0,
    y: 0,
    dx: p.dx,
    dy: p.dy,
    anchor: p.anchor ?? 'middle',
    size: p.size ?? 13,
    leader: p.leader ?? false,
  };
}

function NodeLabel({
  node,
  isRegional,
  delay,
}: {
  node: ProjectedNode;
  isRegional: boolean;
  delay: number;
}) {
  const label = resolveLabel(node);
  const labelX = node.x + label.dx;
  const labelY = node.y + label.dy;

  return (
    <>
      {label.leader && (
        <motion.line
          x1={node.x}
          y1={node.y}
          x2={labelX}
          y2={labelY + 4}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1, duration: 0.35 }}
        />
      )}
      <motion.text
        x={labelX}
        y={labelY}
        fill="#f0f4ff"
        fontSize={isRegional ? label.size : label.size}
        fontWeight={isRegional ? 600 : 500}
        textAnchor={label.anchor}
        letterSpacing="0.04em"
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-sans)',
          paintOrder: 'stroke fill',
          stroke: 'rgba(0,0,0,0.65)',
          strokeWidth: 2.5,
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        {node.label}
      </motion.text>
    </>
  );
}

function MalaysiaHubLabels({ hub, delay }: { hub: ProjectedNode; delay: number }) {
  const label = resolveLabel(hub);
  const nameX = hub.x + label.dx;
  const nameY = hub.y + label.dy;

  return (
    <>
      <motion.text
        x={nameX}
        y={nameY}
        fill="#f0f4ff"
        fontSize={label.size}
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="0.06em"
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-sans)',
          paintOrder: 'stroke fill',
          stroke: 'rgba(0,0,0,0.7)',
          strokeWidth: 3,
          textShadow: `0 0 18px ${ABOUT_ACCENT}66, 0 2px 6px rgba(0,0,0,0.9)`,
        }}
      >
        {hub.label}
      </motion.text>
      <motion.rect
        x={hub.x - 36}
        y={hub.y + 20}
        width={72}
        height={14}
        rx={4}
        fill="rgba(0,0,0,0.55)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.45, duration: 0.4 }}
      />
      <motion.text
        x={hub.x}
        y={hub.y + 31}
        fill="#fff8f2"
        fontSize="7.5px"
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="0.28em"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5, duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-sans)',
          paintOrder: 'stroke fill',
          stroke: 'rgba(0,0,0,0.6)',
          strokeWidth: 2,
        }}
      >
        EPICENTER
      </motion.text>
    </>
  );
}

function projectNode(
  projection: ReturnType<typeof createMapProjection>,
  node: GeoNetworkNode,
): ProjectedNode | null {
  const point = projectPoint(projection, node.lng, node.lat);
  if (!point) return null;
  return { ...node, ...point };
}

const RegionalNetworkMap = () => {
  const projection = useMemo(() => createMapProjection(), []);

  const mapData = useMemo(() => {
    const hub = projectNode(projection, MALAYSIA_HUB);
    if (!hub) return null;

    const international = networkNodes
      .map((node) => projectNode(projection, node))
      .filter((node): node is ProjectedNode => node !== null);

    const regional = regionalNodes
      .map((node) => projectNode(projection, node))
      .filter((node): node is ProjectedNode => node !== null);

    const backgroundCountries = worldCountryFeatures.filter(
      (country) => !SPEAKER_COUNTRY_ISO.has(countryIsoId(country)),
    );

    const speakerCountries = worldCountryFeatures.filter((country) =>
      SPEAKER_COUNTRY_ISO.has(countryIsoId(country)),
    );

    return {
      hub,
      international,
      regional,
      backgroundCountries,
      speakerCountries,
    };
  }, [projection]);

  if (!mapData) return null;

  const { hub, international, regional, backgroundCountries, speakerCountries } = mapData;
  const allNodes = [...international, ...regional];

  return (
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
                <clipPath id="network-map-clip">
                  <rect
                    x={0}
                    y={0}
                    width={MAP_VIEWBOX.width}
                    height={MAP_VIEWBOX.height}
                  />
                </clipPath>
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

              {/* SEA radial glow behind Malaysia hub */}
              <motion.ellipse
                cx={hub.x}
                cy={hub.y}
                rx={155}
                ry={95}
                fill="rgba(239,120,61,0.14)"
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

              {/* World — all countries base layer */}
              <g aria-hidden="true">
                {backgroundCountries.map((country, i) => (
                  <motion.path
                    key={`bg-${countryIsoId(country)}`}
                    d={countryPath(projection, country)}
                    fill="rgba(255,255,255,0.035)"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.45"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.04 + (i % 24) * 0.012 }}
                  />
                ))}
              </g>

              {/* Speaker countries — fill + bright outline */}
              {speakerCountries.map((country, i) => {
                const iso = countryIsoId(country);
                const isHub = iso === MALAYSIA_HUB.isoNumeric;
                const d = countryPath(projection, country);

                return (
                  <g key={`speaker-${iso}`}>
                    <motion.path
                      d={d}
                      fill={isHub ? 'rgba(239,120,61,0.12)' : 'rgba(255,255,255,0.07)'}
                      stroke="transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.05 }}
                    />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={isHub ? 'rgba(239,120,61,0.75)' : 'rgba(255,255,255,0.38)'}
                      strokeWidth={isHub ? '1' : '0.85'}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.25 + i * 0.05 }}
                      style={isHub ? { filter: `drop-shadow(0 0 10px ${ABOUT_ACCENT}55)` } : undefined}
                    />
                  </g>
                );
              })}

              {/* Connection arcs — clipped to map bounds */}
              <g clipPath="url(#network-map-clip)">
                {international.map((node, i) => (
                  <motion.path
                    key={`line-${node.id}`}
                    d={buildConnectionArc(projection, node.lng, node.lat, hub.lng, hub.lat)}
                    fill="none"
                    stroke={ABOUT_ACCENT}
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    strokeOpacity="0.32"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.09, duration: 1.8, ease: 'easeOut' }}
                  />
                ))}

                {regional.map((node, i) => (
                  <motion.path
                    key={`regional-line-${node.id}`}
                    d={buildConnectionArc(projection, node.lng, node.lat, hub.lng, hub.lat)}
                    fill="none"
                    stroke={ABOUT_ACCENT}
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    strokeOpacity="0.2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 1.4, ease: 'easeOut' }}
                  />
                ))}
              </g>

              {/* International & regional dots */}
              {allNodes.map((node, i) => {
                const isRegional = regional.some((r) => r.id === node.id);
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
                  </g>
                );
              })}

              {/* Malaysia hub — primary epicenter */}
              <g filter="url(#network-hub-glow)">
                <motion.circle
                  cx={hub.x}
                  cy={hub.y}
                  r={32}
                  fill="transparent"
                  stroke={ABOUT_ACCENT}
                  strokeWidth="1.5"
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1.6, opacity: [0, 0.55, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx={hub.x}
                  cy={hub.y}
                  r={11}
                  fill={ABOUT_ACCENT}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                  style={{ filter: `drop-shadow(0 0 14px ${ABOUT_ACCENT})` }}
                />
              </g>

              {/* Labels — top layer to avoid overlap with map strokes */}
              <g aria-label="Country labels">
                {allNodes.map((node, i) => {
                  const isRegional = regional.some((r) => r.id === node.id);
                  const delay = 0.8 + i * 0.05;
                  return (
                    <g key={`label-${node.id}`}>
                      <NodeLabel node={node} isRegional={isRegional} delay={delay} />
                    </g>
                  );
                })}
                <MalaysiaHubLabels hub={hub} delay={0.4} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegionalNetworkMap;
