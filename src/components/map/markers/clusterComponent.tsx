import { Feature } from "@yandex/ymaps3-clusterer";
import { LngLat } from "@yandex/ymaps3-types";
import { YMapMarker } from "ymap3-components";
import { SOURCE } from "../cluster";

export const ClusterComponent = (coordinates: LngLat, features: Feature[]) => (
  <YMapMarker
    key={`${features[0].id}-${features.length}`}
    coordinates={coordinates}
    source={SOURCE}
  >
    <span
      style={{
        borderRadius: "50%",
        background: "rgb(219, 82, 19)",
        color: "white",
        width: 42,
        height: 42,
        outline: "solid 3px rgb(219, 82, 19)",
        outlineOffset: "3px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translate(-50%, -50%)",
      }}
    >
      {features.length}
    </span>
  </YMapMarker>
);
