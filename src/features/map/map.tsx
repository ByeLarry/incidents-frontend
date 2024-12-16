import "../../index.scss";
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapFeatureDataSource,
  YMapCustomClusterer,
  YMapLayer,
  YMapListener,
} from "ymap3-components";
import styles from "./map.module.scss";
import { CurrentPositionComponent } from "./markers/current-position-component";
import { CreationComponent } from "./markers/creation-component";
import { YMap as YMapType } from "@yandex/ymaps3-types";
import { observer } from "mobx-react-lite";
import { MapConsts, XXXLARGE_SIZE_MARKER } from "../../utils";
import { Spinner } from "../../components/ui/spinner/spinner";
import { ErrorStub } from "../../components/ui/error-stub/error-stub";
import { useMapSocketConnection, useMapState } from "./hooks";
import { onMapUpdateHandler } from "./handlers/map-update.handler";
import { MapControls } from "./controls/map-controls";

interface MapProps {
  lightMode: boolean;
  isEmptyUser: boolean;
}

const SPINNER_Z_INDEX = 2000;

export const MapComponent: React.FC<MapProps> = observer((props: MapProps) => {
  const {
    currentCoords,
    setCurrentCoords,
    lightMode,
    ymap,
    setYmap,
    isLoadingMap,
    setIsLoadingMap,
    mapState,
    setMapState,
    mapLoadingFailed,
    points,
    filteredPoints,
    setFilteredPoints,
    selectIncidentMode,
    setSelectIncidentMode,
    marker,
    cluster,
    setPoints,
    candidateIncidentVisible,
    setCandidateIncidentVisible,
    isLoadingGetMarks,
    isFetchingGetMarks,
  } = useMapState({ lightMode: props.lightMode });

  useMapSocketConnection({
    filteredPoints,
    points,
    setPoints,
    setFilteredPoints,
  });

  return (
    <>
      <Spinner
        visible={isLoadingMap || isFetchingGetMarks || isLoadingGetMarks}
        fixed
        zIndex={SPINNER_Z_INDEX}
        lightMode={lightMode}
        size={XXXLARGE_SIZE_MARKER}
      />
      {!mapLoadingFailed ? (
        <section className={styles.map__wrapper}>
          <YMapComponentsProvider
            apiKey={`${import.meta.env.VITE_YMAP_API_KEY}`}
            lang={MapConsts.LANG}
            onLoad={() => {
              setIsLoadingMap(false);
            }}
          >
            <YMap
              behaviors={
                !selectIncidentMode
                  ? MapConsts.BASIC_MAP_BEHAVIORS
                  : MapConsts.SELECT_INCIDENT_MODE_BEHAVIORS
              }
              camera={{ azimuth: mapState.azimuth, tilt: mapState.tilt }}
              key={lightMode ? "dark-map" : "light-map"}
              ref={(ymap: YMapType) => {
                setYmap(ymap);
              }}
              location={{ center: mapState.center, zoom: mapState.zoom }}
              mode={MapConsts.MAP_MODE}
              theme={!lightMode ? "dark" : "light"}
            >
              <YMapDefaultSchemeLayer />
              <YMapDefaultFeaturesLayer visible={false} />
              <YMapFeatureDataSource id={MapConsts.BASIC_MAP_SOURCE} />
              <YMapLayer
                source={MapConsts.BASIC_MAP_SOURCE}
                type={MapConsts.MAP_LAYER_TYPE}
                zIndex={MapConsts.MAP_LAYER_Z_INDEX}
              />
              <YMapCustomClusterer
                marker={marker}
                cluster={cluster}
                features={filteredPoints}
                gridSize={MapConsts.CLUSTER_GRID_SIZE}
              />
              <YMapListener
                onUpdate={(obj) => {
                  onMapUpdateHandler({
                    location: obj.location,
                    camera: obj.camera,
                    setMapState,
                  });
                }}
              />
              <CreationComponent
                coords={currentCoords}
                visible={candidateIncidentVisible}
                source={MapConsts.BASIC_MAP_SOURCE}
                draggable
                mapFollowsOnDrag
                color="coral"
              />
              <CurrentPositionComponent
                coords={currentCoords}
                color="green"
                source={MapConsts.BASIC_MAP_SOURCE}
              />
              <MapControls
                selectIncidentMode={selectIncidentMode}
                candidateIncidentVisible={candidateIncidentVisible}
                currentCoords={currentCoords}
                setCurrentCoords={setCurrentCoords}
                setMapState={setMapState}
                setSelectIncidentMode={setSelectIncidentMode}
                setCandidateIncidentVisible={setCandidateIncidentVisible}
                points={points}
                setFilteredPoints={setFilteredPoints}
                ymap={ymap}
                isEmptyUser={props.isEmptyUser}
              />
            </YMap>
          </YMapComponentsProvider>
        </section>
      ) : (
        <ErrorStub />
      )}
    </>
  );
});
