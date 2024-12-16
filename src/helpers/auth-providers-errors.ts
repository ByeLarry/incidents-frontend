import { AxiosError, HttpStatusCode } from "axios";
import { toast } from "sonner";

export const authProvidersErrors = (error: AxiosError) => {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case HttpStatusCode.Conflict:
        toast.error(
          "Для данной почты установлен другой поставщик авторизации."
        );
        break;
      default:
        toast.error("Произошла непредвиденная ошибка");
    }
  }
};
