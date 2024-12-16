import { AxiosResponse } from "axios";
import { MarkSearchDto } from "../dto";
import apiClient from "../interceptors/auth.interceptor";

export class IncidentsSearchService {
  private static baseUrl: string = import.meta.env.VITE_API_GETAWAY_HOST;

  static async searchMarks(
    query: string
  ): Promise<AxiosResponse<MarkSearchDto[]>> {
    const url = `${this.baseUrl}/api/marks/search?query=${query}`;
    return await apiClient.get<MarkSearchDto[]>(`${url}`);
  }
}
