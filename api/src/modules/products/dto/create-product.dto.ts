import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
	@ApiProperty({ example: 'Iphone', description: 'Name insert by product' })
	@IsNotEmpty({ message: 'Product name is not empty' })
	@MinLength(3, { message: 'Name is not than 3 char!' })
	@MaxLength(100, { message: 'Name is than 100 char!' })
	@Transform(({ value }) => value.trim())
	name: string;

	@ApiProperty({
		example: 'Iphone 16 pro, best choice in the world of smartphone',
		description: 'Description insert by product',
	})
	@IsNotEmpty({ message: 'Description is not empty' })
	@MinLength(3, { message: 'Description is not than 3 char!' })
	@MaxLength(999999999, { message: 'Description is most than to!' })
	@Transform(({ value }) => value.trim())
	description: string;

	@ApiProperty({
		example: 25000000,
		description: 'Price by product',
	})
	@IsNotEmpty({ message: 'Price is not empty' })
	@IsNumber({}, { message: 'Price must be a number!' })
	@Type(() => Number)
	price: number;

	@ApiProperty({
		example: '1',
		description: 'CategoryId by product',
	})
	@IsNotEmpty({ message: 'Category is not empty' })
	categoryId: string;
}
