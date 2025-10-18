import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IProductGetQuery, IProductsResponse } from "../lib/type/products.type";
import { productsApi } from "../lib/api/products.api";
import { useCallback, useState } from "react";

export const PRODUCTS_QUERY_KEYS= {
	all: ["products"] as const,
	lists: () => [...PRODUCTS_QUERY_KEYS.all, "list"] as const,
	list: (query: IProductGetQuery) => [...PRODUCTS_QUERY_KEYS.lists(), query] as const,
	details: () => [...PRODUCTS_QUERY_KEYS.all, "detail"] as const,
	detail: (id: number) => [...PRODUCTS_QUERY_KEYS.details(), id] as const,
}

/** [Hook] get products */

export const useGetProducts = (
	query: IProductGetQuery,
	options?: UseQueryOptions<IProductsResponse, Error>
) => {
	return useQuery({
		queryKey: PRODUCTS_QUERY_KEYS.list(query),
		queryFn: () => productsApi.getProducts(query),
		staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
		...options,
	})
}

/** [Hook] get products with pagination and search */

export const useProductsWithQuery = (initiaQuery: IProductGetQuery) => {
	const [query, setQuery] = useState<IProductGetQuery>(initiaQuery);

	const productsQuery = useGetProducts(query);

	const updateQuery = useCallback((newQuery: Partial<IProductGetQuery>) => {
		setQuery((prev) => ({...prev, ...newQuery}));
	}, [])

	const prePage = useCallback(() => {
		setQuery((prev) => ({...prev, page: Math.max(1, prev.page -1)}));
	}, []);

	const nextPage = useCallback(() => {
		setQuery((prev) => ({...prev, page: prev.page + 1}));
	},[])

	const setKeyword = useCallback((keyword: string) => {
		setQuery((prev) => ({...prev, keyword, page: 1}))
	}, []);

	const setOrder = useCallback((order: string) => {
		setQuery((prev) => ({...prev, order, page: 1}))
	}, [])

	return {
		...productsQuery,
		updateQuery,
		nextPage,
		prePage,
		setKeyword,
		setOrder,
		// computed values
		hasNextPage: productsQuery.data ? query.page < productsQuery.data.meta.totalPage : false,
		hasPrevPage: query.page > 1
	}
}