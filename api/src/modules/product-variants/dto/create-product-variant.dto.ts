import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductVariantDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({
		name: 'productId',
		example: 1,
		description: 'product id',
	})
	productId: number;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({
		name: 'price',
		example: '150000',
		description: 'price product',
	})
	price: number;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({
		name: 'stock',
		example: '120',
		description: 'stock product',
	})
	stock: number;

	@IsNotEmpty()
	@IsArray()
	attributeValueIds: number[];
}
