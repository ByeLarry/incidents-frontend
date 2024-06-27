import { YMapMarker } from "ymap3-components";
import { MapMarkerProps } from "../../../propses/MapMarkerProps";
import { FaMapMarker } from "react-icons/fa";
export const MapMarker = (props: MapMarkerProps) => {
  return (
    <YMapMarker coordinates={props.coords} id={props.id} key={props.Key}>
      <FaMapMarker
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
        color={props.color || "red"}
        size={props.size || 32}
      />
    </YMapMarker>
  );
};
