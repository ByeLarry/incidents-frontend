import { useMutation } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";
import { VerifyMarkDto } from "../dto/verify-mark.dto";
import { toast } from "sonner";

export const UNVERIFY_KEY = "unverify";

export function useUnverify() {
  const { mutate, isPending, data } = useMutation({
    mutationKey: [UNVERIFY_KEY],
    mutationFn: async (markData: VerifyMarkDto) =>
      MarksService.postVerifyFalse(markData),
    onError: () => {
      toast.error("Произошла ошибка при опровержениии точки");
    },
  });

  return {
    mutateUnverify: mutate,
    isPendingUnverify: isPending,
    dataUnverify: data,
  };
}
