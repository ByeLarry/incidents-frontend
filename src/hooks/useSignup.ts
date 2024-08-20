import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { SignUpDto } from "../dto/signup.dto";

export function useSignup() {
  const { mutate, isPending, data, isSuccess, isError, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignUpDto) => AuthService.postSignUp(data),
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 409:
            toast.error("Такой пользователь уже существует");
            break;
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          default:
            toast.error(
              error.response?.data.message ||
                "Во время регистрации произошла ошибка"
            );
        }
      } else {
        toast.error("Произошла непредвиденная ошибка");
      }
    },
  });

  return {
    mutateSignup: mutate,
    isPendingSignup: isPending,
    signupResponse: data,
    isSuccessSignup: isSuccess,
    isErrorSignup: isError,
    errorSignup: error,
  };
}
