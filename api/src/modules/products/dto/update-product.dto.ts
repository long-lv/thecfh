import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@ApiPropertyOptional({
		type: 'array',
		items: {
			type: 'array',
			example: '[https://example.com/img1.jpg, https://example.com/img1.jpg]',
		},
		description: 'List of image URLs to remove',
	})
	@IsOptional()
  @IsArray()
  @IsString({ each: true })
	fileRemove?: string[];
}
