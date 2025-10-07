import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateAttrDto {
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(100)
	name: string;
}
