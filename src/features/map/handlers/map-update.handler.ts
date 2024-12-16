import { debounce } from "lodash";
import { MapConsts } from "../../../utils";
import { YMapCamera, YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";
import { IMapState } from "../hooks";

const MAP_UPDATE_DELAY = 25;

interface Props {
  location: YMapLocation;
  camera: YMapCamera;
  setMapState: (state: IMapState) => void;
}

export const onMapUpdateHandler = debounce((obj: Props) => {
  obj.setMapState({
    azimuth: obj.camera.azimuth || MapConsts.INITIAL_AZIMUTH,
    tilt: obj.camera.tilt || MapConsts.INITIAL_TILT,
    center: obj.location.center,
    zoom: obj.location.zoom,
  });
}, MAP_UPDATE_DELAY);
