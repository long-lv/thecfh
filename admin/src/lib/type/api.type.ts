export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

// Generic success response
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface IPaginatorResponse {
	total: number | null,
	size: number,
	page: string | number,
	totalPage: number | null,
}