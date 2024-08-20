import { useMutation } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";
import { VerifyMarkDto } from "../dto/verifyMark.dto";
import { toast } from "sonner";

export function useVerify() {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ["verify"],
    mutationFn: async (markData: VerifyMarkDto) =>
      MarksService.postVerifyTrue(markData),
    onError: () => {
      toast.error("Произошла ошибка при подтверждении точки");
    },
  });

  return { mutateVerify: mutate, isPendingVerify: isPending, dataVerify: data };
}
