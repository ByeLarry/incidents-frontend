import { useQuery } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";

export function useGetCategories() {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: () => MarksService.getCategories(),
    select: (data) => data.data,
  });

  return {
    categories: data,
    isLoadingGetCategories: isLoading,
    isSuccessGetCategories: isSuccess,
    isErrorGetCategories: isError,
    errorGetCategories: error,
    isFetchingGetCategories: isFetching,
  };
}
