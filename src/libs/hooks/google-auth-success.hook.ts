import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { AuthProvidersDto } from "../dto";
import { authProvidersErrors } from "../helpers";

export const GOOGLE_AUTH_SUCCESS_KEY = "google-auth-success";

export function useGoogleAuthSuccess() {
  const { mutate, isPending, data, error, isError } = useMutation({
    mutationKey: [GOOGLE_AUTH_SUCCESS_KEY],
    mutationFn: (dto: AuthProvidersDto) =>
      AuthService.getGoogleAuthSuccess(dto.token, dto.name, dto.surname),
    onError: authProvidersErrors,
    retry: false
  });

  return {
    googleAuthSuccess: mutate,
    isPendingGoogleAuthSuccess: isPending,
    dataGoogleAuthSuccess: data,
    errorGoogleAuthSuccess: error,
    isErrorGoogleAuthSuccess: isError,
  };
}
