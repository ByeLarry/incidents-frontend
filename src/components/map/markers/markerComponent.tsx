import { YMapMarker } from "ymap3-components";
import { FaMapMarker } from "react-icons/fa";
import { LngLat } from "@yandex/ymaps3-types";
import { useState } from "react";
import "./markers.scss";
import { Feature } from "@yandex/ymaps3-clusterer";
import { SOURCE } from "../cluster";
import { MarksService } from "../../../services/marks.service";
import { MarkGetDto } from "../../../dto/mark-get.dto";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface MapMarkerProps {
  coords: [number, number] | LngLat;
  color?: string;
  size?: number;
  id?: string;
  Key?: string;
  source?: string;
  markId?: string;
}

export const MarkerComponent = (props: MapMarkerProps) => {
  const [popupState, setPopupState] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const onClickHandler = async () => {
    setPopupState(!popupState);
    try {
      setSubmitting(true);
      const data: MarkGetDto = { id: props.markId as string };
      const response = await MarksService.getMark(data);
      console.log(response);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 404:
            toast.error("Пользователь несуществует");
            break;
          case 401:
            toast.error("Неправильный пароль");
            break;
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          default:
            toast.error(
              error.response?.data.message || "Во время входа произошла ошибка"
            );
        }
      } else {
        toast.error("Произошла непредвиденная ошибка");
      }
    }
  };
  return (
    <YMapMarker
      coordinates={props.coords}
      id={props.id}
      key={props.Key}
      source={props.source}
    >
      <FaMapMarker
        onClick={onClickHandler}
        className={!popupState ? "fixed" : "fixed-top-left"}
        color={props.color || "red"}
        size={props.size || 32}
      />
      {popupState && (
        <div
          style={{
            width: 100,
            height: 300,
            background: "white",
            color: "black",
          }}
        >
          {submitting ? "Загрузка..." : "Загрузка завершена"}
        </div>
      )}
    </YMapMarker>
  );
};

export const MarkerWrapped = (feature: Feature) => {
  return (
    <>
      <MarkerComponent
        markId={feature.id}
        key={feature.id}
        coords={feature.geometry.coordinates}
        source={SOURCE}
      />
    </>
  );
};
