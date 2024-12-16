import { LngLat } from "@yandex/ymaps3-types";
import { useState, useCallback, useEffect } from "react";
import { useGetMarks } from "../../../hooks";
import searchedMarkStore from "../../../stores/searched-mark.store";
import { MapConsts } from "../../../utils";
import { ClusterComponent } from "../markers/cluster-component";
import { IncidentComponentClusterWrapper } from "../markers/incident-cluster-wrapper-component";
import { YMap as YMapType } from "@yandex/ymaps3-types";
import { Feature } from "@yandex/ymaps3-clusterer";
import { toast } from "sonner";
import closeCandidateMarkFormCallbackStore from "../../../stores/close-candidate-mark-form-callback.store";

interface Props {
  lightMode: boolean;
}

export interface IMapState {
  azimuth: number;
  tilt: number;
  center: LngLat;
  zoom: number;
}

const LOADING_MAP_INTERVAL = 5000;
const SEARCHED_MARK_ZOOM = 18;

export const useMapState = (props: Props) => {
  const lightMode = props.lightMode;
  const [currentCoords, setCurrentCoords] = useState<LngLat>(
    MapConsts.INITIAL_CENTER
  );
  const [ymap, setYmap] = useState<YMapType>();
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);
  const [mapLoadingFailed, setMapLoadingFailed] = useState<boolean>(false);
  const [points, setPoints] = useState<Feature[]>([]);
  const [filteredPoints, setFilteredPoints] = useState<Feature[]>([]);
  const [selectIncidentMode, setSelectIncidentMode] = useState<boolean>(false);
  const [candidateIncidentVisible, setCandidateIncidentVisible] =
    useState<boolean>(false);

  const [mapState, setMapState] = useState<IMapState>({
    azimuth: MapConsts.INITIAL_AZIMUTH,
    tilt: MapConsts.INITIAL_TILT,
    center: MapConsts.INITIAL_CENTER,
    zoom: MapConsts.INITIAL_ZOOM,
  });

  const marker = useCallback(IncidentComponentClusterWrapper, []);
  const cluster = useCallback(ClusterComponent, []);

  const { marks, isLoadingGetMarks, isFetchingGetMarks, isSuccessGetMarks } =
    useGetMarks({
      lng: currentCoords[0],
      lat: currentCoords[1],
    });
  const searchedMark = searchedMarkStore.searchedMark;

  useEffect(() => {
    if (isSuccessGetMarks && marks) {
      setPoints(marks);
      setFilteredPoints(marks);
    }
  }, [marks, isSuccessGetMarks]);

  useEffect(() => {
    if (!ymap || isMapInitialized) return;
    const fetchCurrentPosition = async () => {
      try {
        const result = await ymaps3.geolocation.getPosition();
        const lat = result.coords[1];
        const lng = result.coords[0];
        setCurrentCoords([lng, lat]);
        setMapState((prev) => ({ ...prev, center: [lng, lat] }));
        setIsMapInitialized(true);
      } catch (error) {
        toast.error(
          "Во время получения текущего местоположения произошла ошибка"
        );
      }
    };
    fetchCurrentPosition();
  }, [isMapInitialized, setCurrentCoords, setIsMapInitialized, ymap]);

  useEffect(() => {
    closeCandidateMarkFormCallbackStore.changeCallback(() => {
      if (!selectIncidentMode) {
        setMapState((prev) => ({
          ...prev,
          center: currentCoords,
          azimuth: MapConsts.INITIAL_AZIMUTH,
          tilt: MapConsts.INITIAL_TILT,
        }));
      }
      setSelectIncidentMode(!selectIncidentMode);
      setCandidateIncidentVisible(!candidateIncidentVisible);
    });
  }, [
    candidateIncidentVisible,
    currentCoords,
    selectIncidentMode,
    setCandidateIncidentVisible,
    setSelectIncidentMode,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoadingMap) {
        setMapLoadingFailed(true);
        setIsLoadingMap(false);
      }
    }, LOADING_MAP_INTERVAL);
    return () => clearTimeout(timer);
  }, [isLoadingMap, setIsLoadingMap, setMapLoadingFailed]);

  useEffect(() => {
    const coordsOfSearcedMark: LngLat = [
      searchedMark?.lng ?? 0,
      searchedMark?.lat ?? 0,
    ];
    if (coordsOfSearcedMark[0] === 0 && coordsOfSearcedMark[1] === 0) return;
    setMapState((prev) => ({
      tilt: prev.tilt,
      azimuth: prev.azimuth,
      center: coordsOfSearcedMark,
      zoom: SEARCHED_MARK_ZOOM,
    }));
  }, [searchedMark]);

  return {
    currentCoords,
    setCurrentCoords,
    lightMode,
    ymap,
    setYmap,
    isLoadingMap,
    setIsLoadingMap,
    mapState,
    setMapState,
    isMapInitialized,
    setIsMapInitialized,
    mapLoadingFailed,
    setMapLoadingFailed,
    points,
    setPoints,
    filteredPoints,
    setFilteredPoints,
    selectIncidentMode,
    setSelectIncidentMode,
    marker,
    cluster,
    candidateIncidentVisible,
    setCandidateIncidentVisible,
    marks,
    isLoadingGetMarks,
    isFetchingGetMarks,
    isSuccessGetMarks,
    searchedMark,
  };
};
