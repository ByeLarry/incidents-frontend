import { YMapMarker } from "ymap3-components";
import { FaMapMarker } from "react-icons/fa";
import { LngLat } from "@yandex/ymaps3-types";
import "./styles/markers.scss";
import { IoMdClose } from "react-icons/io";
import { PiCityThin, PiFileTextThin } from "react-icons/pi";
import { observer } from "mobx-react-lite";
import { CiCalendarDate, CiCircleCheck } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { ModalComponent } from "../../../components/modal/modal";
import { DeleteMarkModal } from "../../../components/modals/delete-mark.modal";
import { ButtonComponent } from "../../../components/ui/button/button";
import { IncidentCategoryLabel } from "../../../components/ui/incident-category-label/incident-category-label";
import { Spinner } from "../../../components/ui/spinner/spinner";
import { TooltipComponent } from "../../../components/ui/tooltip/tooltip";

import {
  LARGE_SIZE_MARKER,
  MEDIUM_SIZE_MARKER,
  timeAgo,
  SMALL_SIZE_MARKER,
} from "../../../utils";
import { formatDistance } from "../../../helpers";
import { useIncidentState } from "../hooks";
import {
  onIncidentClickHandler,
  onVerifyOrUnverifyIncidentHandler,
} from "../handlers";
import themeStore from "../../../stores/theme.store";

interface MapMarkerProps {
  coords: [number, number] | LngLat;
  source: string;
  markId: string;
  properties?: Record<string, unknown>;
}

export const IncidentComponent = observer((props: MapMarkerProps) => {
  const {
    popupState,
    setPopupState,
    verified,
    verificationCount,
    markData,
    deleteMarkModalState,
    setDeleteMarkModalState,
    zIndex,
    setZIndex,
    isPendingVerify,
    isPendingUnverify,
    isFetchingGetMark,
    isLoadingGetMark,
    isEmptyUser,
    mutateVerify,
    mutateUnverify,
    user,
    mark,
  } = useIncidentState(props.markId);

  const isCurrentUserMarker = () => {
    return user?.id === mark?.userId;
  };

  return (
    <>
      <YMapMarker
        coordinates={props.coords}
        source={props.source}
        zIndex={zIndex}
      >
        <FaMapMarker
          onClick={() =>
            onIncidentClickHandler(popupState, setPopupState, setZIndex)
          }
          className={`${!popupState ? `fixed` : "fixed-top-left"} `}
          style={{
            color: props.properties && props.properties["color"] as string
              ? (props.properties["color"] as string)
              : themeStore.color,
          }}
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
              <div className={`popup-content backlight-flashing`}>
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
                  <TooltipComponent visible text="Адрес">
                    <PiCityThin
                      size={MEDIUM_SIZE_MARKER}
                      className="popup-icon"
                    />
                  </TooltipComponent>
                  <p className="popup-text">
                    {`${markData.addressName ?? "Невозможно определить"}`}
                  </p>
                </div>
                {markData?.description && (
                  <div className="popup-description">
                    <TooltipComponent visible text="Описание">
                      <PiFileTextThin
                        size={MEDIUM_SIZE_MARKER}
                        className="popup-icon"
                      />
                    </TooltipComponent>
                    <p className="popup-text">{markData?.description}</p>
                  </div>
                )}
                <div className="popup-footer">
                  <ButtonComponent
                    modalButton
                    type="button"
                    ariaLabel={
                      verified ? "Отменить подтверждение" : "Подтвердить"
                    }
                    onClick={() =>
                      onVerifyOrUnverifyIncidentHandler(
                        isEmptyUser,
                        mutateVerify,
                        mutateUnverify,
                        verified,
                        markData,
                        user
                      )
                    }
                    disabled={isPendingVerify || isPendingUnverify}
                    verifyed={!verified && !isEmptyUser()}
                    noHover
                  >
                    {isPendingVerify || isPendingUnverify ? (
                      <Spinner lightMode visible size={SMALL_SIZE_MARKER} />
                    ) : verified ? (
                      "Отменить подтверждение"
                    ) : (
                      "Подтверждаю"
                    )}
                  </ButtonComponent>
                  {isCurrentUserMarker() && (
                    <ButtonComponent
                      modalButton
                      type="button"
                      ariaLabel="Удалить"
                      noHover
                      onClick={() => setDeleteMarkModalState(true)}
                    >
                      Удалить
                    </ButtonComponent>
                  )}
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
      <ModalComponent
        isOpen={deleteMarkModalState}
        onClose={() => setDeleteMarkModalState(false)}
      >
        <DeleteMarkModal
          setModalOpen={setDeleteMarkModalState}
          markId={markData?.id}
        />
      </ModalComponent>
    </>
  );
});
