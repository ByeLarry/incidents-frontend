import { makeAutoObservable } from "mobx";
import { User } from "../interfaces/IUser";

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  changeUser = (data: User | null) => {
    this.user = data;
  };

  isEmptyUser = (): boolean => {
    return this.user === null;
  };
}

export default new UserStore();
