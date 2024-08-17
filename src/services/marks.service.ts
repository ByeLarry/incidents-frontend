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
  static async getMark(data: MarkDto) {
    try {
      const url = `${this.baseUrl}/api/marks/one/`;

      if (!data.userId) data.userId = "";

      const params = new URLSearchParams({
        userId: data.userId.toString(),
        markId: data.markId.toString(),
        lat: data.lat.toString(),
        lng: data.lng.toString(),
      }).toString();
      const response = await axios.get<MarkRecvDto>(`${url}?${params}`);
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async getMarks(currentCoords: CoordsDto) {
    const url = `${this.baseUrl}/api/marks/`;
    const params = new URLSearchParams({
      lat: currentCoords.lat.toString(),
      lng: currentCoords.lng.toString(),
    }).toString();
    return await axios.get<Feature[]>(`${url}?${params}`);
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
