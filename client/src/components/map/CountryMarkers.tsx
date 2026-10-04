import { Layer, Source } from "react-map-gl/maplibre";
import type { ExpressionSpecification, FilterSpecification } from "maplibre-gl";
import type { CountryMarkerCollection } from "../../hooks/useVisaMap";
import { VISA_COLORS } from "../../lib/visa-colors";
import { COUNTRY_MARKER_TIER_MIN_ZOOM } from "../../lib/constants";

interface CountryMarkersProps {
  data: CountryMarkerCollection;
}

const visibilityTiers = [
  { tier: 1, minzoom: COUNTRY_MARKER_TIER_MIN_ZOOM[1] },
  { tier: 2, minzoom: COUNTRY_MARKER_TIER_MIN_ZOOM[2] },
  { tier: 3, minzoom: COUNTRY_MARKER_TIER_MIN_ZOOM[3] },
  { tier: 4, minzoom: COUNTRY_MARKER_TIER_MIN_ZOOM[4] },
] as const;

export const VISA_MARKER_HIT_LAYER_IDS = visibilityTiers.map(
  ({ tier }) => `visa-country-hit-${tier}`,
);

const colorExpression: ExpressionSpecification = [
  "match",
  ["get", "status"],
  "visa-free",
  VISA_COLORS["visa-free"],
  "e-visa",
  VISA_COLORS["e-visa"],
  "visa-on-arrival",
  VISA_COLORS["visa-on-arrival"],
  "no-access",
  VISA_COLORS["no-access"],
  "visa-unknown",
  VISA_COLORS["visa-unknown"],
  VISA_COLORS["embassy-visa"],
] as ExpressionSpecification;

function tierFilter(tier: number): FilterSpecification {
  return ["==", ["get", "tier"], tier];
}

const selectedOrHoveredScale: ExpressionSpecification = [
  "case",
  ["boolean", ["feature-state", "selected"], false],
  1.2,
  ["boolean", ["feature-state", "hovered"], false],
  1.1,
  1,
];

export default function CountryMarkers({ data }: CountryMarkersProps) {
  return (
    <Source id="visa-countries" type="geojson" data={data}>
      {visibilityTiers.map(({ tier, minzoom }) => (
        <Layer
          key={`glow-${tier}`}
          id={`visa-country-glow-${tier}`}
          type="circle"
          minzoom={minzoom}
          filter={tierFilter(tier)}
          paint={{
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1,
              15,
              4,
              22,
              8,
              28,
            ],
            "circle-color": colorExpression,
            "circle-opacity": [
              "case",
              ["boolean", ["feature-state", "selected"], false],
              0.28,
              ["boolean", ["feature-state", "hovered"], false],
              0.22,
              [
                "interpolate",
                ["linear"],
                ["zoom"],
                minzoom,
                0,
                minzoom + 0.28,
                0.13,
                8,
                0.2,
              ],
            ],
            "circle-blur": 0.55,
          }}
        />
      ))}
      {visibilityTiers.map(({ tier, minzoom }) => (
        <Layer
          key={`ring-${tier}`}
          id={`visa-country-ring-${tier}`}
          type="circle"
          minzoom={minzoom}
          filter={tierFilter(tier)}
          paint={{
            "circle-radius": [
              "*",
              ["interpolate", ["linear"], ["zoom"], 1, 11, 4, 15, 8, 20],
              selectedOrHoveredScale,
            ],
            "circle-color": "rgba(5,7,8,0.92)",
            "circle-stroke-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1,
              2,
              6,
              2.6,
            ],
            "circle-stroke-color": colorExpression,
            "circle-stroke-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              minzoom,
              0,
              minzoom + 0.22,
              0.96,
            ],
          }}
        />
      ))}
      {visibilityTiers.map(({ tier, minzoom }) => (
        <Layer
          key={`flag-${tier}`}
          id={`visa-country-flag-${tier}`}
          type="symbol"
          minzoom={minzoom}
          filter={tierFilter(tier)}
          layout={{
            "icon-image": ["get", "iconImage"],
            "icon-size": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1,
              0.48,
              4,
              0.64,
              8,
              0.78,
            ],
            "icon-allow-overlap": false,
            "icon-ignore-placement": false,
            "icon-padding": 5,
          }}
          paint={{
            "icon-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              minzoom,
              0,
              minzoom + 0.22,
              1,
            ],
          }}
        />
      ))}
      {visibilityTiers.map(({ tier, minzoom }) => (
        <Layer
          key={`hit-${tier}`}
          id={`visa-country-hit-${tier}`}
          type="circle"
          minzoom={minzoom}
          filter={tierFilter(tier)}
          paint={{
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1,
              18,
              5,
              25,
              8,
              31,
            ],
            "circle-color": "#ffffff",
            "circle-opacity": 0.001,
            "circle-stroke-width": 0,
          }}
        />
      ))}
      <Layer
        id="visa-country-names"
        type="symbol"
        minzoom={4.1}
        layout={{
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": 10,
          "text-offset": [0, 1.8],
          "text-anchor": "top",
          "text-max-width": 10,
          "text-allow-overlap": false,
          "text-ignore-placement": false,
        }}
        paint={{
          "text-color": "#e9f0eb",
          "text-halo-color": "#07100e",
          "text-halo-width": 1.2,
          "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0,
            4.5,
            0.88,
          ],
        }}
      />
    </Source>
  );
}
