import { useMutation } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";
import { VerifyMarkDto } from "../dto/verify-mark.dto";
import { toast } from "sonner";

export const VERIFY_KEY = "verify";

export function useVerify() {
  const { mutate, isPending, data, isSuccess } = useMutation({
    mutationKey: [VERIFY_KEY],
    retry: false,
    mutationFn: async (markData: VerifyMarkDto) =>
      MarksService.postVerifyTrue(markData),
    onError: () => {
      toast.error("Произошла ошибка при подтверждении точки");
    },
  });

  return {
    mutateVerify: mutate,
    isPendingVerify: isPending,
    dataVerify: data,
    isSuccessVerify: isSuccess,
  };
}
