import {
  YMapControl,
  YMapControlButton,
  YMapControls,
  YMapGeolocationControl,
} from "ymap3-components";
import { LngLat, YMap } from "@yandex/ymaps3-types";
import { Feature } from "@yandex/ymaps3-clusterer";
import { FaCompass } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { FilterButton } from "./filter-button/filter-button";
import { Search } from "./search/search";
import searchModeStore from "../../../stores/search-mode.store";
import { observer } from "mobx-react-lite";
import { MapConsts, MEDIUM_SIZE_MARKER } from "../../../utils";
import { IMapState, useControlsState } from "../hooks";

interface Props {
  selectIncidentMode: boolean;
  candidateIncidentVisible: boolean;
  currentCoords: LngLat;
  setCurrentCoords: (value: React.SetStateAction<LngLat>) => void;
  setMapState: (value: React.SetStateAction<IMapState>) => void;
  setSelectIncidentMode: (value: React.SetStateAction<boolean>) => void;
  setCandidateIncidentVisible: (value: React.SetStateAction<boolean>) => void;
  points: Feature[];
  setFilteredPoints: (value: React.SetStateAction<Feature[]>) => void;
  ymap?: YMap;
  isEmptyUser: boolean;
}

export const MapControls: React.FC<Props> = observer((props: Props) => {
  const {
    onSpawnMarkerControlClick,
    onGeolocatePositionHandler,
    onResetCamera,
  } = useControlsState({
    selectIncidentMode: props.selectIncidentMode,
    candidateIncidentVisible: props.candidateIncidentVisible,
    currentCoords: props.currentCoords,
    setMapState: props.setMapState,
    setSelectIncidentMode: props.setSelectIncidentMode,
    setCandidateIncidentVisible: props.setCandidateIncidentVisible,
    setCurrentCoords: props.setCurrentCoords,
    ymap: props.ymap,
  });

  return (
    <>
      <YMapControls position="top">
        {props.selectIncidentMode && (
          <YMapControlButton onClick={onSpawnMarkerControlClick}>
            Выйти из режима фиксации происшествий
          </YMapControlButton>
        )}
        {!props.selectIncidentMode && !searchModeStore.get() && (
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
        <>
          <YMapControls position="top">
            <YMapControl>
              <Search />
            </YMapControl>
          </YMapControls>

          {!searchModeStore.get() && (
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
                  <MdOutlinePlace
                    title="Режим выбора"
                    size={MEDIUM_SIZE_MARKER}
                  />
                </YMapControlButton>
              )}
            </YMapControls>
          )}
        </>
      )}
    </>
  );
});
