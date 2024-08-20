import { useQuery } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";
import { useEffect } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { UseGetMarkDto } from "../dto/useGetMark.dto";

export function useGetMark(markGetDto: UseGetMarkDto) {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["mark", markGetDto.markId],
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
        case 404:
          toast.error("Точка не найдена");
          break;
        case 500:
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
