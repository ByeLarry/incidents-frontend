import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { toast } from "sonner";
import { AxiosError, HttpStatusCode } from "axios";
import { DeleteUserDto } from "../dto";
import { ACCESS_TOKEN_KEY } from "../utils";

export const DELETE_USER_KEY = "deleteUser";

export function useDeleteUser() {
  const { mutate, isPending, data, isSuccess, isError, error } = useMutation({
    mutationKey: [DELETE_USER_KEY],
    mutationFn: async (data: DeleteUserDto) => AuthService.deleteUser(data),
    retry: false,
    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case HttpStatusCode.NotFound:
            toast.error("Пользователь несуществует");
            break;
          case HttpStatusCode.Unauthorized:
            toast.error("Неправильный пароль");
            break;
          case HttpStatusCode.InternalServerError:
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
    mutateDeleteUser: mutate,
    isPendingDeleteUser: isPending,
    deleteUserResponse: data,
    isSuccessDeleteUser: isSuccess,
    isErrorDeleteUser: isError,
    errorDeleteUser: error,
  };
}
