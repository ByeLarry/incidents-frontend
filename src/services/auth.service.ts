import axios, { AxiosResponse } from "axios";
import { SignInDto } from "../dto/signin.dto";
import { User } from "../interfaces/user";
import { SignUpDto } from "../dto/signup.dto";
import { LogoutDto } from "../dto/logout.dto";

export class AuthService {
  private static baseUrl = import.meta.env.VITE_API_GETAWAY_HOST;

  static async postSignIn(signinData: SignInDto): Promise<AxiosResponse<User>> {
    const url = `${this.baseUrl}/api/auth/signin`;
    const response = await axios.post<User>(url, signinData, {
      withCredentials: true,
    });
    return response;
  }

  static async postSignUp(signupData: SignUpDto): Promise<AxiosResponse<User>> {
    const url = `${this.baseUrl}/api/auth/signup`;
    const response = await axios.post<User>(url, signupData, {
      withCredentials: true,
    });
    return response;
  }

  static async getUser(): Promise<AxiosResponse<User>> {
    const url = `${this.baseUrl}/api/auth/me`;
    const response = await axios.get<User>(url, {
      withCredentials: true,
    });
    return response;
  }

  static async postLogout(csrf: LogoutDto): Promise<AxiosResponse<void>> {
    const url = `${this.baseUrl}/api/auth/logout`;
    const response = await axios.post<void>(url, csrf, {
      withCredentials: true,
    });
    return response;
  }
}
