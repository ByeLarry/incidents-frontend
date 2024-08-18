import { useQuery } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";
import { CoordsDto } from "../dto/coords.dto";
import { useEffect } from "react";
import { toast } from "sonner";

export function useGetMarks(currentCoords: CoordsDto) {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["marks"],
    queryFn: () => MarksService.getNearestMarks(currentCoords),
    select: (data) => data.data,
    enabled: currentCoords.lat !== 0 && currentCoords.lng !== 0,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Во время загрузки инцидентов произошла ошибка");
    }
  }, [isError]);

  return {
    marks: data,
    isLoadingGetMarks: isLoading,
    isSuccessGetMarks: isSuccess,
    isErrorGetMarks: isError,
    errorGetMarks: error,
    isFetchingGetMarks: isFetching,
  };
}
