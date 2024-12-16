export const onIncidentClickHandler = async (
  popupState: boolean,
  setPopupState: (value: React.SetStateAction<boolean>) => void,
  setZIndex: (value: React.SetStateAction<number>) => void
) => {
  if (popupState) {
    setPopupState(false);
    setZIndex(100);
    return;
  }
  setPopupState(true);
  setZIndex(200);
};
