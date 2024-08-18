import axios from "axios";
import { MarkRecvDto } from "../dto/mark-recv.dto";
import { Feature } from "@yandex/ymaps3-clusterer";
import { CoordsDto } from "../dto/coords.dto";
import { VerifyMarkDto } from "../dto/verify-mark.dto";
import { MarkDto } from "../dto/mark.dto";
import { CategoryDto } from "../dto/categories.dto";
import { VerifiedCountDto } from "../dto/verified-count.dto";
import { CreateMarkDto } from "../dto/create-mark.dto";

export class MarksService {
  private static baseUrl = import.meta.env.VITE_API_GETAWAY_HOST;
  static async getMark(mark: MarkDto) {
    const url: string = `${this.baseUrl}/api/marks/one/`;
    const userId: string = this.userIdConversion(mark.userId);
    const params = this.makeParamsForGetMark(
      userId,
      mark.markId,
      mark.lng,
      mark.lat,
    );
    return await axios.get<MarkRecvDto>(`${url}?${params}`);
  }

  private static userIdConversion(userId: string) {
    if (!userId) return "";
    return userId;
  }

  private static makeParamsForGetMark(
    userId: string,
    markId: string,
    lat: number,
    lng: number
  ) {
    const params = new URLSearchParams({
      userId,
      markId: markId.toString(),
      lat: lat.toString(),
      lng: lng.toString(),
    }).toString();
    return params;
  }

  static async getNearestMarks(currentCoords: CoordsDto) {
    const url = `${this.baseUrl}/api/marks/`;
    const params = this.makeParamsForGetMarks(
      currentCoords.lat,
      currentCoords.lng
    );
    return await axios.get<Feature[]>(`${url}?${params}`);
  }

  private static makeParamsForGetMarks(lat: number, lng: number) {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
    }).toString();
    return params;
  }

  static async postVerifyTrue(data: VerifyMarkDto) {
    try {
      const url = `${this.baseUrl}/api/marks/verify/true`;
      const response = await axios.post<VerifiedCountDto>(`${url}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async postVerifyFalse(data: VerifyMarkDto) {
    try {
      const url = `${this.baseUrl}/api/marks/verify/false`;
      const response = await axios.post<VerifiedCountDto>(`${url}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async getCategories() {
    try {
      const url = `${this.baseUrl}/api/marks/categories`;
      const response = await axios.get<CategoryDto[]>(`${url}`);
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async postCreateMark(data: CreateMarkDto) {
    try {
      const url = `${this.baseUrl}/api/marks/create`;
      const response = await axios.post<Feature>(`${url}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
}
