import { makeAutoObservable } from "mobx";

class SearchModeStore {
  private searchMode: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  set = (val: boolean) => {
    this.searchMode = val;
  };

  get = () => this.searchMode;
}

export default new SearchModeStore();
