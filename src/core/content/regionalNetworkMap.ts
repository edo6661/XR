/** Geographic network map — speaker countries & Malaysia hub (world-atlas ISO 3166-1 numeric ids) */

export type LabelPlacement = {
  dx: number;
  dy: number;
  anchor?: "start" | "middle" | "end";
  size?: number;
  /** Draw a thin leader line from dot to label when offset is large */
  leader?: boolean;
};

export type GeoNetworkNode = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  isoNumeric: string;
  labelPlacement?: LabelPlacement;
};

export const MAP_VIEWBOX = { width: 1000, height: 520 } as const;

/** All speaker-origin countries + hub — used to highlight borders on the map */
export const SPEAKER_COUNTRY_ISO = new Set([
  "124", // Canada
  "840", // United States
  "826", // United Kingdom
  "528", // Netherlands
  "276", // Germany
  "250", // France
  "724", // Spain
  "792", // Turkey
  "156", // China
  "392", // Japan
  "704", // Vietnam
  "458", // Malaysia
  "360", // Indonesia
]);

export const networkNodes: GeoNetworkNode[] = [
  {
    id: "ca",
    label: "Canada",
    lat: 56.13,
    lng: -106.35,
    isoNumeric: "124",
    labelPlacement: { dx: -32, dy: -12, anchor: "end", size: 11, leader: true },
  },
  {
    id: "us",
    label: "US",
    lat: 39.83,
    lng: -98.58,
    isoNumeric: "840",
    labelPlacement: { dx: 28, dy: 10, anchor: "start", size: 11, leader: true },
  },
  {
    id: "uk",
    label: "UK",
    lat: 53.5,
    lng: -1.5,
    isoNumeric: "826",
    labelPlacement: { dx: -22, dy: -14, anchor: "end", size: 11, leader: true },
  },
  {
    id: "nl",
    label: "Netherlands",
    lat: 52.15,
    lng: 5.3,
    isoNumeric: "528",
    labelPlacement: {
      dx: 10,
      dy: -32,
      anchor: "middle",
      size: 8.5,
      leader: true,
    },
  },
  {
    id: "de",
    label: "Germany",
    lat: 51.0,
    lng: 10.5,
    isoNumeric: "276",
    labelPlacement: {
      dx: 48,
      dy: 8,
      anchor: "start",
      size: 10,
      leader: true,
    },
  },
  {
    id: "fr",
    label: "France",
    lat: 46.0,
    lng: 2.0,
    isoNumeric: "250",
    labelPlacement: { dx: -34, dy: 20, anchor: "end", size: 10, leader: true },
  },
  {
    id: "es",
    label: "Spain",
    lat: 40.0,
    lng: -4.0,
    isoNumeric: "724",
    labelPlacement: {
      dx: -10,
      dy: 26,
      anchor: "middle",
      size: 10,
      leader: true,
    },
  },
  {
    id: "tr",
    label: "Turkey",
    lat: 39.93,
    lng: 32.86,
    isoNumeric: "792",
    labelPlacement: {
      dx: 16,
      dy: 18,
      anchor: "start",
      size: 10,
      leader: true,
    },
  },
  {
    id: "cn",
    label: "China",
    lat: 35.86,
    lng: 104.2,
    isoNumeric: "156",
    labelPlacement: {
      dx: 40,
      dy: -18,
      anchor: "start",
      size: 11,
      leader: true,
    },
  },
  {
    id: "jp",
    label: "Japan",
    lat: 36.2,
    lng: 138.25,
    isoNumeric: "392",
    labelPlacement: { dx: 26, dy: 6, anchor: "start", size: 11, leader: true },
  },
  {
    id: "vn",
    label: "Vietnam",
    lat: 16.05,
    lng: 108.2,
    isoNumeric: "704",
    labelPlacement: { dx: -46, dy: 26, anchor: "end", size: 10, leader: true },
  },
];

export const MALAYSIA_HUB: GeoNetworkNode = {
  id: "my",
  label: "Malaysia",
  lat: 4.0,
  lng: 101.5,
  isoNumeric: "458",
  labelPlacement: { dx: 0, dy: -30, anchor: "middle", size: 17 },
};

export const regionalNodes: GeoNetworkNode[] = [
  {
    id: "id",
    label: "Indonesia",
    lat: -5.2,
    lng: 119.5,
    isoNumeric: "360",
    labelPlacement: { dx: 48, dy: 28, anchor: "start", size: 11, leader: true },
  },
];
