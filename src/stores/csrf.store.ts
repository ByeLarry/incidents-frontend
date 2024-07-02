import { makeAutoObservable } from "mobx";

class CsrfStore {
  csrf: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  changeCsrf = (data: string) => {
    this.csrf = data;
  };
}

export default new CsrfStore();
