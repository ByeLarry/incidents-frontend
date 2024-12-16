import { useState, useEffect } from "react";
import { MarkRecvDto, CoordsDto } from "../../../dto";
import { useVerify, useUnverify, useGetMark } from "../../../hooks";
import { GeoServiceFromBrowser } from "../../../services";
import userStore from "../../../stores/user.store";

export const useIncidentState = (markId: string) => {
  const [popupState, setPopupState] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationCount, setVerificationCount] = useState(0);
  const [markData, setMarkData] = useState<MarkRecvDto | null>(null);
  const [deleteMarkModalState, setDeleteMarkModalState] = useState(false);
  const [zIndex, setZIndex] = useState(100);
  const { user, isEmptyUser } = userStore;
  const { mutateVerify, isPendingVerify, dataVerify, isSuccessVerify } =
    useVerify();
  const { mutateUnverify, isPendingUnverify, dataUnverify, isSuccessUnverify } =
    useUnverify();
  const [currentCoords, setCurrentCoords] = useState<CoordsDto>({
    lat: 0,
    lng: 0,
  });

  const getMarkDto = {
    markId,
    userId: user?.id ?? "",
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

  useEffect(() => {
    if (isSuccessVerify) {
      setVerified(true);
    }
  }, [isSuccessVerify]);

  useEffect(() => {
    if (isSuccessUnverify) {
      setVerified(false);
    }
  }, [isSuccessUnverify]);

  return {
    popupState,
    setPopupState,
    verified,
    setVerified,
    verificationCount,
    setVerificationCount,
    markData,
    setMarkData,
    deleteMarkModalState,
    setDeleteMarkModalState,
    zIndex,
    setZIndex,
    currentCoords,
    setCurrentCoords,
    mutateVerify,
    isPendingVerify,
    dataVerify,
    isSuccessVerify,
    mutateUnverify,
    isPendingUnverify,
    dataUnverify,
    isSuccessUnverify,
    isFetchingGetMark,
    isLoadingGetMark,
    isEmptyUser,
    user,
    mark,
  };
};
