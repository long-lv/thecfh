import { IPaginatorResponse } from "./api.type";

export interface ICategoriesResponse {
	data: ICategories[];
	meta: IPaginatorResponse;
	statusCode: number;
}

export interface ICategories {
	id: number;
	createdAt: string;
	updatedAt: string;
	name: string;
	description: string;
}

export interface ICategoiresGetQuery { 
	keyword: string;
	order: string;
	page: number;
	size: number;
}

export interface ICategoryRequest { 
	name: string;
	description: string;
}