import { useMutation } from "@tanstack/react-query";
import { authApi } from "../lib/api/auth.api";
import { clearAccessToken, setAccessToken } from "../utils/tokenStorage";
import { ILoginRequest, ILoginResponse } from "../lib/type/auth.type";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../lib/type/api.type";
import { useUserStore } from "../stores";

export const useLogin = () => {
	const setUser = useUserStore((state) => state.setUser);
  return useMutation<
    ILoginResponse,
    AxiosError<ApiErrorResponse>,
    ILoginRequest
  >({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      setAccessToken(res.data.tokens.access_token);
			const {tokens, ...dataSaved} = res.data;
			setUser(dataSaved);
    },
  });
};

export const useLogout = () => {
  const clearUserd = useUserStore((state) => state.clearUser);
  return useMutation<void>({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearUserd()
      clearAccessToken()
    }
  })
}
