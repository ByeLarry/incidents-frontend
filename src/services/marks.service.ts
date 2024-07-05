import axios from "axios";
import { MarkGetDto } from "../dto/mark-get.dto";
import { MarkRecvDto } from "../dto/mark-recv.dto";

export class MarksService {
  static async getMark(data: MarkGetDto) {
    try {
      const url = `${import.meta.env.VITE_API_GETAWAY_HOST}/api/mark/${
        data.id
      }`;
      
      const response = await axios.get<MarkRecvDto>(url);
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
}
