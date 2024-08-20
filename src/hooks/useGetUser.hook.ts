import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";

export function useGetUser() {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => AuthService.getUser(),
    select: (data) => data.data,
    retry: 3,
    retryDelay: 3000,
  });

  return {
    userdata: data,
    isLoadingGetUser: isLoading,
    isSuccessGetUser: isSuccess,
    isErrorGetUser: isError,
    errorGetUser: error,
    isFetchingGetUser: isFetching,
  };
}
