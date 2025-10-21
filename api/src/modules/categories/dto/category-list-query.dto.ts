import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

export class CategoryListQueryDto extends PaginationQueryDto {
	// Keyword search
	@IsOptional()
	keyword: string;

	// Oder by eg: createdAt-DESC
	@IsOptional()
	order: string;

	@IsOptional()
	isGetAll: boolean;
}
