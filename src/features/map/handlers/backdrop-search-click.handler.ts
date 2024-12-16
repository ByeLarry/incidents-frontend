import searchModeStore from "../../../stores/search-mode.store";

export const handleBackdropClick = () => {
  searchModeStore.set(false);
};
