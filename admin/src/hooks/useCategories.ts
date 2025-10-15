import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { ICategoiresGetQuery, ICategories, ICategoriesResponse, ICategoryRequest } from "../lib/type/categories.type";
import { categoriesApi } from "../lib/api/categories.api";
import { useCallback, useState } from "react";

export const CATEGORIES_QUERY_KEYS = {
	all: ['categories'] as const,
	lists: () => [...CATEGORIES_QUERY_KEYS.all, 'list'] as const,
	list: (query: ICategoiresGetQuery) => [...CATEGORIES_QUERY_KEYS.lists(), query] as const,
	details: () => [...CATEGORIES_QUERY_KEYS.all, 'detail'] as const,
	detail: (id: string) => [...CATEGORIES_QUERY_KEYS.details(), id] as const,
}

/** [Hook] get categories */

export const useGetCategories = (
	query: ICategoiresGetQuery,
	options?: UseQueryOptions<ICategoriesResponse, Error>
) => {
	return useQuery({
		queryKey: CATEGORIES_QUERY_KEYS.list(query),
		queryFn: () => categoriesApi.getCategories(query),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		...options
	})
}

/** [Hook] get category by id */

export const useGetCategoryBydId = (
	id: string,
	options?: UseQueryOptions<ICategories, Error>
) => {
	return useQuery({
		queryKey: CATEGORIES_QUERY_KEYS.detail(id),
		queryFn: () => categoriesApi.getCategoryById(id),
		staleTime: 5 * 60 * 100,
		...options,
	})
}

/** [Hook] create category by id */

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICategoryRequest) => categoriesApi.createCategory(data),
		onSuccess: (newCategory) => {
			queryClient.invalidateQueries({
				queryKey: CATEGORIES_QUERY_KEYS.lists()
			});
		},
		onError: (error) => {
			console.log(error, 'error');
		} 
	})
}

/** [Hook] update category by id */

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data } : { id: string, data: ICategoryRequest}) => categoriesApi.updateCategory(id, data),
		onSuccess: (updateCategory, variables) => {
			queryClient.invalidateQueries({
				queryKey: CATEGORIES_QUERY_KEYS.lists()
			});

			queryClient.setQueryData(
				CATEGORIES_QUERY_KEYS.detail(variables.id),
				updateCategory
			)
		},
		onError: (error) => {
			console.error(error, 'error update');
		}
	})
}

/** [Hook] delete category */

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => categoriesApi.deleteCategory(id),
		onSuccess: (_, delectedId) => {
			queryClient.invalidateQueries({
				queryKey: CATEGORIES_QUERY_KEYS.lists(),
			})
			queryClient.removeQueries({
				queryKey: CATEGORIES_QUERY_KEYS.detail(delectedId)
			})
		},
		onError: (error) => {
			console.log(error, 'error delete');
		}
	})
}

/** [Hook] Get categories with pagination and search */

export const useCategoriesWithQuery = (
	initialQuery: ICategoiresGetQuery
) => {
	const [ query, setQuery ] = useState<ICategoiresGetQuery>(initialQuery);

	const categoriesQuery = useGetCategories(query);

	const updateQuery = useCallback((newQuery: Partial<ICategoiresGetQuery>) => {
		setQuery(prev => ({ ...prev, ...newQuery }))
	}, [])

	const resetPage = useCallback(() => {
		setQuery(prev => ({...prev, page: 1}))
	}, [])

	const nextPage = useCallback(() => {
		setQuery(prev => ({...prev, page: prev.page + 1}))
	}, [])

	const prePage = useCallback(() => {
		setQuery(prev => ({...prev, page: Math.max(1, prev.page - 1)}))
	}, [])

	const setKeyword = useCallback((keyword: string) => {
		setQuery(prev => ({...prev, keyword, page: 1}))
	}, [])

	const setOrder = useCallback((order: string) => {
		setQuery(prev => ({...prev, order, page: 1}))
	},[]) 
	
	return {
		...categoriesQuery,
		query,
		updateQuery,
		resetPage,
		nextPage,
		prePage,
		setKeyword,
		setOrder,
		// computed values
		hasNextPage: categoriesQuery.data ? 
		query.page < categoriesQuery.data.meta.totalPage : false,
		hasPrevPage: query.page > 1, 
	}
}