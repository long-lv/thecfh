import ApiUtil from "@/src/utils/apiUtil";
import { ICategoriesGetQuery, ICategories, ICategoriesResponse, ICategoryRequest } from "../type/categories.type";

const PATH_CONSTAINT= "/categories";
export const categoriesApi = {
	getCategories: (query: ICategoriesGetQuery): Promise<ICategoriesResponse> => {
		return ApiUtil.get(`${PATH_CONSTAINT}/list`, { params: query});
	},
	getCategoryById: (id: string): Promise<ICategories> => {
		return ApiUtil.get(`${PATH_CONSTAINT}/${id}`)
	},
	createCategory: (data: ICategoryRequest): Promise<ICategories> => {
		return ApiUtil.post(`${PATH_CONSTAINT}/create`, data);
	},
	updateCategory: (id: string, data: ICategoryRequest): Promise<ICategories> => {
		return ApiUtil.put(`${PATH_CONSTAINT}/update/${id}`, data);
	},
	deleteCategory: (id: string): Promise<void> => {
		return ApiUtil.delete(`${PATH_CONSTAINT}/delete/${id}`);
	}
}