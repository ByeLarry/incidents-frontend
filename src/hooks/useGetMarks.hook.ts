import { useQuery } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";
import { CoordsDto } from "../dto/coords.dto";

export function useGetMarks(currentCoords: CoordsDto) {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["marks"],
    queryFn: () => MarksService.getMarks(currentCoords),
    select: (data) => data.data,
    enabled: currentCoords.lat !== 0 && currentCoords.lng !== 0
  });

  return {
    marks: data,
    isLoadingGetMarks: isLoading,
    isSuccessGetMarks: isSuccess,
    isErrorGetMarks: isError,
    errorGetMarks: error,
    isFetchingGetMarks: isFetching
  };
}
