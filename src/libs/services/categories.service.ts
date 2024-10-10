import { AxiosResponse } from "axios";
import { CategoryDto } from "../dto/categories.dto";
import apiClient from "../../interceptors/auth.interceptor";

export class CategoriesService {
  private static baseUrl: string = import.meta.env.VITE_API_GETAWAY_HOST;
  static async getCategories(): Promise<AxiosResponse<CategoryDto[]>> {
    const url = `${this.baseUrl}/api/categories/categories`;
    return await apiClient.get<CategoryDto[]>(url);
  }
}
