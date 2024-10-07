import { useQuery } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";
import { useEffect } from "react";
import { toast } from "sonner";
import { AxiosError, HttpStatusCode } from "axios";
import { UseGetMarkDto } from "../dto/get-mark.dto";

export const MARK_KEY = "getMark";

export function useGetMark(markGetDto: UseGetMarkDto) {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: [MARK_KEY, markGetDto.markId],
    queryFn: () =>
      MarksService.getMark({
        markId: markGetDto.markId,
        userId: markGetDto.userId,
        lng: markGetDto.lng,
        lat: markGetDto.lat,
      }),
    select: (data) => data.data,
    enabled: !!markGetDto.userId && markGetDto.enabled,
    retry: false,
  });

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      const errorStatus = error.response?.status;
      switch (errorStatus) {
        case HttpStatusCode.NotFound:
          toast.error("Точка не найдена");
          break;
        case HttpStatusCode.InternalServerError:
          toast.error("Произошла серверная ошибка");
          break;
        default:
          toast.error("Произошла непредвиденная ошибка");
      }
    }
  }, [isError, error]);

  return {
    mark: data,
    isLoadingGetMark: isLoading,
    isSuccessGetMark: isSuccess,
    isErrorGetMark: isError,
    errorGetMark: error,
    isFetchingGetMark: isFetching,
  };
}
