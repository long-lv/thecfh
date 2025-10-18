export interface IDropDown {
  label: string;
  value: string;
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

export const formatedPrice = (price: string | number): string => {
  return price ? new Intl.NumberFormat("vi-Vn").format(Number(price)) : "-";
};

export const splitImages = (images: string): string[] => {
  return images ? images.split(";") : ["-"];
};

export const formatedDate = (date: string): string => {
  if (date) {
    const dateFormated = new Date(date);
    const d = dateFormated.getDate().toString().padStart(2, "0");
    const m = (dateFormated.getMonth() + 1).toString().padStart(2, "0");
    const y = dateFormated.getFullYear().toString().slice(-2);
    return `${d}/${m}/${y}`;
  }
  return "-";
};
