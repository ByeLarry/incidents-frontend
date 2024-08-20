import { toast } from "sonner";
import { AuthService } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { LogoutDto } from "../dto/logout.dto";

export function useLogout() {
  const { mutate, isPending, data, isSuccess } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async (csrf: LogoutDto) =>
      AuthService.postLogout(csrf),
    onError: () => {
      toast.error("Произошла ошибка при выходе из аккаунта");
    },
  });

  return { mutateLogout: mutate, isPendingLogout: isPending, dataLogout: data, isSuccessLogout: isSuccess };
}
