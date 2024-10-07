export interface UserDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  activated: boolean;
  provider: string;
  roles: string[];
}
