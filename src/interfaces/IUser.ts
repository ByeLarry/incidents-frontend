import { UserDto } from "../dto/user.dto";

export interface User extends UserDto {
  csrf_token: string;
}
