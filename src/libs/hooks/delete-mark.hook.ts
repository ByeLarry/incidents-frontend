import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError, HttpStatusCode } from "axios";
import { MarksService } from "../services";

export const DELETE_MARK_KEY = "deleteMark";

export function useDeleteMark() {
  const { mutate, isPending, data, isSuccess, isError, error } = useMutation({
    mutationKey: [DELETE_MARK_KEY],
    mutationFn: async (markId?: number) =>
      MarksService.deleteMark(markId),
    retry: false,
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case HttpStatusCode.NotFound:
            toast.error("Просшествия не существует");
            break;
          default:
            toast.error(
              error.response?.data.message ||
                "Во время удаления происшествия произошла ошибка"
            );
        }
      } else {
        toast.error("Произошла непредвиденная ошибка");
      }
    },
  });

  return {
    mutateDeleteMark: mutate,
    isPendingDeleteMark: isPending,
    deleteMarkResponse: data,
    isSuccessDeleteMark: isSuccess,
    isErrorDeleteMark: isError,
    errorDeleteMark: error,
  };
}
