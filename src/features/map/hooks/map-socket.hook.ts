import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { MsgEnum } from "../../../enums";
import { Feature } from "@yandex/ymaps3-clusterer";
import selectedCategoriesStore from "../../../stores/selected-categories.store";

interface Props {
  setPoints: React.Dispatch<React.SetStateAction<Feature[]>>;
  setFilteredPoints: React.Dispatch<React.SetStateAction<Feature[]>>;
  points: Feature[];
  filteredPoints: Feature[];
}

export const useMapSocketConnection = (props: Props) => {
  const socket = useRef<Socket | null>(null);

  const onPointsUpdateHandler = useCallback(
    (newFeature: Feature) => {
      props.setPoints((prev) => [...prev, newFeature]);
      if (
        selectedCategoriesStore.selectedCategories.includes(
          newFeature.properties?.categoryId as number
        )
      )
        props.setFilteredPoints((prev) => [...prev, newFeature]);
    },
    [props]
  );

  const onDeletePointHandler = useCallback(
    (deletedFeature: Feature) => {
      console.log(`Feature with id ${deletedFeature.id} was deleted`);

      props.setPoints((prevPoints) => {
        const index = prevPoints.findIndex(
          (point) => point.id === deletedFeature.id
        );
        if (index !== -1) {
          return [
            ...prevPoints.slice(0, index),
            ...prevPoints.slice(index + 1),
          ];
        }
        return prevPoints;
      });

      props.setFilteredPoints((prevFilteredPoints) => {
        const filteredIndex = prevFilteredPoints.findIndex(
          (point) => point.id === deletedFeature.id
        );
        if (filteredIndex !== -1) {
          return [
            ...prevFilteredPoints.slice(0, filteredIndex),
            ...prevFilteredPoints.slice(filteredIndex + 1),
          ];
        }
        return prevFilteredPoints;
      });
    },
    [props]
  );

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
    socket.current.on(MsgEnum.DELETE_MARK, onDeletePointHandler);
  }, [onDeletePointHandler, onPointsUpdateHandler, socket]);

  return {
    socket,
  };
};
