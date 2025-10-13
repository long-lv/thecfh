import { useMutation } from "@tanstack/react-query";
import { authApi } from "../lib/api/auth.api";
import { setAccessToken } from "../utils/tokenStorage";
import { ILoginRequest, ILoginResponse } from "../lib/type/auth.type";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../lib/type/api.type";
import Cookies from 'js-cookie';

export const useLogin = () => {
  return useMutation<
    ILoginResponse,
    AxiosError<ApiErrorResponse>,
    ILoginRequest
  >({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      setAccessToken(res.data.tokens.access_token);
    },
  });
};
