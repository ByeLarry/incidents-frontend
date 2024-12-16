import { YMapMarker } from "ymap3-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LngLat } from "@yandex/ymaps3-types";
import { memo } from "react";

interface MapMarkerProps {
  coords: [number, number] | LngLat;
  color?: string;
  size?: number;
  id?: string;
  Key?: string;
  source?: string;
  zIndex?: number;
}

export const CurrentPositionComponent = memo((props: MapMarkerProps) => {
  return (
    <YMapMarker
      coordinates={props.coords}
      id={props.id}
      key={props.Key}
      source={props.source}
    >
      <FaMapMarkerAlt
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          zIndex: props.zIndex,
        }}
        color={props.color || "green"}
        size={props.size || 32}
      />
    </YMapMarker>
  );
});
