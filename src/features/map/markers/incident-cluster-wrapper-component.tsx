import { Feature } from "@yandex/ymaps3-clusterer";
import { IncidentComponent } from "./incident-component";
import { MapConsts } from "../../../utils";

export const IncidentComponentClusterWrapper = (feature: Feature) => {
  return (
    <>
      <IncidentComponent
        markId={feature.id}
        key={feature.id}
        coords={feature.geometry.coordinates}
        source={MapConsts.BASIC_MAP_SOURCE}
        properties={feature.properties}
      />
    </>
  );
};
