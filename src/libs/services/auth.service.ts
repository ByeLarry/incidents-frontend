import { AxiosResponse } from "axios";
import { SignInDto } from "../dto/signin.dto";
import { SignUpDto } from "../dto/signup.dto";
import { UserWithAccessToken } from "../../interfaces/user-with-access-token";
import { UserDto } from "../dto/user.dto";
import apiClient from "../../interceptors/auth.interceptor";
import { AccessTokenDto } from "../dto/access-token.dto";

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
}
