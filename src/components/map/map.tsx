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
import { memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "./map.module.scss";
import { GeoServiceFromBrowser } from "../../services/geo.service";
import { CurrentPositionMarkerComponent } from "./markers/markerCurrentPositionComponent";
import { Spiner } from "../ui/spiner/spiner";
import { io, Socket } from "socket.io-client";
import { MsgEnum } from "../../utils/msg.enum";
import { Feature } from "@yandex/ymaps3-clusterer";
import { ClusterComponent } from "./markers/clusterComponent";
import { toast } from "sonner";
import { MarkerCandidateIncidentComponent } from "./markers/markerCandidateIncidentComponent";
import { debounce } from "lodash";
import selectedCategoriesStore from "../../stores/selectedCategories.store";
import { useGetMarks } from "../../hooks/useGetMarks.hook";
import { WrappedMarker } from "./wrappedMarker";
import { MapControls } from "./mapControls";
import { MapConsts } from "./mapConsts";
import {
  LngLat,
  YMap as YMapType,
  MapEventUpdateHandler,
} from "@yandex/ymaps3-types";
import { XXXLARGE_SIZE_MARKER } from "../../utils/markerSizes";

interface MapProps {
  lightMode: boolean;
  isEmptyUser: boolean;
}

const MAP_UPDATE_DELAY = 100;
const SPINER_Z_INDEX = 2000;

export const MapComponent: React.FC<MapProps> = memo((props: MapProps) => {
  const [currentCoords, setCurrentCoords] = useState<LngLat>(
    MapConsts.INITIAL_CENTER
  );
  const lightMode = props.lightMode;
  const [ymap, setYmap] = useState<YMapType>();
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);
  const [mapAzimuth, setMapAzimuth] = useState<number>(
    MapConsts.INITIAL_AZIMUTH
  );
  const [mapTilt, setMapTilt] = useState<number>(MapConsts.INITIAL_TILT);
  const [mapCenter, setMapCenter] = useState<LngLat>(MapConsts.INITIAL_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(MapConsts.INITIAL_ZOOM);
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);
  const [points, setPoints] = useState<Feature[]>([]);
  const [filteredPoints, setFilteredPoints] = useState<Feature[]>([]);
  const [selectIncidentMode, setSelectIncidentMode] = useState<boolean>(false);
  const marker = useCallback(WrappedMarker, []);
  const cluster = useCallback(ClusterComponent, []);
  useState<LngLat>(MapConsts.INITIAL_CENTER);
  const [candidateIncidentVisible, setCandidateIncidentVisible] =
    useState<boolean>(false);
  const socket = useRef<Socket | null>(null);
  const { marks, isLoadingGetMarks, isFetchingGetMarks, isSuccessGetMarks } =
    useGetMarks({
      lng: currentCoords[0],
      lat: currentCoords[1],
    });

  useEffect(() => {
    if (isSuccessGetMarks && marks) {
      setPoints(marks);
      setFilteredPoints(marks);
    }
  }, [marks, isSuccessGetMarks]);

  const onPointsUpdateHandler = useCallback((newFeature: Feature) => {
    setPoints((prev) => [...prev, newFeature]);
    if (
      selectedCategoriesStore.selectedCategories.includes(
        newFeature.properties?.categoryId as number
      )
    )
      setFilteredPoints((prev) => [...prev, newFeature]);
  }, []);

  useEffect(() => {
    if (socket.current) return;
    socket.current = io(import.meta.env.VITE_SOCKET_CONNECT, {
      reconnection: false,
    });
    socket.current.on(MsgEnum.CONNECT, () => {
      console.log("Web socket connected");
    });
    socket.current.on(MsgEnum.DISCONNECT, () => {
      console.log("Web socket disconnected");
    });
    socket.current.on(MsgEnum.NEW_MARK, onPointsUpdateHandler);
  }, [onPointsUpdateHandler]);

  useEffect(() => {
    if (!ymap || isMapInitialized) return;
    const fetchCurrentPosition = async () => {
      try {
        const { lat, lng } = await GeoServiceFromBrowser.getCurrentLocation();
        setCurrentCoords([lng, lat]);
        setMapCenter([lng, lat]);
        setIsMapInitialized(true);
      } catch (error) {
        toast.error(
          "Во время получения текущего местоположения произошла ошибка"
        );
      }
    };
    fetchCurrentPosition();
  }, [isMapInitialized, ymap]);

  const onMapUpdateHandler: MapEventUpdateHandler = debounce((obj) => {
    setMapCenter(obj.location.center);
    setMapZoom(obj.location.zoom);
    setMapTilt(obj.camera.tilt || MapConsts.INITIAL_TILT);
    setMapAzimuth(obj.camera.azimuth || MapConsts.INITIAL_AZIMUTH);
  }, MAP_UPDATE_DELAY);

  const onSpawnMarkerControlClick = () => {
    if (!selectIncidentMode) {
      setMapCenter(currentCoords);
      setMapAzimuth(MapConsts.INITIAL_AZIMUTH);
      setMapTilt(MapConsts.INITIAL_TILT);
    }
    setSelectIncidentMode(!selectIncidentMode);
    setCandidateIncidentVisible(!candidateIncidentVisible);
  };

  return (
    <>
      <Spiner
        visible={isLoadingMap || isFetchingGetMarks || isLoadingGetMarks}
        fixed
        zIndex={SPINER_Z_INDEX}
        lightMode={lightMode}
        size={XXXLARGE_SIZE_MARKER}
      />
      <div className={styles.map__wrapper}>
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
            camera={{ azimuth: mapAzimuth, tilt: mapTilt }}
            key={lightMode ? "dark-map" : "light-map"}
            ref={(ymap: YMapType) => {
              setYmap(ymap);
            }}
            location={{ center: mapCenter, zoom: mapZoom }}
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
            <YMapListener onUpdate={onMapUpdateHandler} />
            <MarkerCandidateIncidentComponent
              coords={currentCoords}
              visible={candidateIncidentVisible}
              source={MapConsts.BASIC_MAP_SOURCE}
              draggable
              mapFollowsOnDrag
              color="coral"
              callback={onSpawnMarkerControlClick}
            />
            <CurrentPositionMarkerComponent
              coords={currentCoords}
              color="green"
              source={MapConsts.BASIC_MAP_SOURCE}
            />
            <MapControls
              selectIncidentMode={selectIncidentMode}
              candidateIncidentVisible={candidateIncidentVisible}
              currentCoords={currentCoords}
              setCurrentCoords={setCurrentCoords}
              setMapCenter={setMapCenter}
              setMapAzimuth={setMapAzimuth}
              setMapTilt={setMapTilt}
              setMapZoom={setMapZoom}
              setSelectIncidentMode={setSelectIncidentMode}
              setCandidateIncidentVisible={setCandidateIncidentVisible}
              points={points}
              setFilteredPoints={setFilteredPoints}
              ymap={ymap}
              isEmptyUser={props.isEmptyUser}
            />
          </YMap>
        </YMapComponentsProvider>
      </div>
    </>
  );
});
