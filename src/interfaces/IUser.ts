import { UserDto } from "../dto/user.dto";

export interface User {
  user: UserDto;
  csrf_token: string;
}
