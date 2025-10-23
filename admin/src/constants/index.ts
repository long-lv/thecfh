export interface IDropDown {
  label: string;
  value: string | number;
}

export enum Role {
  ADMIN = "ADMIN",
  CELLER = "CELLER",
  USER = "USER",
}

export enum StatusUser {
  ACTIVE = "ACTIVE",
  VERIFY = "VERIFY",
}

export const PAGINATION_SIZE_DEFAULT = 25;
export const PAGINATION_PAGE_DEFAULT = 1;

