import { Feature } from "@yandex/ymaps3-clusterer";
import { LngLat } from "@yandex/ymaps3-types";
import { YMapMarker } from "ymap3-components";
import { SOURCE } from "../cluster";
import './markers.scss'

export const ClusterComponent = (coordinates: LngLat, features: Feature[]) => (
  <YMapMarker
    key={`${features[0].id}-${features.length}`}
    coordinates={coordinates}
    source={SOURCE}
  >
    <span
      className="cluster"
    >
      {features.length}
    </span>
  </YMapMarker>
);
