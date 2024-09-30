import { useQuery } from "@tanstack/react-query";
import { MarksService } from "../services/marks.service";

export const CATEGORIES_KEY = "categories";

export function useGetCategories() {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: [CATEGORIES_KEY],
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
