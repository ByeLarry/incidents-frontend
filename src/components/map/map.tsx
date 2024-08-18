import "../../index.scss";
import {
  YMap,
  YMapComponentsProvider,
  YMapControlButton,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapFeatureDataSource,
  YMapGeolocationControl,
  YMapCustomClusterer,
  YMapLayer,
  YMapListener,
} from "ymap3-components";
import * as YMaps from "@yandex/ymaps3-types";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "./map.module.scss";
import { GeoService } from "../../services/geo.service";
import { CurrentPositionMarkerComponent } from "./markers/markerCurrentPositionComponent";
import { MarkerComponent } from "./markers/markerComponent";
import { Spiner } from "../ui/spiner/spiner";
import { FaCompass } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { MsgEnum } from "../../utils/msg.enum";
import { Feature } from "@yandex/ymaps3-clusterer";
import { SOURCE } from "./cluster";
import { ClusterComponent } from "./markers/clusterComponent";
import { toast } from "sonner";
import { MdOutlinePlace } from "react-icons/md";
import { MarkerCandidateIncidentComponent } from "./markers/markerCandidateIncidentComponent";
import { debounce } from "lodash";
import selectedCategoriesStore from "../../stores/selectedCategories.store";
import { FilterButton } from "./filterButton";
import { useGetMarks } from "../../hooks/useGetMarks.hook";

interface MapProps {
  lightMode: boolean;
  isEmptyUser: boolean;
}

export const MapComponent: React.FC<MapProps> = memo((props: MapProps) => {
  const [currentCoords, setCurrentCoords] = useState<YMaps.LngLat>([0, 0]);
  const lightMode = props.lightMode;
  const [ymap, setYmap] = useState<YMaps.YMap>();
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);
  const [mapAzimuth, setMapAzimuth] = useState(0);
  const [mapTilt, setMapTilt] = useState(0);
  const [mapCenter, setMapCenter] = useState<YMaps.LngLat>([0, 0]);
  const [mapZoom, setMapZoom] = useState(15);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [points, setPoints] = useState<Feature[]>([]);
  const [filteredPoints, setFilteredPoints] = useState<Feature[]>([]);
  const [selectIncidentMode, setSelectIncidentMode] = useState<boolean>(false);
  const marker = useCallback(MarkerWrapped, []);
  const cluster = useCallback(ClusterComponent, []);
  useState<YMaps.LngLat>([0, 0]);
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
    socket.current.on("new-mark", onPointsUpdateHandler);
  }, [onPointsUpdateHandler]);

  useEffect(() => {
    if (!ymap || isMapInitialized) return;
    const fetchCurrentPosition = async () => {
      try {
        const { latitude, longitude } = await GeoService.getCurrentLocation();
        setCurrentCoords([longitude, latitude]);
        setMapCenter([longitude, latitude]);
        setIsMapInitialized(true);
      } catch (error) {
        toast.error(
          "Во время получения текущего местоположения произошла ошибка"
        );
      }
    };
    fetchCurrentPosition();
  }, [isMapInitialized, ymap]);

  const onResetCamera = useCallback(() => {
    if (ymap) {
      ymap.update({
        camera: {
          tilt: ymap.tilt,
          azimuth:
            ymap.azimuth < (180 * Math.PI) / 180
              ? (0 * Math.PI) / 180
              : (360 * Math.PI) / 180,
          duration: 350,
        },
      });
    }
  }, [ymap]);

  const onMapUpdateHandler: YMaps.MapEventUpdateHandler = debounce((obj) => {
    setMapCenter(obj.location.center);
    setMapZoom(obj.location.zoom);
    setMapTilt(obj.camera.tilt || 0);
    setMapAzimuth(obj.camera.azimuth || 0);
  }, 100);

  const onGeolocatePositionHandler = (position: YMaps.LngLat) => {
    setCurrentCoords(position);
    setMapCenter(position);
    setMapZoom(ymap?.zoom || 15);
    setMapTilt(0);
    setMapAzimuth(0);
  };

  const onSpawnMarkerControlClick = () => {
    if (!selectIncidentMode) {
      setMapCenter(currentCoords);
      setMapAzimuth(0);
      setMapTilt(0);
    }
    setSelectIncidentMode(!selectIncidentMode);
    setCandidateIncidentVisible(!candidateIncidentVisible);
  };

  return (
    <>
      <Spiner
        visible={isLoadingMap || isFetchingGetMarks || isLoadingGetMarks}
        fixed
        zIndex={2000}
        lightMode={lightMode}
        size={100}
      />
      <div className={styles.map__wrapper}>
        <YMapComponentsProvider
          apiKey={`${import.meta.env.VITE_YMAP_API_KEY}`}
          lang="ru_RU"
          onLoad={() => {
            setIsLoadingMap(false);
          }}
        >
          <YMap
            behaviors={
              !selectIncidentMode
                ? [
                    "pinchZoom",
                    "drag",
                    "pinchRotate",
                    "panTilt",
                    "mouseTilt",
                    "scrollZoom",
                    "mouseRotate",
                  ]
                : ["scrollZoom", "drag"]
            }
            camera={{ azimuth: mapAzimuth, tilt: mapTilt }}
            key={lightMode ? "dark-map" : "light-map"}
            ref={(ymap: YMaps.YMap) => {
              setYmap(ymap);
            }}
            location={{ center: mapCenter, zoom: mapZoom }}
            mode="vector"
            theme={!lightMode ? "dark" : "light"}
          >
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer visible={false} />
            <YMapFeatureDataSource id={SOURCE} />
            <YMapLayer source={SOURCE} type="markers" zIndex={1800} />
            <YMapCustomClusterer
              marker={marker}
              cluster={cluster}
              features={filteredPoints}
              gridSize={16}
            />
            <YMapListener onUpdate={onMapUpdateHandler} />
            <MarkerCandidateIncidentComponent
              coords={currentCoords}
              visible={candidateIncidentVisible}
              source={SOURCE}
              draggable
              mapFollowsOnDrag
              color="coral"
              callback={onSpawnMarkerControlClick}
            />
            <CurrentPositionMarkerComponent
              coords={currentCoords}
              color="green"
              source={SOURCE}
            />
            <YMapControls position="top">
              {selectIncidentMode && (
                <YMapControlButton onClick={onSpawnMarkerControlClick}>
                  Выйти из режима выбора
                </YMapControlButton>
              )}
              {!selectIncidentMode && (
                <YMapControls position="top left" orientation="vertical">
                  <FilterButton
                    points={points}
                    setFilteredPoints={setFilteredPoints}
                  />
                </YMapControls>
              )}
            </YMapControls>
            {!selectIncidentMode && (
              <YMapControls position="top right" orientation="vertical">
                <YMapGeolocationControl
                  onGeolocatePosition={onGeolocatePositionHandler}
                  duration={0}
                />
                <YMapControlButton onClick={onResetCamera}>
                  <FaCompass size={24} />
                </YMapControlButton>
                {!props.isEmptyUser && (
                  <YMapControlButton onClick={onSpawnMarkerControlClick}>
                    <MdOutlinePlace size={24} />
                  </YMapControlButton>
                )}
              </YMapControls>
            )}
          </YMap>
        </YMapComponentsProvider>
      </div>
    </>
  );
});

const MarkerWrapped = (feature: Feature) => {
  return (
    <>
      <MarkerComponent
        markId={feature.id}
        key={feature.id}
        coords={feature.geometry.coordinates}
        source={SOURCE}
        properties={feature.properties}
      />
    </>
  );
};
