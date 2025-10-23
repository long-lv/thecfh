import { PAGINATION_SIZE_DEFAULT, PAGINATION_PAGE_DEFAULT } from "@/src/constants";
import { IProductGetQuery } from "@/src/lib/type/products.type";
import { modeFormProduct } from "./type";
import { ICategoriesGetQuery } from "@/src/lib/type/categories.type";

export const defaulQuery = {
	keyword: "",
	order: "",
	categoryId: null,
	page: PAGINATION_PAGE_DEFAULT,
	size: PAGINATION_SIZE_DEFAULT,
} as IProductGetQuery;

export const defaulQueryGetCategories = {
	keyword: "",
	order: "",
	isGetAll: true,
} as ICategoriesGetQuery;

export const columns = [
	{
		id: 'name',
		label: 'Product name',
		sortable: true,
	},
	{
		id: 'categoryName',
		label: 'Category',
		sortable: true,
	},
	{
		id: 'price',
		label: 'Price',
		sortable: true,
	},
	{
		id: 'imgUrl',
		label: 'Image'
	},
	{
		id: 'description',
		label: 'Description',
	},
	{
		id: 'createdAt',
		label: 'Created At',
		sortable: true
	},
	{
		id: 'action',
		label: 'Action',
	}
]

export const optionsAction = [
	{
		label: "View",
		value: modeFormProduct.VIEW
	},
	{
		label: "Edit",
		value: modeFormProduct.EDIT
	},
	{
		label: "Delete",
		value: modeFormProduct.DELETE
	}
]

export const defaultData = {
	name: "",
	description: "",
	price: "",
	categoryId: 0,
	images: [],
};