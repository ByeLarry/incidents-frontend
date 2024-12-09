import { useMutation } from "@tanstack/react-query";
import { IncidentsSearchService } from "../services";

export const SEARCH_MARKS_KEY = "searchMarks";

export function useSearchMarks() {
  const { mutate, isPending, data, error, isError } = useMutation({
    mutationKey: [SEARCH_MARKS_KEY],
    retry: false,
    mutationFn: async (query: string) =>
      IncidentsSearchService.searchMarks(query),
  });

  return {
    searchMarks: mutate,
    isPendingSearchMarks: isPending,
    dataSearchMarks: data,
    errorSearchMarks: error,
    isErrorSearchMarks: isError,
  };
}
