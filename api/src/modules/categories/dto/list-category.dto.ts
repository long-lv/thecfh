import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
	@ApiProperty({ example: '1', description: 'Id of category' })
	id: string;

	@ApiProperty({ example: 'furniture', description: 'name of category' })
	name: string;

	@ApiProperty({
		example: 'The funitures of your',
		description: 'desc of category',
	})
	desc: string;
}
