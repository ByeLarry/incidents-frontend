import axios, { AxiosResponse } from "axios";
import { MarkRecvDto } from "../dto/markRecv.dto";
import { Feature } from "@yandex/ymaps3-clusterer";
import { CoordsDto } from "../dto/coords.dto";
import { VerifyMarkDto } from "../dto/verifyMark.dto";
import { MarkDto } from "../dto/mark.dto";
import { CategoryDto } from "../dto/categories.dto";
import { VerifiedCountDto } from "../dto/verifiedCount.dto";
import { CreateMarkDto } from "../dto/createMark.dto";

export class MarksService {
  private static baseUrl: string = import.meta.env.VITE_API_GETAWAY_HOST;
  static async getMark(mark: MarkDto): Promise<AxiosResponse<MarkRecvDto>> {
    const url = `${this.baseUrl}/api/marks/one/`;
    const userId = this.userIdConversion(mark.userId);
    const params = this.makeParamsForGetMark({ ...mark, userId });
    return await axios.get<MarkRecvDto>(`${url}?${params}`);
  }

  private static userIdConversion(userId: string): string {
    if (!userId) return "";
    return userId;
  }

  private static makeParamsForGetMark(mark: MarkDto): string {
    const params = new URLSearchParams({
      userId: mark.userId,
      markId: mark.markId.toString(),
      // For YMaps coords must be swapped
      lat: mark.lng.toString(),
      lng: mark.lat.toString(),
    }).toString();
    return params;
  }

  static async getNearestMarks(
    currentCoords: CoordsDto
  ): Promise<AxiosResponse<Feature[]>> {
    const url = `${this.baseUrl}/api/marks/`;
    const coords: CoordsDto = {
      lat: currentCoords.lat,
      lng: currentCoords.lng,
    };
    const params = this.makeParamsForGetMarks(coords);
    return await axios.get<Feature[]>(`${url}?${params}`);
  }

  private static makeParamsForGetMarks(coords: CoordsDto): string {
    const params = new URLSearchParams({
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
    }).toString();
    return params;
  }

  static async postVerifyTrue(
    verifyData: VerifyMarkDto
  ): Promise<AxiosResponse<VerifiedCountDto>> {
    const url = `${this.baseUrl}/api/marks/verify/true`;
    return await axios.post<VerifiedCountDto>(`${url}`, verifyData, {
      withCredentials: true,
    });
  }

  static async postVerifyFalse(
    data: VerifyMarkDto
  ): Promise<AxiosResponse<VerifiedCountDto>> {
    const url = `${this.baseUrl}/api/marks/verify/false`;
    return await axios.post<VerifiedCountDto>(`${url}`, data, {
      withCredentials: true,
    });
  }

  static async getCategories(): Promise<AxiosResponse<CategoryDto[]>> {
    const url = `${this.baseUrl}/api/marks/categories`;
    return await axios.get<CategoryDto[]>(`${url}`);
  }

  static async postCreateMark(
    newMark: CreateMarkDto
  ): Promise<AxiosResponse<Feature>> {
    const url = `${this.baseUrl}/api/marks/create`;
    return await axios.post<Feature>(`${url}`, newMark, {
      withCredentials: true,
    });
  }
}
