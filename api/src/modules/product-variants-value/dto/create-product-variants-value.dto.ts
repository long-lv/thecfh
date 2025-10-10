import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductVariantsValueDto {
	@IsNotEmpty()
	@IsNumber()
	productVariantId: number;

	@IsNotEmpty()
	@IsNumber()
	attributeValueId: number;
}
