import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductAttributeDto {
	@IsNotEmpty({ message: 'Product id is not empty' })
	@IsNumber({}, { message: 'Product id must be a number!' })
	productId: number;

	@IsNotEmpty({ message: 'Attribute id is not empty' })
	@IsNumber({}, { message: 'Attribute id must be a number!' })
	attributeId: number;
}
