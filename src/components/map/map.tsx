import "../../index.scss";
import {
  YMap,
  YMapComponentsProvider,
  YMapControlButton,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultMarker,
  YMapDefaultSchemeLayer,
  YMapFeatureDataSource,
  YMapGeolocationControl,
  YMapCustomClusterer,
  YMapLayer,
} from "ymap3-components";
import * as YMaps from "@yandex/ymaps3-types";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { CustomMapSchemaLayer } from "./custom-map-shcema-layer/customMapSchemaLayer";
import styles from "./map.module.scss";
import { GeoService } from "../../services/geo.service";
import { CurrentPositionMarkerComponent } from "./markers/markerCurrentPositionComponent";
import { MarkerComponent } from "./markers/markerComponent";
import { Spiner } from "../ui/spiner/spiner";
import { FaCompass } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { CoordsDto } from "../../dto/coords.dto";
import { MsgEnum } from "../../utils/msg.enum";
import { Feature } from "@yandex/ymaps3-clusterer";
import { SOURCE } from "./cluster";
import { ClusterComponent } from "./markers/clusterComponent";
import { MarksService } from "../../services/marks.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
interface MapProps {
  lightMode: boolean;
}

export const MapComponent: React.FC<MapProps> = memo((props: MapProps) => {
  // const onUpdate: YMaps.MapEventUpdateHandler = useCallback((object) => {
  //    console.log("[onUpdate]: ", object);
  // }, []);
  const [coords, setCoords] = useState<YMaps.LngLat>([0, 0]);
  const lightMode = props.lightMode;
  const [ymap, setYmap] = useState<YMaps.YMap>();
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);
  const [mapAzimuth, setMapAzimuth] = useState(0);
  const [mapTilt, setMapTilt] = useState(0);
  const [mapCenter, setMapCenter] = useState<YMaps.LngLat>([0, 0]);
  const [mapZoom, setMapZoom] = useState(15);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [points, setPoints] = useState<Feature[]>([]);
  const marker = useCallback(MarkerWrapped, []);
  const cluster = useCallback(ClusterComponent, []);
  const [submitting, setSubmitting] = useState(false);

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (ymap) {
      setMapAzimuth(ymap.azimuth);
      setMapTilt(ymap.tilt);
      const temp = [...ymap.center] as [number, number];
      setMapCenter(temp);
      setMapZoom(ymap.zoom);
    }
  }, [lightMode, ymap]);

  useEffect(() => {
    if (!ymap || isMapInitialized) return;

    const fetchMarks = async (data: CoordsDto) => {
      try {
        setSubmitting(true);
        const response = await MarksService.getMarks(data);
        setPoints(response.data);
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 404:
              toast.error("Точки не найдены");
              break;
            case 500:
              toast.error("Сервис данных не работает");
              break;
            default:
              toast.error("Во время получения точек произошла ошибка");
          }
        }
      }
    };

    const fetchCurrentPosition = async () => {
      try {
        const { latitude, longitude } = await GeoService.getCurrentLocation();
        setCoords([longitude, latitude]);
        setMapCenter([longitude, latitude]);
        const coords: CoordsDto = { lat: latitude, lng: longitude };
        fetchMarks(coords);
        setIsMapInitialized(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentPosition();
  }, [coords, isMapInitialized, ymap]);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_CONNECT, {
      reconnection: false,
    });
    socket.current.on(MsgEnum.CONNECT, () => {
      console.log("connected");
    });
    socket.current.on(MsgEnum.DISCONNECT, () => {
      console.log("disconnected");
    });
  }, [coords]);

  const onResetCamera = useCallback(() => {
    if (ymap) {
      ymap.update({
        camera: {
          tilt: ymap.tilt,
          azimuth:
            ymap.azimuth < (180 * Math.PI) / 180
              ? (0 * Math.PI) / 180
              : (360 * Math.PI) / 180,
          duration: 250,
        },
      });
    }
  }, [ymap]);

  const onGeolocatePositionHandler = useCallback(
    (position: YMaps.LngLat) => {
      if (!ymap) {
        return;
      }
      ymap.update({
        camera: {
          tilt: ymap.tilt,
          azimuth:
            ymap.azimuth > (180 * Math.PI) / 180
              ? ymap.azimuth - (360 * Math.PI) / 180
              : ymap.azimuth,
          duration: 350,
        },
        location: { center: position, zoom: ymap.zoom },
      });
      setCoords(position);
      setMapCenter(position);
      setMapZoom(ymap.zoom);
    },
    [ymap]
  );

  return (
    <>
      <Spiner
        visible={isLoadingMap || submitting}
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
            behaviors={[
              "mouseRotate",
              "pinchZoom",
              "drag",
              "pinchRotate",
              "panTilt",
              "mouseTilt",
              "scrollZoom",
              "dblClick",
            ]}
            camera={{ azimuth: mapAzimuth, tilt: mapTilt }}
            key={lightMode ? "dark-map" : "light-map"}
            ref={(ymap: YMaps.YMap) => {
              setYmap(ymap);
            }}
            location={{ center: mapCenter, zoom: mapZoom }}
            mode="vector"
            theme={!lightMode ? "dark" : "light"}
          >
            {!lightMode && <CustomMapSchemaLayer />}
            {lightMode && <YMapDefaultSchemeLayer />}
            <YMapDefaultFeaturesLayer visible={false} />
            <YMapFeatureDataSource id={SOURCE} />
            <YMapLayer source={SOURCE} type="markers" zIndex={1800} />
            <YMapCustomClusterer
              marker={marker}
              cluster={cluster}
              features={points}
              gridSize={64}
            />
            {/* <YMapListener onUpdate={onUpdate} /> */}
            <YMapDefaultMarker coordinates={[0.25, 0.25]} source={SOURCE} />
            <CurrentPositionMarkerComponent
              coords={coords}
              color="green"
              source={SOURCE}
            />
            <MarkerComponent source={SOURCE} coords={[0, 0]} color="red" />
            <YMapControls position="top right" orientation="vertical">
              <YMapGeolocationControl
                onGeolocatePosition={onGeolocatePositionHandler}
                duration={0}
              />
              <YMapControlButton onClick={onResetCamera}>
                <FaCompass size={24} />
              </YMapControlButton>
            </YMapControls>
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
