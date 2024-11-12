import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";

export const GET_USER_KEY = "getUser";

export function useGetUser() {
  const { data, isSuccess, isError, error, mutate } = useMutation({
    mutationKey: [GET_USER_KEY],
    mutationFn: () => AuthService.getUser(),
    retry: false
  });

  return {
    userdata: data,
    isSuccessGetUser: isSuccess,
    isErrorGetUser: isError,
    errorGetUser: error,
    mutateGetUser: mutate,
  };
}
