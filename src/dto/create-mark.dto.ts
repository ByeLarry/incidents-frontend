import { IAddress } from "../interfaces";

export interface CreateMarkDto {
  userId: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  categoryId: number;
  address?: IAddress;
}
