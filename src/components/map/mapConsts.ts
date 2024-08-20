import { BehaviorType, LngLat } from "@yandex/ymaps3-types";

export const MapConsts = Object.freeze({
  INITIAL_ZOOM: 15,
  INITIAL_TILT: 0,
  INITIAL_AZIMUTH: 0,
  INITIAL_CENTER: [0, 0] as LngLat,
  LANG: "ru_RU",
  BASIC_MAP_BEHAVIORS: [
    "pinchZoom",
    "drag",
    "pinchRotate",
    "panTilt",
    "mouseTilt",
    "scrollZoom",
    "mouseRotate",
  ] as BehaviorType[] | undefined,
  SELECT_INCIDENT_MODE_BEHAVIORS: ["scrollZoom", "drag"] as
    | BehaviorType[]
    | undefined,

  RESET_MAP_DURATION: 350,
  GEOLOCATION_CONTROL_DURATION: 0,
  BASIC_MAP_SOURCE: "source",
  CLUSTER_GRID_SIZE: 32,
  MAP_LAYER_Z_INDEX: 1800,
  MAP_MODE: 'vector',
  MAP_LAYER_TYPE: "markers",
});
