import { makeAutoObservable } from "mobx";

class CloseCandidateMarkFormCallbackStore {
  callback: () => void = () => {};

  constructor() {
    makeAutoObservable(this);
  }

  changeCallback = (data: () => void) => {
    this.callback = data;
  };
}

export default new CloseCandidateMarkFormCallbackStore();
