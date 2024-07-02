import { makeAutoObservable } from "mobx";
import { User } from "../interfaces/IUser";

class UserStore {
  user: User | null = null;

  csrf: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  changeUser = (data: User) => {
    this.user = data;
  };

  changeCsrf = (data: string) => {
    this.csrf = data;
  };

  changeAllFields = (data: User) => {
    this.user = data;
    console.log(this.user);
  };

  isEmptyUser = (): boolean => {
    return !this.user && this.csrf === "";
  };
}

export default new UserStore();
