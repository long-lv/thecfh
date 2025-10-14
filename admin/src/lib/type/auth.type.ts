import { Role, StatusUser } from "@/src/constants";

export interface ILoginRequest {
	email: string;
	password: string;
} 

export interface ILoginResponse {
	data: IUserResponse;
	message: string;
	statusCode: number;
}

export interface IUserResponse {
	id: number;
	email: string;
	name: string;
	role: Role;
	status: StatusUser;
	createdAt: string;
	updatedAt: string;
	deleteAt: string | null;
	tokens: {
		access_token: string
	}
}