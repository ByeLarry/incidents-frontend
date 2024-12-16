import { LngLat, YMap } from "@yandex/ymaps3-types";
import { useCallback } from "react";
import { MapConsts } from "../../../utils";
import { IMapState } from "./map-state.hook";

interface Props {
  selectIncidentMode: boolean;
  candidateIncidentVisible: boolean;
  currentCoords: LngLat;
  setMapState: (value: React.SetStateAction<IMapState>) => void;
  setSelectIncidentMode: (value: React.SetStateAction<boolean>) => void;
  setCandidateIncidentVisible: (value: React.SetStateAction<boolean>) => void;
  setCurrentCoords: (value: React.SetStateAction<LngLat>) => void;
  ymap?: YMap;
}

export const useControlsState = (props: Props) => {
  const onSpawnMarkerControlClick = useCallback(() => {
    if (!props.selectIncidentMode)
      props.setMapState((prev) => ({
        center: props.currentCoords,
        tilt: MapConsts.INITIAL_TILT,
        azimuth: MapConsts.INITIAL_AZIMUTH,
        zoom: prev.zoom,
      }));

    props.setSelectIncidentMode(!props.selectIncidentMode);
    props.setCandidateIncidentVisible(!props.candidateIncidentVisible);
  }, [props]);

  const onGeolocatePositionHandler = useCallback(
    (position: LngLat) => {
      props.setCurrentCoords(position);
      props.setMapState((prev) => ({
        center: position,
        tilt: prev.tilt,
        azimuth: prev.azimuth,
        zoom: prev.zoom,
      }));
    },
    [props]
  );

  const onResetCamera = useCallback(() => {
    if (props.ymap) {
      props.ymap.update({
        camera: {
          tilt: props.ymap.tilt,
          azimuth:
            props.ymap.azimuth < (180 * Math.PI) / 180
              ? (0 * Math.PI) / 180
              : (360 * Math.PI) / 180,
          duration: MapConsts.RESET_MAP_DURATION,
        },
      });
    }
  }, [props.ymap]);

  return {
    onSpawnMarkerControlClick,
    onGeolocatePositionHandler,
    onResetCamera,
  };
};
