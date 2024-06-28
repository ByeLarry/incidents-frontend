import axios from "axios";
import { SignInDto } from "../dto/signin.dto";
import { User } from "../interfaces/IUser";
import { SignUpDto } from "../dto/signup.dto";

export class AuthService {
  static async postSignIn(data: SignInDto) {
    try {
      const url = `${import.meta.env.VITE_API_GETAWAY_HOST}/api/auth/signin`;
      console.log("Sending request to URL:", url);

      const response = await axios.post<User>(url, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        }
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }

  static async postSignUp(data: SignUpDto) {
    try {
      const url = `${import.meta.env.VITE_API_GETAWAY_HOST}/api/auth/signup`;
      const response = await axios.post<User | string>(url, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }
}
