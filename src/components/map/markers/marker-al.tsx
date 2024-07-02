import { YMapMarker } from "ymap3-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LngLat } from "@yandex/ymaps3-types";

interface MapMarkerProps {
  coords: [number, number] | LngLat;
  color?: string;
  size?: number;
  id?: string;
  Key?: string;
  source?: string;
}

export const MapMarkerAlt = (props: MapMarkerProps) => {
  return (
    <YMapMarker coordinates={props.coords} id={props.id} key={props.Key} source={props.source}>
      <FaMapMarkerAlt
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
        color={props.color || "green"}
        size={props.size || 32}
      />
    </YMapMarker>
  );
};
