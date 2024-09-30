import { makeAutoObservable } from "mobx";
import { UserDto } from "../libs/dto/user.dto";

class UserStore {
  user: UserDto | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  changeUser = (data: UserDto | null) => {
    this.user = data;
  };

  isEmptyUser = (): boolean => {
    return this.user === null;
  };
}

export default new UserStore();
