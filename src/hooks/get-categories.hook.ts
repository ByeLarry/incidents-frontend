import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "../services/categories.service";
import { DEFAULT_HTTP_RETRY_DELAY } from "../utils";

export const CATEGORIES_KEY = "categories";

export function useGetCategories() {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: [CATEGORIES_KEY],
    retry: 2,
    retryDelay: DEFAULT_HTTP_RETRY_DELAY,
    queryFn: () => CategoriesService.getCategories(),
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
