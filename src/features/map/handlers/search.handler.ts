import { ChangeEvent } from "react";
import searchModeStore from "../../../stores/search-mode.store";

export const handleSearch = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void
) => {
  setValue(e.target.value);
  if (searchModeStore.get()) searchModeStore.set(false);
};
