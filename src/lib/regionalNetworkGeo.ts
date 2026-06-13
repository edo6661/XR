import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import countries110m from "world-atlas/countries-110m.json";
import { MAP_VIEWBOX } from "../core/content/regionalNetworkMap";

const MAP_PADDING = { top: 28, right: 36, bottom: 28, left: 36 } as const;

export type CountryFeature = Feature & { id?: string | number };

type ScreenPoint = { x: number; y: number };

const topology = countries110m as unknown as Topology;
const countriesObject = topology.objects.countries as GeometryCollection;

export const worldCountryFeatures = (
  feature(topology, countriesObject) as { features: CountryFeature[] }
).features;

export function createMapProjection() {
  return geoNaturalEarth1()
    .clipAngle(179)
    .fitExtent(
      [
        [MAP_PADDING.left, MAP_PADDING.top],
        [
          MAP_VIEWBOX.width - MAP_PADDING.right,
          MAP_VIEWBOX.height - MAP_PADDING.bottom,
        ],
      ],
      { type: "Sphere" },
    );
}

export function projectPoint(
  projection: ReturnType<typeof createMapProjection>,
  lng: number,
  lat: number,
): ScreenPoint | null {
  const point = projection([lng, lat]);
  if (!point) return null;
  return { x: point[0], y: point[1] };
}

export function countryPath(
  projection: ReturnType<typeof createMapProjection>,
  country: CountryFeature,
): string {
  return geoPath(projection)(country) ?? "";
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function fmt(n: number): string {
  return n.toFixed(2);
}

/** Americas → Asia: route via lower map (avoids dateline / Arctic projection bugs) */
function isTransPacific(from: ScreenPoint, to: ScreenPoint): boolean {
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return from.x < 380 && to.x > 650 && dist > 280;
}

/** S-curve for NA → Malaysia — one continuous arc that stays inside the map */
function buildTransPacificArc(from: ScreenPoint, to: ScreenPoint): string {
  const maxY = MAP_VIEWBOX.height - MAP_PADDING.bottom - 16;
  const viaY = Math.min(maxY, Math.max(from.y, to.y) + 78);
  const viaX = lerp(from.x, to.x, 0.5);
  const c1x = lerp(from.x, viaX, 0.62);
  const c1y = lerp(from.y, viaY, 0.88);
  const c2x = lerp(viaX, to.x, 0.38);
  const c2y = lerp(viaY, to.y, 0.55);
  return `M${fmt(from.x)},${fmt(from.y)} C${fmt(c1x)},${fmt(c1y)} ${fmt(c2x)},${fmt(c2y)} ${fmt(to.x)},${fmt(to.y)}`;
}

function arcBowSign(from: ScreenPoint, to: ScreenPoint): number {
  if (from.x > to.x + 30) return -1;
  if (from.x > 400 && from.x < 620 && to.x > 650) return -1;
  return 1;
}

/**
 * Screen-space curved connector between projected endpoints.
 * Geographic great circles break on world projections (antimeridian, Arctic wrap).
 */
function buildScreenArc(from: ScreenPoint, to: ScreenPoint): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 1) return "";

  if (isTransPacific(from, to)) {
    return buildTransPacificArc(from, to);
  }

  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const len = dist || 1;
  const curvature = Math.min(dist * 0.11, 40);
  const bowSign = arcBowSign(from, to);
  const cx = mx - (dy / len) * curvature * bowSign;
  const cy = my + (dx / len) * curvature * bowSign;
  return `M${fmt(from.x)},${fmt(from.y)} Q${fmt(cx)},${fmt(cy)} ${fmt(to.x)},${fmt(to.y)}`;
}

/** Curved connection line between two lng/lat points (screen-space, projection-safe) */
export function buildConnectionArc(
  projection: ReturnType<typeof createMapProjection>,
  fromLng: number,
  fromLat: number,
  toLng: number,
  toLat: number,
): string {
  const from = projectPoint(projection, fromLng, fromLat);
  const to = projectPoint(projection, toLng, toLat);
  if (!from || !to) return "";
  return buildScreenArc(from, to);
}

export function countryIsoId(country: CountryFeature): string {
  return String(country.id ?? "");
}
