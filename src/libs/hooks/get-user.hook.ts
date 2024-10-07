import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";

export const GET_USER_KEY = "getUser";

export function useGetUser() {
  const { data, isLoading, isSuccess, isError, error, isFetching, refetch } =
    useQuery({
      queryKey: [GET_USER_KEY],
      queryFn: () => AuthService.getUser(),
      select: (data) => data.data,
    });

  return {
    userdata: data,
    isLoadingGetUser: isLoading,
    isSuccessGetUser: isSuccess,
    isErrorGetUser: isError,
    errorGetUser: error,
    isFetchingGetUser: isFetching,
    refetchGetUser: refetch,
  };
}
