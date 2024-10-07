import { useMutation } from "@tanstack/react-query";
import { CreateMarkDto } from "../dto/create-mark.dto";
import { MarksService } from "../services/marks.service";
import { toast } from "sonner";
import { AxiosError, HttpStatusCode } from "axios";

export const CREATE_MARK_KEY = "createMark";

export function useCreateMark() {
  const { mutate, isPending, data, error, isError } = useMutation({
    mutationKey: [CREATE_MARK_KEY],
    mutationFn: async (newMark: CreateMarkDto) =>
      MarksService.postCreateMark(newMark),
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case HttpStatusCode.InternalServerError:
            toast.error("Произошла серверная ошибка");
            break;
          case HttpStatusCode.Conflict:
            toast.error("Рядом уже есть инцидент");
            break;
          case HttpStatusCode.TooManyRequests:
            toast.error("Нельзя отмечать более 5 инцидентов за 12 часов");
            break;
          default:
            toast.error("Произошла непредвиденная ошибка");
        }
      }
    },
  });

  return {
    createMark: mutate,
    isPendingCreateMark: isPending,
    dataCreateMark: data,
    errorCreateMark: error,
    isErrorCreateMark: isError,
  };
}
