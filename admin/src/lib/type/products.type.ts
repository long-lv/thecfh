import { IPaginatorResponse } from "./api.type";

export interface IProductsResponse {
	statusCode: number;
	data: IProduct[];
	meta: IPaginatorResponse
}

export interface IGetProductResponse {
	statusCode: number;
	message: string;
	data: IProduct;
}

export interface IProduct {
	id: number;
	name: string;
	description: string;
	price: string;
	imgUrl: string;
	categoryId: number;
	categoryName: string;
	createdAt: string;
	updatedAt: string;
}

export interface IProductRequest {
	name: string;
	description: string;
	price: string;
	categoryId: number;
	images?: File[];
}

export interface IProductGetQuery {
	keyword: string;
	order: string;
	categoryId: number | null;
	page: number;
	size: number;
}