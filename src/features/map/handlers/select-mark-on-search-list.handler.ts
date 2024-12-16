import { MarkSearchDto } from "../../../dto";
import searchModeStore from "../../../stores/search-mode.store";
import searchedMarkStore from "../../../stores/searched-mark.store";

export const handleSelectMarkOnSearchList = (
  mark: MarkSearchDto,
  setValue: (value: string) => void,
  setSearchedMarks: (value: MarkSearchDto[]) => void
) => {
  searchModeStore.set(false);
  setValue("");
  setSearchedMarks([]);
  searchedMarkStore.setSearchedMark(mark);
};
