import { Feature } from "@yandex/ymaps3-clusterer";
import { LngLat, LngLatBounds } from "@yandex/ymaps3-types";
import { YMapMarker } from "ymap3-components";
import { MapMarker } from "./markers/marker";

export const SOURCE = "source";

export const seed = (s: number) => () => {
  s = Math.sin(s) * 10000;
  return s - Math.floor(s);
};

export const rnd = seed(10000);

export const BOUNDS: LngLatBounds = [
  [36.76, 56.5],
  [38.48, 54.98],
];
export const getRandomPointCoordinates = (bounds: LngLatBounds): LngLat => [
  bounds[0][0] + (bounds[1][0] - bounds[0][0]) * rnd(),
  bounds[1][1] + (bounds[0][1] - bounds[1][1]) * rnd(),
];

export const getRandomPoints = (
  count: number,
  bounds: LngLatBounds
): Feature[] => {
  return Array.from({ length: count }, (_, index) => ({
    type: "Feature",
    id: index.toString(),
    geometry: { type: "Point", coordinates: getRandomPointCoordinates(bounds) },
  }));
};

export const markerFn = (feature: Feature) => (
  <MapMarker
    key={feature.id}
    coords={feature.geometry.coordinates}
    source={SOURCE}
  ></MapMarker>
);

export const clusterFn = (coordinates: LngLat, features: Feature[]) => (
  <YMapMarker
    key={`${features[0].id}-${features.length}`}
    coordinates={coordinates}
    source={SOURCE}
  >
    <span
      style={{
        borderRadius: "50%",
        background: "red",
        color: "white",
        width: 42,
        height: 42,
        outline: "solid 3px red",
        outlineOffset: "3px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {features.length}
    </span>
  </YMapMarker>
);
