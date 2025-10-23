import ApiUtil from "@/src/utils/apiUtil";
import { IGetProductResponse, IProduct, IProductGetQuery, IProductRequest, IProductsResponse } from "../type/products.type";

const PATH_CONSTAINT= "/products";
export const productsApi = {
	getProducts: (query: IProductGetQuery): Promise<IProductsResponse> => {
		return ApiUtil.get(`${PATH_CONSTAINT}/list`, { params: query });
	},
	getProductById: (id: number): Promise<IGetProductResponse> => {
		return ApiUtil.get(`${PATH_CONSTAINT}/${id}`);
	},
	createProduct: (data: IProductRequest | FormData): Promise<IProduct> => {
		if (data instanceof FormData) {
			return ApiUtil.post(`${PATH_CONSTAINT}/create`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}); 
		}
		return ApiUtil.post(`${PATH_CONSTAINT}/create`, data);
	},
	updateProduct: (id: number, data: IProductRequest | FormData): Promise<IProduct> => {
		if (data instanceof FormData) {
			return ApiUtil.put(`${PATH_CONSTAINT}/update/${id}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}); 
		}
		return ApiUtil.put(`${PATH_CONSTAINT}/update/${id}`, data);
	},
	deleteProduct: (id: number): Promise<void> => {
		return ApiUtil.delete(`${PATH_CONSTAINT}/delete/${id}`);
	}
}