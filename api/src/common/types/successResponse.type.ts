import { PaginationMeta } from './paginationResponse.type';

export interface SuccessResponse<T> {
	success: boolean;
	statusCode: number;
	timestamp: string;
	path: string;
	data: T | T[];
	meta?: PaginationMeta;
}
