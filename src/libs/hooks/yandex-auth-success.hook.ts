import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { AuthProvidersDto } from "../dto";
import { authProvidersErrors } from "../helpers";

export const YANDEX_AUTH_SUCCESS_KEY = "yandex-auth-success";

export function useYandexAuthSuccess() {
  const { mutate, isPending, data, error, isError } = useMutation({
    mutationKey: [YANDEX_AUTH_SUCCESS_KEY],
    mutationFn: (dto: AuthProvidersDto) =>
      AuthService.getYandexAuthSuccess(dto.token, dto.name, dto.surname),
    onError: authProvidersErrors
  });

  return {
    yandexAuthSuccess: mutate,
    isPendingYandexAuthSuccess: isPending,
    dataYandexAuthSuccess: data,
    errorYandexAuthSuccess: error,
    isErrorYandexAuthSuccess: isError,
  };
}
