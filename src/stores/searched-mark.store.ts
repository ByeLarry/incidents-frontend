import { makeAutoObservable } from "mobx";
import { MarkSearchDto } from "../libs/dto";

class SearchedMarkStore {
  searchedMark?: MarkSearchDto;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchedMark = (data: MarkSearchDto) => {
    this.searchedMark = { ...data };
  };
}

export default new SearchedMarkStore();
