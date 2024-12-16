export interface MarkSearchDto {
  id: number;
  lat: number;
  lng: number;
  title: string;
  category: {
    id: number;
    name: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
