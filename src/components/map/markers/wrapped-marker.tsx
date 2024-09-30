import { Feature } from "@yandex/ymaps3-clusterer";
import { MarkerComponent } from "./marker-component";
import { MapConsts } from "../../../libs/utils/map-consts.util";

export const WrappedMarker = (feature: Feature) => {
  return (
    <>
      <MarkerComponent
        markId={feature.id}
        key={feature.id}
        coords={feature.geometry.coordinates}
        source={MapConsts.BASIC_MAP_SOURCE}
        properties={feature.properties}
      />
    </>
  );
};
