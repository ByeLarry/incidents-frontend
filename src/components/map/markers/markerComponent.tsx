import { YMapMarker } from "ymap3-components";
import { FaMapMarker } from "react-icons/fa";
import { LngLat } from "@yandex/ymaps3-types";
import { useState } from "react";
import "./markers.scss";
import { MarksService } from "../../../services/marks.service";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";
import { MarkRecvDto } from "../../../dto/mark-recv.dto";
import { timeAgo } from "../../../utils/timeAgo";
import { IncidentCategoryLabel } from "../../ui/incident-category-label/incident-category-label";
import { ButtonComponent } from "../../ui/button/button";
import { observer } from "mobx-react-lite";
import userStore from "../../../stores/user.store";
import csrfStore from "../../../stores/csrf.store";
import { Spiner } from "../../ui/spiner/spiner";
import { VerifyMarkDto } from "../../../dto/verify-mark.dto";
import { MarkDto } from "../../../dto/mark.dto";
import { formatDistance } from "../../../utils/formatDistance";
import { TooltipComponent } from "../../ui/tooltip/tooltip";
import { PiFileTextThin } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { CiCircleCheck } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { VerifiedCountDto } from "../../../dto/verified-count.dto";
import { GeoService } from "../../../services/geo.service";

interface MapMarkerProps {
  coords: [number, number] | LngLat;
  color?: string;
  size?: number;
  id?: string;
  Key?: string;
  source?: string;
  markId?: string;
  properties?: Record<string, unknown>;
}

export const MarkerComponent = observer((props: MapMarkerProps) => {
  const [popupState, setPopupState] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittingVerify, setSubmittingVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationCount, setVerificationCount] = useState(0);
  const [markData, setMarkData] = useState<MarkRecvDto | null>(null);
  const [zIndex, setZIndex] = useState(100);
  const { user, isEmptyUser } = userStore;
  const { csrf } = csrfStore;

  const onClickHandler = async () => {
    if (popupState) {
      setPopupState(false);
      setZIndex(100);
      return;
    }
    setPopupState(true);
    setZIndex(200);
    try {
      const currentCoords = await GeoService.getCurrentLocation();
      setSubmitting(true);
      const data: MarkDto = {
        markId: props.markId as string,
        userId: user?._id as string,
        lng: currentCoords.latitude,
        lat: currentCoords.longitude,
      };
      const response: AxiosResponse<MarkRecvDto> = await MarksService.getMark(
        data
      );
      setVerified(response.data.isMyVerify || false);
      setVerificationCount(response.data.verified || 0);
      setMarkData(response.data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 404:
            toast.error("Точка не найдена");
            break;
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          default:
            toast.error("Произошла непредвиденная ошибка");
        }
      }
    }
  };

  const onVerifyHandler = async () => {
    if (isEmptyUser()) {
      toast.error(
        "Подтверждение доступно только зарегистрированным пользователям"
      );
    } else {
      try {
        setSubmittingVerify(true);
        const data: VerifyMarkDto = {
          markId: markData?.id as number,
          userId: user?._id as string,
          csrf_token: csrf,
        };
        let response: AxiosResponse<VerifiedCountDto>;
        if (verified) {
          response = await MarksService.postVerifyFalse(data);
          setVerified(false);
        } else {
          response = await MarksService.postVerifyTrue(data);
          setVerified(true);
        }
        setVerificationCount(response.data.verified);
        setSubmittingVerify(false);
      } catch (error) {
        setSubmittingVerify(false);
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 500:
              toast.error("Произошла серверная ошибка");
              break;
            default:
              toast.error("Произошла непредвиденная ошибка");
          }
        }
      }
    }
  };

  return (
    <YMapMarker
      coordinates={props.coords}
      id={props.id}
      key={props.Key}
      source={props.source}
      zIndex={zIndex}
    >
      <FaMapMarker
        onClick={onClickHandler}
        className={`${
          props.properties
            ? `color-text-${props.properties["color"] as string}`
            : ""
        } ${!popupState ? `fixed` : "fixed-top-left"} `}
        size={props.size || 32}
      />
      {popupState && (
        <div className="popup">
          <button
            className="modal-close"
            aria-label="Close modal"
            onClick={() => {
              setPopupState(false);
              setZIndex(100);
            }}
          >
            <IoMdClose size={32} />
          </button>
          {submitting ? (
            <h4 className="load-title">Загрузка...</h4>
          ) : markData ? (
            <div
              className={`${
                props.properties
                  ? `popup-content backlight-${
                      props.properties["color"] as string
                    }`
                  : "popup-content"
              } `}
            >
              <IncidentCategoryLabel
                id={markData?.category.id as number}
                name={markData?.category.name as string}
                color={markData?.category.color as string}
              />
              <h4 className="popup-title">{markData?.title}</h4>
              <div className="popup-description">
                <TooltipComponent text="Дата создания" visible>
                  <CiCalendarDate size={24} className="popup-icon" />
                </TooltipComponent>
                <p className="popup-text">{timeAgo(markData?.createdAt)}</p>
              </div>
              <div className="popup-description">
                <TooltipComponent visible text="Подтверждений">
                  <CiCircleCheck size={24} className="popup-icon" />
                </TooltipComponent>
                <p className="popup-text">{verificationCount}</p>
              </div>
              <div className="popup-description">
                <TooltipComponent visible text="Расстояние">
                  <GiPathDistance size={24} className="popup-icon" />
                </TooltipComponent>
                <p className="popup-text">
                  {`${formatDistance(markData.distance as number)}`}
                </p>
              </div>
              <div className="popup-description">
                <TooltipComponent visible text="Описание">
                  <PiFileTextThin size={24} className="popup-icon" />
                </TooltipComponent>
                <p className="popup-text">{markData?.description}</p>
              </div>
              <div className="popup-footer">
                <TooltipComponent
                  text="Отменить подтверждение"
                  visible={verified && !isEmptyUser()}
                >
                  <ButtonComponent
                    modalButton
                    type="button"
                    ariaLabel={
                      verified ? "Отменить подтверждение" : "Подтвердить"
                    }
                    onClick={onVerifyHandler}
                    disabled={submittingVerify}
                    verifyed={!verified && !isEmptyUser()}
                    categoryId={markData?.category.id as number}
                    categoryColor={markData?.category.color as string}
                    noHover
                  >
                    {submittingVerify ? (
                      <Spiner lightMode visible size={16} />
                    ) : verified ? (
                      "Отменить"
                    ) : (
                      "Подтверждаю"
                    )}
                  </ButtonComponent>
                </TooltipComponent>
              </div>
            </div>
          ) : (
            <div className="popup-content">
              <h4 className="load-title">Произошла серверная ошибка</h4>
            </div>
          )}
        </div>
      )}
    </YMapMarker>
  );
});
