import {
  YMapControlButton,
  YMapControls,
  YMapGeolocationControl,
} from "ymap3-components";
import { LngLat, YMap } from "@yandex/ymaps3-types";
import { Feature } from "@yandex/ymaps3-clusterer";
import { useCallback } from "react";
import { FaCompass } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { MapConsts } from "../../../libs/utils/map-consts.util";
import { MEDIUM_SIZE_MARKER } from "../../../libs/utils";
import { FilterButton } from "../filter-button/filter-button";

interface Props {
  selectIncidentMode: boolean;
  candidateIncidentVisible: boolean;
  currentCoords: LngLat;
  setCurrentCoords: (value: React.SetStateAction<LngLat>) => void;
  setMapCenter: (value: React.SetStateAction<LngLat>) => void;
  setMapAzimuth: (value: React.SetStateAction<number>) => void;
  setMapTilt: (value: React.SetStateAction<number>) => void;
  setMapZoom: (value: React.SetStateAction<number>) => void;
  setSelectIncidentMode: (value: React.SetStateAction<boolean>) => void;
  setCandidateIncidentVisible: (value: React.SetStateAction<boolean>) => void;
  points: Feature[];
  setFilteredPoints: (value: React.SetStateAction<Feature[]>) => void;
  ymap?: YMap;
  isEmptyUser: boolean;
}

export const MapControls: React.FC<Props> = (props: Props) => {
  const onSpawnMarkerControlClick = useCallback(() => {
    if (!props.selectIncidentMode) {
      props.setMapCenter(props.currentCoords);
      props.setMapTilt(MapConsts.INITIAL_TILT);
      props.setMapAzimuth(MapConsts.INITIAL_AZIMUTH);
    }
    props.setSelectIncidentMode(!props.selectIncidentMode);
    props.setCandidateIncidentVisible(!props.candidateIncidentVisible);
  }, [props]);

  const onGeolocatePositionHandler = useCallback(
    (position: LngLat) => {
      props.setCurrentCoords(position);
      props.setMapCenter(position);
      props.setMapTilt(MapConsts.INITIAL_TILT);
      props.setMapAzimuth(MapConsts.INITIAL_AZIMUTH);
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

  return (
    <>
      <YMapControls position="top">
        {props.selectIncidentMode && (
          <YMapControlButton onClick={onSpawnMarkerControlClick}>
            Выйти из режима выбора
          </YMapControlButton>
        )}
        {!props.selectIncidentMode && (
          <YMapControls position="top left" orientation="vertical">
            <FilterButton
              points={props.points}
              setFilteredPoints={props.setFilteredPoints}
              title="Фильтр"
            />
          </YMapControls>
        )}
      </YMapControls>
      {!props.selectIncidentMode && (
        <YMapControls position="top right" orientation="vertical">
          <YMapGeolocationControl
            onGeolocatePosition={onGeolocatePositionHandler}
            duration={MapConsts.GEOLOCATION_CONTROL_DURATION}
          />
          <YMapControlButton onClick={onResetCamera}>
            <FaCompass title="Сброс камеры" size={MEDIUM_SIZE_MARKER} />
          </YMapControlButton>
          {!props.isEmptyUser && (
            <YMapControlButton onClick={onSpawnMarkerControlClick}>
              <MdOutlinePlace title="Режим выбора" size={MEDIUM_SIZE_MARKER} />
            </YMapControlButton>
          )}
        </YMapControls>
      )}
    </>
  );
};
