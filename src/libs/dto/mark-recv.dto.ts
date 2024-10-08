export interface MarkRecvDto {
  id: number;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  category: {
    id: number;
    name: string;
    color: string;
  };
  createdAt?: Date;
  userId?: string;
  distance?: number;
  verified?: number;
  addressDescription?: string;
  addressName?: string;
  isMyVerify?: boolean;
}
