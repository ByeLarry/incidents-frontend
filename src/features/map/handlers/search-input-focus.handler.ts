import searchModeStore from "../../../stores/search-mode.store";

export const handleFocusInput = (searchInputValue: string) => {
  if (!searchModeStore.get() && searchInputValue) searchModeStore.set(true);
};
