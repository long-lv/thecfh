import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class CreateCategoryDto {
	@ApiProperty({ example: 'Equipment', description: 'Name insert by category' })
	@IsNotEmpty({ message: 'Name is not empty!' })
	@MinLength(3, { message: 'Name is not than 3 char!' })
	@MaxLength(100, { message: 'Name is than 100 char!' })
	name: string;

	@ApiProperty({
		example: 'Equiment full eg: Camera, Pot,...',
		description: 'Descripiton insert by category',
	})
	@IsNotEmpty({ message: 'Description is not empty!' })
	@MinLength(3, { message: 'Description not length than 3 char!' })
	@MaxLength(250, { message: 'Description can than more 250 char' })
	description: string;
}
