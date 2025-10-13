import ApiUtil from "@/src/utils/apiUtil";
import { ILoginRequest, ILoginResponse } from "../type/auth.type";

export const authApi = {
	login: (data: ILoginRequest): Promise<ILoginResponse> => {
		return ApiUtil.post('/auth/signin', data)
	},
	logout: () : Promise<void> => {
		return ApiUtil.post('/auth/logout')
	}
}