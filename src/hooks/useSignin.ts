import { useMutation } from "@tanstack/react-query";
import { SignInDto } from "../dto/signin.dto";
import { AuthService } from "../services/auth.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useSignin() {
  const { mutate, isPending, data, isSuccess, isError, error } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: SignInDto) => AuthService.postSignIn(data),
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 404:
            toast.error("Пользователь несуществует");
            break;
          case 401:
            toast.error("Неправильный пароль");
            break;
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          default:
            toast.error(
              error.response?.data.message || "Во время входа произошла ошибка"
            );
        }
      } else {
        toast.error("Произошла непредвиденная ошибка");
      }
    },
  });

  return {
    mutateSignin: mutate,
    isPendingSignin: isPending,
    signinResponse: data,
    isSuccessSignin: isSuccess,
    isErrorSignin: isError,
    errorSignin: error,
  };
}
