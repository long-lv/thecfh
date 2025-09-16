export interface PaginationMeta {
	page: number;
	limit: number;
	totalItems: number;
	totalPage: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: PaginationMeta;
}
