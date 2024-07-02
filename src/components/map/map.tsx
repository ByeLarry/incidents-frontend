/* eslint-disable @typescript-eslint/no-unused-vars */
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
  YMapLayer,
  YMapListener,
} from "ymap3-components";
import * as YMaps from "@yandex/ymaps3-types";
import { useCallback, useEffect, useState } from "react";
import { CustomMapSchemaLayer } from "./custom-map-shcema-layer/customMapSchemaLayer";
import styles from "./map.module.scss";
import { GeoService } from "../../services/geo.service";
import { MapMarkerAlt } from "./markers/marker-al";
import { MapMarker } from "./markers/marker";
import { Spiner } from "../ui/spiner/spiner";
import { FaCompass } from "react-icons/fa";

interface MapProps {
  lightMode: boolean;
}

const SOURCE = "source";
export const MapComponent: React.FC<MapProps> = (props: MapProps) => {
  const onUpdate: YMaps.MapEventUpdateHandler = useCallback((object) => {
    // console.log("[onUpdate]: ", object);
  }, []);
  const [coords, setCoords] = useState<YMaps.LngLat>([0, 0]);
  const lightMode = props.lightMode;
  const [ymap, setYmap] = useState<YMaps.YMap>();
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);
  const [mapAzimuth, setMapAzimuth] = useState(0);
  const [mapTilt, setMapTilt] = useState(0);
  const [mapCenter, setMapCenter] = useState<YMaps.LngLat>([0, 0]);
  const [mapZoom, setMapZoom] = useState(15);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

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
    console.log("[map.useEffect]: ");
    if (!ymap || isMapInitialized) return;

    const fetchData = async () => {
      try {
        const { latitude, longitude } = await GeoService.getCurrentLocation();
        // console.log("[getCurrentLocationFromBrowserAPI]: ", [latitude, longitude]);
        setCoords([longitude, latitude]);
        setMapCenter([longitude, latitude]);
        setIsMapInitialized(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isMapInitialized, ymap]);

  const onResetCamera = useCallback(() => {
    if (ymap) {
      ymap.update({ camera: { tilt: ymap.tilt, azimuth: 0, duration: 250 } });
    }
  }, [ymap]);

  const onGeolocatePositionHandler = useCallback(
    (position: YMaps.LngLat) => {
      if (!ymap) {
        return;
      }
      ymap.update({
        camera: { tilt: ymap.tilt, azimuth: ymap.azimuth, duration: 250 },
        location: { center: position, zoom: ymap.zoom },
      });
      setCoords(position);
      setMapCenter(position);
      setMapZoom(ymap.zoom);
      // console.log(`[onGeolocatePositionFromControl]: ${position}`);
    },
    [ymap]
  );

  return (
    <>
      <Spiner
        visible={isLoadingMap}
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

            <YMapListener onUpdate={onUpdate} />
            <YMapDefaultMarker coordinates={[0.25, 0.25]} source={SOURCE} />

            <MapMarkerAlt coords={coords} color="green" source={SOURCE} />
            <MapMarker coords={[0, 0]} color="red" />
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
};
