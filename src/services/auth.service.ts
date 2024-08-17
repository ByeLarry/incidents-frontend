import axios from "axios";
import { SignInDto } from "../dto/signin.dto";
import { User } from "../interfaces/IUser";
import { SignUpDto } from "../dto/signup.dto";
import { LogoutDto } from "../dto/logout.dto";

export class AuthService {
  private static baseUrl = import.meta.env.VITE_API_GETAWAY_HOST;
  static async postSignIn(data: SignInDto) {
    try {
      const url = `${this.baseUrl}/api/auth/signin`;
      const response = await axios.post<User>(url, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async postSignUp(data: SignUpDto) {
    try {
      const url = `${this.baseUrl}/api/auth/signup`;
      const response = await axios.post<User>(url, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async getMe() {
    try {
      const url = `${this.baseUrl}/api/auth/me`;
      const response = await axios.get<User>(url, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  static async postLogout(data: LogoutDto) {
    try {
      const url = `${this.baseUrl}/api/auth/logout`;
      const response = await axios.post(url, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
}
