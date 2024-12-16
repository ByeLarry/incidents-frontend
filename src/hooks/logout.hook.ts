import { toast } from "sonner";
import { AuthService } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN_KEY } from "../utils/consts.util";

export const LOGOUT_KEY = "logout";

export function useLogout() {
  const { mutate, isPending, data, isSuccess } = useMutation({
    mutationKey: [LOGOUT_KEY],
    mutationFn: async () => AuthService.postLogout(),
    retry: false,
    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
    onError: () => {
      toast.error("Произошла ошибка при выходе из аккаунта");
    },
  });

  return {
    mutateLogout: mutate,
    isPendingLogout: isPending,
    dataLogout: data,
    isSuccessLogout: isSuccess,
  };
}
