export enum Role {
	ADMIN = 'ADMIN',
	CELLER = 'CELLER',
	USER = 'USER',
}

export enum StatusUser {
	VERIFY = 'VERIFY',
	ACTIVE = 'ACTIVE',
}

export type TCheckEmailAndUserExistsReq = {
	name: string;
	email: string;
};

export interface IJwtPayload {
	sub: string; // userId
	email: string;
	iat?: number; // issued at
	exp?: number; // expiration
}
