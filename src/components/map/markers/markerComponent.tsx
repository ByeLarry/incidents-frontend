import { YMapMarker } from "ymap3-components";
import { FaMapMarker } from "react-icons/fa";
import { LngLat } from "@yandex/ymaps3-types";
import { useState } from "react";
import "./markers.scss";
import { MarksService } from "../../../services/marks.service";
import { AxiosError } from "axios";
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
import { colors } from "../../../utils/incidents-colors";
import { TooltipComponent } from "../../ui/tooltip/tooltip";

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
      setSubmitting(true);
      const data: MarkDto = {
        markId: props.markId as string,
        userId: user?._id as string,
      };
      const response = await MarksService.getMark(data);
      setVerified(response.data.isMyVerify);
      setVerificationCount(response.data.verified);
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
        let response;
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
            ? `color-text-${colors[props.properties["categoryId"] as number]}`
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
            <div className="popup-content">
              <div className="popup-header">
                <p className="popup-date">{timeAgo(markData?.createdAt)}</p>
              </div>
              <IncidentCategoryLabel
                id={markData?.category.id as number}
                name={markData?.category.name as string}
              />
              <h4 className="popup-title">{markData?.title}</h4>
              <p className="popup-description">
                Подтвеждений: {verificationCount}
              </p>
              <p className="popup-description">
                От вас:{" "}
                {`${formatDistance(props.properties!["distance"] as number)}`}
              </p>
              <p className="popup-description">
                Описание: {markData?.description}
              </p>

              <div className="popup-footer">
                <TooltipComponent
                  text="Отменить подтверждение"
                  visible={verified && !isEmptyUser()}
                >
                  <ButtonComponent
                    modalButton
                    type="button"
                    ariaLabel="Подтверждаю"
                    onClick={onVerifyHandler}
                    disabled={submittingVerify}
                    verifyed={!verified && !isEmptyUser()}
                    categoryId={markData?.category.id as number}
                  >
                    {submittingVerify ? (
                      <Spiner lightMode visible size={16} />
                    ) : verified ? (
                      "Подтверждаю"
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
