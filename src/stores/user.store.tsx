import { makeAutoObservable } from "mobx";
import { UserDto } from "../dto";

class UserStore {
  user: UserDto | null | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  changeUser = (data: UserDto | null) => {
    this.user = data;
  };

  isEmptyUser = (): boolean => {
    return this.user === null;
  };

  isInitializedUser = (): boolean => {
    return this.user !== undefined;
  };
}

export default new UserStore();
