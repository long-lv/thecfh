import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

/**
 * [DTO] Pagination query
 */
export class PaginationQueryDto {
	// Page query
	@IsOptional()
	@IsNumberString()
	page: string;

	// Size query
	@IsOptional()
	@IsNumberString()
	size: string;

	// Sort query
	@IsOptional()
	sort: string;
}

/**
 * [DTO] Pagination query
 */
export class PaginationDataDto {
	// Page data
	@IsOptional()
	@IsNumber()
	page?: number;

	// Size data
	@IsOptional()
	@IsNumber()
	size?: number;

	// Total page data
	@IsOptional()
	@IsNumber()
	totalPage?: number;

	// Total data
	@IsOptional()
	@IsNumber()
	totalData?: number;
}
