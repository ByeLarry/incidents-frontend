import { AxiosResponse } from "axios";
import { UserWithAccessToken } from "../../interfaces";
import {
  AccessTokenDto,
  DeleteUserDto,
  SignInDto,
  SignUpDto,
  UserDto,
} from "../dto";
import apiClient from "../../interceptors/auth.interceptor";

export class AuthService {
  private static baseUrl = import.meta.env.VITE_API_GETAWAY_HOST;

  static async postSignIn(
    signinData: SignInDto
  ): Promise<AxiosResponse<UserWithAccessToken>> {
    const url = `${this.baseUrl}/api/auth/signin`;
    const response = await apiClient.post<UserWithAccessToken>(
      url,
      signinData,
      {
        withCredentials: true,
      }
    );
    return response;
  }

  static async postSignUp(
    signupData: SignUpDto
  ): Promise<AxiosResponse<UserWithAccessToken>> {
    const url = `${this.baseUrl}/api/auth/signup`;
    const response = await apiClient.post<UserWithAccessToken>(
      url,
      signupData,
      {
        withCredentials: true,
      }
    );
    return response;
  }

  static async getUser(): Promise<AxiosResponse<UserDto>> {
    const url = `${this.baseUrl}/api/auth/me`;
    const response = await apiClient.get<UserDto>(url, {
      withCredentials: true,
    });
    return response;
  }

  static async postLogout(): Promise<AxiosResponse<void>> {
    const url = `${this.baseUrl}/api/auth/logout`;
    const response = await apiClient.post(
      url,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  }

  static async refreshToken(): Promise<AxiosResponse<AccessTokenDto>> {
    const url = `${this.baseUrl}/api/auth/refresh`;
    const response = await apiClient.post<AccessTokenDto>(
      url,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  }

  static async deleteUser(data: DeleteUserDto): Promise<AxiosResponse> {
    const url = `${this.baseUrl}/api/auth`;
    const params = AuthService.getUserDeleteParam(data.userId);
    const response = await apiClient.delete(`${url}?${params}`, {
      withCredentials: true,
    });
    return response;
  }

  static async getGoogleAuthSuccess(
    token: string,
    name: string,
    surname: string
  ): Promise<AxiosResponse<UserWithAccessToken>> {
    const url = `${this.baseUrl}/api/auth/google/success`;
    const params = new URLSearchParams({
      token,
      name,
      surname,
    });
    const response = await apiClient.get(`${url}?${params}`, {
      withCredentials: true,
    });
    return response;
  }

  static async getYandexAuthSuccess(
    token: string,
    name: string,
    surname: string
  ): Promise<AxiosResponse<UserWithAccessToken>> {
    const url = `${this.baseUrl}/api/auth/yandex/success`;
    const params = new URLSearchParams({
      token,
      name,
      surname,
    });
    const response = await apiClient.get(`${url}?${params}`, {
      withCredentials: true,
    });
    return response;
  }

  private static getUserDeleteParam(userId: string): string {
    const params = new URLSearchParams({
      userId,
    }).toString();
    return params;
  }
}
