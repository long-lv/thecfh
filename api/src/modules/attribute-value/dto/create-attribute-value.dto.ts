import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAttributeValueDto {
	@IsNotEmpty({ message: 'Attribute id is not empty' })
	@IsNumber({}, { message: 'Attribute id must be a number!' })
	attributeId: number;

	@IsNotEmpty({ message: 'Value is not empty' })
	@IsString({ message: 'Value must be a string!' })
	value: string;
}
