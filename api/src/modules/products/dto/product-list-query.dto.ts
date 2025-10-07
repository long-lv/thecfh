import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

export class ProductListQueryDto extends PaginationQueryDto {
	@IsOptional()
	keyword: string;

	@IsOptional()
	order: string;

	@IsOptional()
	categoryId: string;
}
