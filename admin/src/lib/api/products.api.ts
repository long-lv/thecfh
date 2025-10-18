import ApiUtil from "@/src/utils/apiUtil";
import { IProduct, IProductGetQuery, IProductRequest, IProductsResponse } from "../type/products.type";

const PATH_CONSTAINT= "/products";
export const productsApi = {
	getProducts: (query: IProductGetQuery): Promise<IProductsResponse> => {
		return ApiUtil.get(`${PATH_CONSTAINT}/list`, { params: query });
	},
	getProductById: (id: number): Promise<IProduct> => {
		return ApiUtil.get(`${PATH_CONSTAINT}/${id}`);
	},
	createProduct: (data: IProductRequest): Promise<IProduct> => {
		return ApiUtil.post(`${PATH_CONSTAINT}/create`, data);
	},
	updateProduct: (id: number, data: IProductRequest): Promise<IProduct> => {
		return ApiUtil.put(`${PATH_CONSTAINT}/update/${id}`, data);
	},
	deleteProduct: (id: number): Promise<void> => {
		return ApiUtil.delete(`${PATH_CONSTAINT}/delete/${id}`);
	}
}