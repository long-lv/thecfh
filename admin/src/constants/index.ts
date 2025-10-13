export interface IDropDown {
    label: string;
    value: string;
}

export enum Role {
	ADMIN= "ADMIN",
	CELLER= "CELLER",
	USER= "USER"
}

export enum StatusUser {
	ACTIVE= "ACTIVE",
	VERIFY= "VERIFY"
}