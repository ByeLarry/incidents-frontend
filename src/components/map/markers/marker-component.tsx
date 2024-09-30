import { YMapMarker } from "ymap3-components";
import { FaMapMarker } from "react-icons/fa";
import { LngLat } from "@yandex/ymaps3-types";
import { useEffect, useState } from "react";
import "./markers.scss";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";
import { MarkRecvDto } from "../../../libs/dto/mark-recv.dto";
import { timeAgo } from "../../../libs/utils/time-ago.util";
import { IncidentCategoryLabel } from "../../ui/incident-category-label/incident-category-label";
import { ButtonComponent } from "../../ui/button/button";
import { observer } from "mobx-react-lite";
import userStore from "../../../stores/user.store";
import { Spiner } from "../../ui/spiner/spiner";
import { VerifyMarkDto } from "../../../libs/dto/verify-mark.dto";
import { formatDistance } from "../../../libs/helpers/format-distance";
import { TooltipComponent } from "../../ui/tooltip/tooltip";
import { PiFileTextThin } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { CiCircleCheck } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { GeoServiceFromBrowser } from "../../../libs/services/geo.service";
import { useGetMark } from "../../../libs/hooks/get-mark.hook";
import { useVerify } from "../../../libs/hooks/verify.hook";
import { useUnverify } from "../../../libs/hooks/unverify.hook";
import { CoordsDto } from "../../../libs/dto/coords.dto";
import {
  LARGE_SIZE_MARKER,
  MEDIUM_SIZE_MARKER,
  SMALL_SIZE_MARKER,
} from "../../../libs/utils/marker-sizes.util";

interface MapMarkerProps {
  coords: [number, number] | LngLat;
  source: string;
  markId: string;
  properties?: Record<string, unknown>;
}

export const MarkerComponent = observer((props: MapMarkerProps) => {
  const [popupState, setPopupState] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationCount, setVerificationCount] = useState(0);
  const [markData, setMarkData] = useState<MarkRecvDto | null>(null);
  const [zIndex, setZIndex] = useState(100);
  const { user, isEmptyUser } = userStore;
  const { mutateVerify, isPendingVerify, dataVerify } = useVerify();
  const { mutateUnverify, isPendingUnverify, dataUnverify } = useUnverify();
  const [currentCoords, setCurrentCoords] = useState<CoordsDto>({
    lat: 0,
    lng: 0,
  });

  const getMarkDto = {
    markId: props.markId,
    userId: user?._id as string,
    lat: currentCoords?.lat,
    lng: currentCoords?.lng,
    enabled: popupState,
  };
  const { mark, isFetchingGetMark, isLoadingGetMark } = useGetMark(getMarkDto);
  useEffect(() => {
    if (mark) {
      setVerified(mark.isMyVerify as boolean);
      setVerificationCount(mark.verified as number);
      setMarkData(mark);
    }
  }, [mark]);

  useEffect(() => {
    if (dataVerify) setVerificationCount(dataVerify.data.verified as number);
  }, [dataVerify]);

  useEffect(() => {
    if (dataUnverify)
      setVerificationCount(dataUnverify.data.verified as number);
  }, [dataUnverify]);

  useEffect(() => {
    const getCurrentCoords = async () => {
      const currentCoords = await GeoServiceFromBrowser.getCurrentLocation();
      setCurrentCoords(currentCoords);
    };
    getCurrentCoords();
  }, []);

  const onClickHandler = async () => {
    if (popupState) {
      setPopupState(false);
      setZIndex(100);
      return;
    }
    setPopupState(true);
    setZIndex(200);
  };

  const onVerifyHandler = async () => {
    if (isEmptyUser()) {
      toast.error(
        "Подтверждение доступно только зарегистрированным пользователям"
      );
      return;
    }
    const mark: VerifyMarkDto = {
      markId: markData?.id as number,
      userId: user?._id as string,
    };
    if (verified) {
      mutateUnverify(mark);
      setVerified(false);
    } else {
      mutateVerify(mark);
      setVerified(true);
    }
  };

  return (
    <YMapMarker
      coordinates={props.coords}
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
        size={LARGE_SIZE_MARKER}
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
            <IoMdClose size={LARGE_SIZE_MARKER} />
          </button>
          {isLoadingGetMark || isFetchingGetMark ? (
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
                  <CiCalendarDate
                    size={MEDIUM_SIZE_MARKER}
                    className="popup-icon"
                  />
                </TooltipComponent>
                <p className="popup-text">{timeAgo(markData?.createdAt)}</p>
              </div>
              <div className="popup-description">
                <TooltipComponent visible text="Подтверждений">
                  <CiCircleCheck
                    size={MEDIUM_SIZE_MARKER}
                    className="popup-icon"
                  />
                </TooltipComponent>
                <p className="popup-text">{verificationCount}</p>
              </div>
              <div className="popup-description">
                <TooltipComponent visible text="Расстояние">
                  <GiPathDistance
                    size={MEDIUM_SIZE_MARKER}
                    className="popup-icon"
                  />
                </TooltipComponent>
                <p className="popup-text">
                  {`${formatDistance(markData.distance as number)}`}
                </p>
              </div>
              <div className="popup-description">
                <TooltipComponent visible text="Описание">
                  <PiFileTextThin
                    size={MEDIUM_SIZE_MARKER}
                    className="popup-icon"
                  />
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
                    disabled={isPendingVerify || isPendingUnverify}
                    verifyed={!verified && !isEmptyUser()}
                    categoryId={markData?.category.id as number}
                    categoryColor={markData?.category.color as string}
                    noHover
                  >
                    {isPendingVerify || isPendingUnverify ? (
                      <Spiner lightMode visible size={SMALL_SIZE_MARKER} />
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
