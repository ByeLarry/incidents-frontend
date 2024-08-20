import { useMutation } from "@tanstack/react-query";
import { CreateMarkDto } from "../dto/createMark.dto";
import { MarksService } from "../services/marks.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useCreateMark() {
  const { mutate, isPending, data, error, isError } = useMutation({
    mutationKey: ["createMark"],
    mutationFn: async (newMark: CreateMarkDto) =>
      MarksService.postCreateMark(newMark),
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          case 409:
            toast.error("Рядом уже есть инцидент");
            break;
          case 403:
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
