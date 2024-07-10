import axios from "axios";
import { MarkRecvDto } from "../dto/mark-recv.dto";
import { Feature } from "@yandex/ymaps3-clusterer";
import { CoordsDto } from "../dto/coords.dto";
import { VerifyMarkDto } from "../dto/verify-mark.dto";
import { MarkDto } from "../dto/mark.dto";

export class MarksService {
  static async getMark(data: MarkDto) {
    try {
      const url = `${import.meta.env.VITE_API_GETAWAY_HOST}/api/marks/one/`;

      if (!data.userId) data.userId = "";

      const params = new URLSearchParams({
        userId: data.userId.toString(),
        markId: data.markId.toString(),
      }).toString();
      const response = await axios.get<MarkRecvDto>(`${url}?${params}`);
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async getMarks(data: CoordsDto) {
    try {
      const url = `${import.meta.env.VITE_API_GETAWAY_HOST}/api/marks/`;
      const params = new URLSearchParams({
        lat: data.lat.toString(),
        lng: data.lng.toString(),
      }).toString();
      const response = await axios.get<Feature[]>(`${url}?${params}`);
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async postVerifyTrue(data: VerifyMarkDto) {
    try {
      const url = `${
        import.meta.env.VITE_API_GETAWAY_HOST
      }/api/marks/verify/true`;
      const response = await axios.post(`${url}`, data, {
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
      const url = `${
        import.meta.env.VITE_API_GETAWAY_HOST
      }/api/marks/verify/false`;
      const response = await axios.post(`${url}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
}
