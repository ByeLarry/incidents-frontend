/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import {
  MarkRecvDto,
  UserDto,
  VerifiedCountDto,
  VerifyMarkDto,
} from "../../../dto";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const onVerifyOrUnverifyIncidentHandler = async (
  isEmptyUser: () => boolean,
  mutateVerify: UseMutateFunction<
    AxiosResponse<VerifiedCountDto, any>,
    Error,
    VerifyMarkDto,
    unknown
  >,
  mutateUnverify: UseMutateFunction<
    AxiosResponse<VerifiedCountDto, any>,
    Error,
    VerifyMarkDto,
    unknown
  >,
  verified: boolean,
  markData: MarkRecvDto | null,
  user: UserDto | null
) => {
  if (isEmptyUser()) {
    toast.error(
      "Подтверждение доступно только зарегистрированным пользователям"
    );
    return;
  }
  console.log(verified);
  const mark: VerifyMarkDto = {
    markId: markData?.id as number,
    userId: user?.id as string,
  };
  if (verified) {
    mutateUnverify(mark);
  } else {
    mutateVerify(mark);
  }
};
