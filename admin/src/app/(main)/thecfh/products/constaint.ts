import { PAGINATION_SIZE_DEFAULT, PAGINATION_PAGE_DEFAULT } from "@/src/constants";
import { IProductGetQuery } from "@/src/lib/type/products.type";

export const defaulQuery = {
	keyword: "",
	order: "",
	categoryId: null,
	page: PAGINATION_PAGE_DEFAULT,
	size: PAGINATION_SIZE_DEFAULT,
} as IProductGetQuery;

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
	}
]